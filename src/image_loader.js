export default function ImageLoader(imageFiles) {
    this.load = load;
    this.images = {};

    const self = this;

    // Паралельне виконання - функція повертає проміс,
    // який чекає, поки всі проміси з масиву виконаються
    function load() {
        let promises = [];
        for (let name in imageFiles) {
            if (imageFiles.hasOwnProperty(name))
                promises.push(loadImage(name, imageFiles[name]));
        }
        return Promise.all(promises);
        // return Promise.all(imageFiles.map(loadImage));
    }

    // промісифікація
    function loadImage(name, src) {
        return new Promise((resolve) => {
            const image = new Image();
            self.images[name] = image;
            image.onload = () => resolve(name);
            image.src = src;
            console.log("image: ", image);
        });
    }
}