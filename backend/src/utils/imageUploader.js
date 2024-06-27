import multer from 'multer';
import mime from 'mime';
import fs from 'fs';
import path from 'path'; // Import path module for handling file paths
import { sendSuccessResponse, sendErrorResponse } from './index.js'; // Import response functions

const __dirname = path.resolve();
class ImageUploader {
    
  static getFileExtension = name => {
    const names = name.split('.');
    return `.${names[names.length - 1]}`;
  };

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, '/public/logo'); 
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      const filename = `${file.fieldname}-${Date.now()}${ImageUploader.getFileExtension(
        file.originalname,
      )}`;
      cb(null, filename);
    },
  });

  fileFilter = (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/mpeg',
      'application/pdf', // Include PDF mime type
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error('Invalid file type. Only jpg, png, gif, mp4, mpeg, and pdf files are allowed.');
      error.code = 400;
      cb(error);
    }
  };

  upload = () => multer({
    storage: this.storage,
    fileFilter: this.fileFilter,
  });

  decodeBaseImage = (dataString) => {
    const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid input string');
    }

    return {
      type: matches[1],
      data: Buffer.from(matches[2], 'base64'),
    };
  }

  handleFileUpload = (req, res, next) => {
    const { file } = req;

    if (!file) {
      return sendErrorResponse(res, 400, false, { message: 'Please select a file' });
    }
 
    // Handle file storage or any additional logic here
    const fileName = `${file.fieldname}-${Date.now()}${ImageUploader.getFileExtension(file.originalname)}`;
    const filePath = path.join(__dirname, `../../public/logo/${fileName}`);

    try {
      fs.writeFileSync(filePath, file.buffer); // Save file to disk
      req.filePath = filePath; // Attach file path to request object for further use
      sendSuccessResponse(res, 200, true, 'File uploaded successfully', { filePath });
    } catch (err) {
      console.error(err);
      sendErrorResponse(res, 500, false, err, { message: 'Failed to upload file' });
    }
  }

  // Example method to handle profile image upload from base64 string
  UpdateProfileBase64Image = (req, res, next) => {
    if (!req.body.image) {
      return sendErrorResponse(res, 400, false, { message: 'Please provide an image in base64 format' });
    }

    let decodedImg;
    try {
      decodedImg = this.decodeBaseImage(req.body.image);
    } catch (err) {
      return sendErrorResponse(res, 400, false, { message: err.message });
    }

    const imageBuffer = decodedImg.data;
    const type = decodedImg.type;
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
    ];

    if (!allowedMimes.includes(type)) {
      return sendErrorResponse(res, 400, false, { message: 'Invalid file type. Only jpg, png and gif image files are allowed.' });
    }

    const extension = mime.getExtension(type);
    const fileName = `${Date.now()}.${extension}`;
    const uploadDir = path.join(__dirname, '../public/images/users/');

    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(`${uploadDir}${fileName}`, imageBuffer, 'utf8');
      const fileUrl = `${req.protocol}://${req.get('host')}/assets/users/${fileName}`;
      sendSuccessResponse(res, 200, true, 'Image uploaded successfully', { fileUrl });
    } catch (err) {
      console.error(err);
      sendErrorResponse(res, 500, false, err, { message: 'Failed to upload image' });
    }
  }
}

export default new ImageUploader();
