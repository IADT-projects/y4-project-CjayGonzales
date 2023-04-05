import p5 from 'p5';

function thresholdFilter(data, thresholdValue) {
    // Create a new p5 instance
    const p = new p5();

    // Loop through each pixel in the image data
    for (let i = 0; i < data.length; i += 4) {
        // Get the color values for this pixel
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Calculate the grayscale value for this pixel
        const grayscale = p.red(r) * 0.299 + p.green(g) * 0.587 + p.blue(b) * 0.114;

        // Apply the threshold
        if (grayscale < thresholdValue) {
            // Set the pixel to black
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
        } else {
            // Set the pixel to white
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
        }
    }
}

function preprocessImage(canvas) {
    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    thresholdFilter(image.data, 128);
    return image;
}

export default preprocessImage;