import Tile from "./Tile"

function TileMap(options) {
    Tile.call(this, options);
    this.hitBoxes = options.hitBoxes || [];
}

export default TileMap