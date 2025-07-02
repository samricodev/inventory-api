const regExpBrand = /^[a-zA-Z0-9\s-]{3,50}$/;
const regExpCategory = /^[a-zA-Z0-9\s-]{3,50}$/;
const regExpItem = /^[a-zA-Z0-9\s-]{3,50}$/;

function validateBrand(brand) {
  if (!brand || typeof brand !== 'string') {
    return false;
  }
  return regExpBrand.test(brand);
}

function validateCategory(category) {
  if (!category || typeof category !== 'string') {
    return false;
  }
  return regExpCategory.test(category);
}

function validateItem(item) {
  if (!item || typeof item !== 'string') {
    return false;
  }
  return regExpItem.test(item);
}
module.exports = {
  validateBrand,
  validateCategory,
  validateItem,
};