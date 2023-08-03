const solve = (a, b) => {
  const aLength = a.length;
  const bLength = b.length;
  const dp = []
  const f = (i, j) => {
    if(!dp[i]){
      dp[i] = []
    }
    if(i === 0 || j === 0){
      const target = a[i] || b[j];
      dp[i][j] = [0, [target]];
      return dp[i][j];
    }
    if(dp[i] && dp[i][j]){
      return dp[i][j]
    }
    if(a[i] === b[j]){   
      const state = f(i - 1, j - 1);
      const nextSlice = [...state[1]];
      if(a[i]){
        nextSlice.push(a[i]);
      }
      dp[i][j] = [state[0] + 1, nextSlice]
      return dp[i][j]
    }
    const x = f(i - 1, j);
    const y = f(i, j - 1);
    const max =  Math.max(x[0], y[0])
    const state = max === x ? x : y;
    dp[i][j] = state;
    return dp[i][j]
  }
  const result = f(aLength, bLength);
  return result;
}
