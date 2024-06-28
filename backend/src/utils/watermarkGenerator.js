import Jimp from 'jimp';
import watermark from 'jimp-watermark';

const addWatermark = async (inputImagePath, watermarkImagePath, outputImagePath) => {
    try {


let optionsw = {
    ratio: 0.6,     // Should be less than one
    opacity: 0.6,   // Should be less than one
    dstPath: './watermarked_image.jpg' // Output path for the watermarked image
};

watermark.addWatermark(inputImagePath, watermarkImagePath, optionsw)
    .then(watermarkedImage => {
        console.log('Watermark added successfully',watermarkedImage);
    })
    .catch(error => {
        console.error('Error adding watermark:', error);
    });


    return false

        // Read the input image
        const image = await Jimp.read(inputImagePath);

        // Read the watermark image
        const watermarkImage = await Jimp.read(watermarkImagePath);

        // Define watermark options
        const options = {
            position: watermark.position.center // Specify the position for watermark placement
        };
        // Add watermark to the input image
        const watermarkedImage = await watermark.addWatermark(image, watermarkImage, options);

        // Save the watermarked image
        await watermarkedImage.writeAsync(outputImagePath);

        console.log(`Watermarked image saved to ${outputImagePath}`);
    } catch (error) {
        console.error('Error adding watermark:', error);
    }
};

export  {addWatermark};
