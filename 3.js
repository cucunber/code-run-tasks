// В левом верхнем углу прямоугольной таблицы размером N×M находится черепашка. 
// В каждой клетке таблицы записано некоторое число. Черепашка может перемещаться вправо или вниз, при этом маршрут черепашки заканчивается в правом нижнем углу таблицы.
// Подсчитаем сумму чисел, записанных в клетках, через которую проползла черепашка (включая начальную и конечную клетку). 
// Найдите наибольшее возможное значение этой суммы и маршрут, на котором достигается эта сумма.

const solve = (matrix) => {
  
  const cost = [[matrix[0][0]]];
  const paths = [['']];
  const x = matrix.length, y = matrix[0].length;

  // заполняем вес первой строчки каждого столбца + записываем путь
  for (let i = 1; i < y; i++){
    cost[0][i] = cost[0][i - 1] + matrix[0][i]
    paths[0][i] = paths[0][i - 1] + "L"
  }

  // заполняем вес первого столбца каждой строчки + записываем путь
  for (let i = 1; i < x; i++){
    const row = cost[i - 1][0] + matrix[i][0];
    paths[i] = [paths[i - 1][0] + 'D']
    cost[i] = [row]; 
  }

  // считаем полную матрицу стоимости прохода + записываем путь
  for (let i = 1; i < x; i++){
    for (let j = 1; j < y; j++){
      // берем либо максимальное из нижней строчки и левой колонки а также добавляем стоимость перехода в ячейку
      const maxStep = Math.max(cost[i - 1][j], cost[i][j - 1]);
      paths[i][j] = maxStep === cost[i - 1][j] ? paths[i - 1][j] + 'D' : paths[i][j - 1] + "L";
      cost[i][j] = maxStep + matrix[i][j]
    }
  }
  
  return [cost[x - 1][y - 1], paths[x - 1][y - 1]]
}
