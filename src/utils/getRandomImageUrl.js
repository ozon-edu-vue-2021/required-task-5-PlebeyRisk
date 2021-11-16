/**
 * return string with random image url
 * @returns {String}
 * For example: assets/images/products/12.webp
 */
const getRandomImageUrl = () => {
  const imgNumber = Math.floor(Math.random() * 11) + 1;
  return `assets/images/products/${imgNumber}.webp`;
};

export default getRandomImageUrl;
