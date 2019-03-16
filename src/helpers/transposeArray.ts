export function transposeArray<K, T extends Array<Array<K>>>(
  array: T,
) {
  const newArray = [
    ...Array(array[0].length),
  ].map(() => [
    ...Array(array.length),
  ]) as T;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      newArray[j][array.length - 1 - i] = array[i][j];
    }
  }

  return newArray;
}
