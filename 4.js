// Дана прямоугольная доска N×M (N строк и M столбцов). 
// В левом верхнем углу находится шахматный конь, которого необходимо переместить в правый нижний угол доски. 
// В данной задаче конь может перемещаться на две клетки вниз и одну клетку вправо или на одну клетку вниз и две клетки вправо.

Необходимо определить, сколько существует различных маршрутов, ведущих из левого верхнего в правый нижний угол.

const solve = (size) => {
  const [boardWidth, boardHeight] = size;

  // матрица весов
  const steps = [];

  // заполнение матрицы -1
  for(let i = 0; i < boardWidth; i++){
    steps[i] = [];
    for (let j = 0; j < boardHeight; j++){
      steps[i][j] = -1;
    }
  }

  // инициализация динамикик
  steps[0][0] = 1

  // функция выхода из рекурсии
  const isOnField = (cords) => {
    const [x, y] = cords;
    return x >= 0 && y >= 0 && x < boardWidth && y < boardHeight;
  }

  // рекурсивный проход всех возможных ходов
  const findNextStep = (cords) => {
    const [x, y] = cords;
    if(isOnField(cords)){
      if (steps[x][y] === -1){
        // поиск следующего доступного шага 
        steps[x][y] = findNextStep([x - 1, y - 2]) + findNextStep([x - 2, y - 1])
      }
      return steps[x][y]
    }
    return 0;
  }
  // поиск с конечной клетки (начинаем с конца, тк возможна ситуация, когда до клетки 1,1 фигура не дойдет никогда)
  const result = findNextStep([boardWidth - 1, boardHeight - 1]);
  return result
}
