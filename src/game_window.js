import ImageLoader from "./image_loader"

function GameWindow(width, height) {

    this.fill = fill;
    this.loadImages = loadImages;
    this.printText = printText;
    this.drawImage = drawImage;
    this.isImagesLoaded = false;

    let canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    let images = {};

    function createCanvas(width, height) {
        let elements = document.getElementsByTagName("canvas");
        let canvas = elements[0] || document.createElement('canvas');

        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    function fill(color) {
        context.fillStyle = color;
        context.fillRect(0, 0, width, height);
    }

    function loadImages(imageFiles) {
        Promise.all(
            Object
                .entries(imageFiles)
                .map( ([key, value]) =>
                    ImageLoader(value).then((img) => images[key] = img)
                )
        ).then( () => this.isImagesLoaded = true)

    }

    function printText(x, y, text) {
        context.fillStyle = "#fff";
        context.font = "24px PT Mono";
        context.fillText(text, x, y);
    }

    function drawImage(x, y, imageName) {
        context.drawImage(images[imageName], x, y);
    }
}

export default GameWindow;
