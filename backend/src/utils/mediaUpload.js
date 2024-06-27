import Jimp from 'jimp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export async function addTextWatermarkToPdf(inputPath, originalFilename) {
    try {
        
        // Load the existing PDF
        const pdfBuffer = await fs.readFile(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // Embed Helvetica-Bold font
        const font = await pdfDoc.embedFont('Helvetica-Bold');

        // Add watermark to each page
        const pages = pdfDoc.getPages();
        const watermarkText = 'CODE REAPERS';
        const textSize = 50;

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const { width, height } = page.getSize();

            // Calculate text width
            const textWidth = font.widthOfTextAtSize(watermarkText, textSize);

            // Calculate text position at the center
            const textX = (width - textWidth) / 2;
            const textY = height / 2;

            // Draw text with grey color, bold style, and slight blur effect
            page.drawText(watermarkText, {
                x: textX,
                y: textY,
                size: textSize,
                font: font,
                color: rgb(0.5, 0.5, 0.5), // Grey color (adjust RGB values as needed)
                blendMode: 'Overlay', // Apply a blending mode to darken the text
                opacity: 0.8, // Reduce opacity for slight blur effect
            });
        }

        // Save the modified PDF with watermark
        const outputPdfPath = path.join(__dirname, 'output_pdf', originalFilename);
        const modifiedPdfBytes = await pdfDoc.save();
        await fs.writeFile(outputPdfPath, modifiedPdfBytes);

        return outputPdfPath;

    } catch (error) {
        console.error('Error adding watermark to PDF:', error);
        throw error;
    } finally {
        // Delete the uploaded file from 'uploads' directory
        await fs.unlink(inputPath).catch(err => console.error('Error deleting file:', err));
    }
}


// Function to add text watermark to image
export async function addTextWatermarkToImage(inputPath, originalFilename) {
    try {
        // Load the uploaded image
        const image = await Jimp.read(inputPath);

        // Add watermark text to the image
        const watermarkText = 'CODE REAPERS';
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK); // Load font

        // Calculate position for the watermark
        const textWidth = Jimp.measureText(font, watermarkText);
        const textHeight = Jimp.measureTextHeight(font, watermarkText);
        const x = image.bitmap.width - textWidth - 500; // 10px margin from right
        const y = image.bitmap.height - textHeight - 200; // 10px margin from bottom

        // Print text on the image
        image.print(font, x, y, watermarkText);

        // Save the image with watermark
        const outputImagePath = path.join(__dirname, 'output_images', originalFilename);
        await image.writeAsync(outputImagePath);

        return outputImagePath;

    } catch (error) {
        console.error('Error adding watermark to image:', error);
        throw error;
    } finally {
        // Delete the uploaded file from 'uploads' directory
        await fs.unlink(inputPath);
    }
}