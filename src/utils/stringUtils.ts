/**
 * String manipulation utilities
 */
export const truncateString = (str: string, length: number = 50): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};
