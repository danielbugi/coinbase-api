export const fixNum = (val) => {
  if (val < 0.001) {
    return Number(val).toFixed(10);
  }

  return Number(val).toFixed(2);
};

export const numFormatter = (val) => {
  if (val >= 1000000000) {
    return (val / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (val >= 1000000) {
    return (val / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (val >= 1000) {
    return (val / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return val;
};
