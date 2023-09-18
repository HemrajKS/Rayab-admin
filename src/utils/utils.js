export const sanitizeProduct = (product, fieldsToRemove) => {
  const sanitizedProduct = { ...product };

  fieldsToRemove.forEach((field) => {
    delete sanitizedProduct[field];
  });

  return sanitizedProduct;
};

export default sanitizeProduct;
