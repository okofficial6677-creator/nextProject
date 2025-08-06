const connection = require('../config/db');

exports.saveImage = async (propertyId, filename, label) => {
  try {
    const [result] = await connection.execute(
      `INSERT INTO property_photos (property_id, photo_label, image_name) VALUES (?, ?, ?)`,
      [propertyId, label, filename]
    );
    return result.insertId;
  } catch (err) {
    console.error("DAO Error - saveImage:", err.message);
    throw err;
  }
};

exports.saveMultipleImages = async (propertyId, images = []) => {
  try {
    const values = images.map(img => [propertyId, img.label, img.imageName]);
    const [result] = await connection.promise().query(
      `INSERT INTO property_photos (property_id, photo_label, image_name) VALUES ?`,
      [values]
    );
    return result;
  } catch (err) {
    console.error("DAO Error - saveMultipleImages:", err.message);
    throw err;
  }
};

exports.getAllImages = async () => {
  try {
    const [rows] = await connection.execute( 
      `SELECT * FROM property_photos`
    );
    return rows;
  } catch (err) {
    console.error('DAO Error - getAllImages:', err.message);
    throw err;
  }
};
// exports.getAllImages = async () => {
//   try {
//     const [rows] = await connection.promise().execute(
//       `SELECT * FROM property_image ORDER BY created_at DESC`
//     );
//     return rows;
//   } catch (err) {
//     console.error('DAO Error - getAllImages:', err.message);
//     throw err;
//   }
// };

exports.getImagesByPropertyId = async (propertyId) => {
  try {
    const [rows] = await connection.promise().execute(
      `SELECT * FROM property_photos WHERE property_id = ? ORDER BY created_at DESC`,
      [propertyId]
    );
    return rows;
  } catch (err) {
    console.error('DAO Error - getImagesByPropertyId:', err.message);
    throw err;
  }
};

exports.deleteImageById = async (photoId) => {
  try {
    const [result] = await connection.execute(
      `DELETE FROM property_photos WHERE photo_id = ?`,
      [photoId]
    );
    return result;
  } catch (err) {
    console.error('DAO Error - deleteImageById:', err.message);
    throw err;
  }
};
