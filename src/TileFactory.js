import Tile from "./Tile"

function TileFactory({imageName, imageWidth, imageHeight, tileWidth = 35, tileHeight = 35}) {
    this.imageName = imageName;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;

    this.getSourceX = index => (--index * this.tileWidth) % this.imageWidth;

    this.getSourceY = index => Math.trunc((--index * this.tileWidth) / this.imageWidth) * this.tileHeight;

    this.getTile = index => new Tile({
        imageName: this.imageName,
        sourceX: this.getSourceX(index),
        sourceY: this.getSourceY(index),
        width: this.tileWidth,
        height: this.tileHeight
    });
}

export default TileFactory