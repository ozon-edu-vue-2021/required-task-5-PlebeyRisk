/**
 * delete duplicates in objects Array by keyField
 * @param {Array} arr
 * @param {String} keyField
 * @returns {Array}
 */
const deleteDuplicates = (arr, keyField = 'id') =>
  arr.reduce((acc, curItem) => {
    return acc.some((item) => item?.[keyField] === curItem?.[keyField])
      ? acc
      : [...acc, curItem];
  }, []);

export default deleteDuplicates;
