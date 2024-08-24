export const byteToMB = (size: number): string => {
  const sizeInMB = size / (1024 * 1024);
  const roundedMB = Math.round((sizeInMB + Number.EPSILON) * 100) / 100;

  return `${roundedMB} MB`;
};
