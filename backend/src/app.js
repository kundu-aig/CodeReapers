import 'dotenv/config'
import express from 'express'
import apiRoutes from "./routes/index.js"
import { PORT,MONGO_URL } from './config.js'
import cors from 'cors';
import { connectToMongo } from './db/mongo.db.js'
import {jwtValiodation} from './middlewares/expressJwt.js'


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
import path from 'path'

import multer from 'multer'

const app = express();


import {addTextWatermarkToPdf, addTextWatermarkToImage} from './utils/mediaUpload.js'


// Middleware to parse JSON data
app.use(express.json());
app.use(cors('*'));
// Middleware to parse form data (urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use(jwtValiodation())
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    console.log("Server is running");
    connectToMongo();
    res.status(200).send(`you are on ${PORT}`);
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

//  file watermark
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = req.file.path;
        const fileExtension = path.extname(filePath).toLowerCase();

        if (fileExtension === '.pdf') {
            // Handle PDF file upload
            const outputPdfPath = await addTextWatermarkToPdf(filePath, req.file.originalname);
            res.download(outputPdfPath); // Download the watermarked PDF

        } else if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png') {
            // Handle image file upload
            const outputImagePath = await addTextWatermarkToImage(filePath, req.file.originalname);
            res.sendFile(outputImagePath); // Send the watermarked image

        } else {
            // Unsupported file type
            throw new Error('Unsupported file type.');
        }

    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).send('Error handling file upload.');
    }
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(` app listening on port ${PORT}`);
})