import Scene from "../scene"

export default class GameLevel extends Scene {
    constructor(game) {
        super(game);
    }

    init() {
        super.init();
    }

    render(time) {
        this.game.gameWindow.fill("black");
        super.render(time);
    }
}