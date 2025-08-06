const imageService = require('../business/imageService');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const propertyId = req.body.property_id;
    const label = req.body.label || '';
    const filename = req.file.filename;

    if (!propertyId) {
      return res.status(400).json({ success: false, message: 'property_id is required' });
    }

    await imageService.saveImage(propertyId, filename, label);

    res.status(200).json({ success: true, message: 'Image uploaded successfully', filename });
  } catch (err) {
    console.error('Upload Error:', err.message);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
};


exports.allImages = async (req, res) => {
  try {
    const images = await imageService.getAllImages();
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    console.error('Error retrieving images:', err.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve images' });
  }
};

exports.imagesByProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const images = await imageService.getImagesByPropertyId(propertyId);
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    console.error('Error retrieving property images:', err.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve images' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const photoId = req.params.photoId;
    await imageService.deleteImageById(photoId);
    res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err.message);
    res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
};
