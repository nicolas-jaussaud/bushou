/**
 * @see https://gist.github.com/danieliser/b4b24c9f772066bcf0a6#gistcomment-3268408
 */
export const convertHexToRGBA = (hex, opacity) => {
  
  const tempHex = hex.replace('#', '');
  const r = parseInt(tempHex.substring(0, 2), 16);
  const g = parseInt(tempHex.substring(2, 4), 16);
  const b = parseInt(tempHex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
};
