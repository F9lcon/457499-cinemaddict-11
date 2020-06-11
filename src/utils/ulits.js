export const createRandomDigit = (max, min = 1) => {
  return min + Math.floor(Math.random() * (max - min));
};
