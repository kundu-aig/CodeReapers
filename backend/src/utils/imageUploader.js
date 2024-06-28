
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { sendSuccessResponse, sendErrorResponse } from './index.js';

const __dirname = path.resolve();

class ImageUploader {
  static getFileExtension = name => {
    const names = name.split('.');
    return `.${names[names.length - 1]}`;
  };

  // Disk storage for small files like images
  smallFileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadDir;

      if (file.fieldname === 'logo') {
        uploadDir = path.join(__dirname, '/public/logos');
      } else if (file.fieldname === 'banner') {
        uploadDir = path.join(__dirname, '/public/banners');
      } else {
        uploadDir = path.join(__dirname, '/public/others');
      }

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      const fileName = `${file.fieldname}-${Date.now()}${ImageUploader.getFileExtension(file.originalname)}`;
      cb(null, fileName);
    },
  });

  // Stream-based storage for large files like videos and PDFs
  largeFileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadDir = path.join(__dirname, '/public/medias');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      const fileName = `${file.fieldname}-${Date.now()}${ImageUploader.getFileExtension(file.originalname)}`;
      cb(null, fileName);
    },
  });

  // File filter for all types
  fileFilter = (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/mpeg',
      'application/pdf',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error('Invalid file type. Only jpg, png, gif, mp4, mpeg, and pdf files are allowed.');
      error.code = 400;
      cb(error);
    }
  };

  // Upload method to handle both small and large files
  upload = (type = 'small') => {
    let storage;

    if (type === 'small') {
      storage = this.smallFileStorage;
    } else {
      storage = this.largeFileStorage;
    }

    return multer({
      storage: storage,
      fileFilter: this.fileFilter,
    }).fields([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
      { name: 'media', maxCount: 1 }, 
      // Add more fields as needed for other types of uploads
    ]);
  };

  // Method to handle media uploads (large files like videos or PDFs) using streams
  handleMediaUpload = (req, res, next) => {
    this.upload('large')(req, res, err => {
      if (err) {
        return sendErrorResponse(res, 400, false, err, { message: 'Failed to upload media file' });
      }

      const { media } = req.files;

      if (!media || media.length === 0) {
        return sendErrorResponse(res, 400, false, { message: 'Media file not found in request' });
      }

      const file = media[0];
      const fileName = `${file.fieldname}-${Date.now()}${ImageUploader.getFileExtension(file.originalname)}`;
      const filePath = path.join(__dirname, '/public/medias', fileName);

      // Create a writable stream to write the file
      const fileStream = fs.createWriteStream(filePath);
      fileStream.on('error', err => {
        console.error('Error writing media file:', err);
        sendErrorResponse(res, 500, false, err, { message: 'Failed to store media file' });
      });

      // Write the buffer to the file stream
      fileStream.write(file.buffer);
      fileStream.end();

      fileStream.on('finish', () => {
        const fileUrl = `${req.protocol}://${req.get('host')}/public/medias/${fileName}`;
        sendSuccessResponse(res, 200, true, 'Media file uploaded successfully', { fileUrl });
      });
    });
  };
}

export default new ImageUploader();
