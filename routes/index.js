const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const multer = require('multer');

// Define the storage configuration
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null,  uniqueSuffix + '-' +file.originalname );
    }
  });


const upload = multer({ storage: storage });

/** Rander home page */
router.get('/', homeController.home);
/** Upload file to the server */
router.post('/upload',upload.single('file'), homeController.uploadFile);

/** Upload file to the server */
router.get('/detail', homeController.detail);

module.exports = router;