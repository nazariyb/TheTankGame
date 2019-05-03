import Scene from "../Scene"
import TileFactory from "../TileFactory"

export default class GameLevel extends Scene {
    constructor(game) {
        super(game);
        this.tiles = new TileFactory({
            imageName: 'tiles',
            imageWidth: 245,
            imageHeight: 105
        });
        this.brick = this.tiles.getTile(2);
        this.brick.setXY(20, 20);
    }

    init() {
        super.init();
        const mapData = require('../levelMaps/level1.json');
        this.levelMap = this.game.gameWindow.createMap('level1', mapData, this.tiles);
    }

    render(time) {
        this.game.gameWindow.fill("black");
        this.game.gameWindow.drawTile(this.levelMap);
        super.render(time);
    }
}