const imageDao = require('../dao/imageDao');

exports.saveImage = async (propertyId, filename, label) => {
  try {
    const imageId = await imageDao.saveImage(propertyId, filename, label);
    return { id: imageId, propertyId, filename, label };
  } catch (err) {
    console.error("Service Error - saveImage:", err.message);
    throw new Error("Failed to save image metadata");
  }
};

exports.saveMultipleImages = async (propertyId, images) => {
  try {
    const result = await imageDao.saveMultipleImages(propertyId, images);
    return result;
  } catch (err) {
    console.error("Service Error - saveMultipleImages:", err.message);
    throw new Error("Failed to save multiple images");
  }
};

exports.getAllImages = async () => {
  try {
    const images = await imageDao.getAllImages();
    return images;
  } catch (err) {
    console.error("Service Error - getAllImages:", err.message);
    throw new Error("Failed to retrieve images");
  }
};

exports.getImagesByPropertyId = async (propertyId) => {
  try {
    const images = await imageDao.getImagesByPropertyId(propertyId);
    return images;
  } catch (err) {
    console.error("Service Error - getImagesByPropertyId:", err.message);
    throw new Error("Failed to retrieve images by property ID");
  }
};

exports.deleteImageById = async (photoId) => {
  try {
    const result = await imageDao.deleteImageById(photoId);
    return result;
  } catch (err) {
    console.error("Service Error - deleteImageById:", err.message);
    throw new Error("Failed to delete image");
  }
};
