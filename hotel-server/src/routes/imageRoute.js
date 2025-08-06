const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const imageController = require('../controller/imageController');

router.post('/upload-image', upload.single('image'), imageController.uploadImage);

router.get('/allimage', imageController.allImages);

router.get('/images/property/:propertyId', imageController.imagesByProperty);

module.exports = router; 

