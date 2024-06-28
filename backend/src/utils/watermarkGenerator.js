import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';
import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);
const __dirname = path.resolve();

class MediaProcessor {
  static getFileExtension = name => {
    const names = name.split('.');
    return `.${names[names.length - 1]}`;
  };

  // Function to add watermark to an image file
  static addWatermarkToImage = async (inputPath, outputPath, watermarkPath) => {
    const canvas = createCanvas();
    const ctx = canvas.getContext('2d');

    try {
      // Load the input image and watermark image asynchronously
      const [image, watermark] = await Promise.all([
        loadImage(inputPath),
        loadImage(watermarkPath)
      ]);

      // Set canvas dimensions to match image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the input image
      ctx.drawImage(image, 0, 0);

      // Draw the watermark at bottom-right corner
      const margin = 10; // Adjust margin as needed
      const x = canvas.width - watermark.width - margin;
      const y = canvas.height - watermark.height - margin;
      ctx.drawImage(watermark, x, y);

      // Write canvas to output file
      const outputStream = fs.createWriteStream(outputPath);
      const stream = canvas.createPNGStream(); // Adjust format as needed (PNG, JPEG, etc.)
      stream.pipe(outputStream);

      return new Promise((resolve, reject) => {
        outputStream.on('finish', () => resolve());
        outputStream.on('error', err => reject(err));
      });
    } catch (err) {
      console.error('Error adding watermark to image:', err);
      throw err; // Propagate error up
    }
  };

  // Function to add watermark to a video file using ffmpeg
  static addWatermarkToVideo = async (inputPath, outputPath, watermarkPath) => {
    try {
      const ffmpegCommand = `ffmpeg -i ${inputPath} -i ${watermarkPath} -filter_complex "overlay=main_w-overlay_w-10:main_h-overlay_h-10" ${outputPath}`;
      const { stdout, stderr } = await execPromise(ffmpegCommand);

      if (stderr) {
        console.error('Error adding watermark to video:', stderr);
        throw new Error('Failed to add watermark to video');
      }

      console.log('Watermark added to video successfully');
    } catch (err) {
      console.error('Failed to add watermark to video:', err);
      throw err; // Propagate error up
    }
  };

  // Method to process uploaded media (images or videos) with watermarking
  static processMediaWithWatermark = async (fileType, inputPath, watermarkPath) => {
    const outputDir = path.join(__dirname, `/public/${fileType}s`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `${fileType}-${Date.now()}${MediaProcessor.getFileExtension(inputPath)}`;
    const outputPath = path.join(outputDir, fileName);

    try {
      if (fileType === 'image') {
        await MediaProcessor.addWatermarkToImage(inputPath, outputPath, watermarkPath);
      } else if (fileType === 'video') {
        await MediaProcessor.addWatermarkToVideo(inputPath, outputPath, watermarkPath);
      }

      return { success: true, outputPath };
    } catch (err) {
      console.error(`Failed to process ${fileType}:`, err);
      throw err;
    }
  };
}

export default MediaProcessor;
