import GameWindow from "./game_window"
import Loading from "./scenes/loading"
import Menu from "./scenes/menu"
import Scene from "./scene";
import ControlState from "./control_state";
import GameLevel from "./scenes/game_level";

class Game {
    constructor({ width = 900, height = 900 } = {}) {
        this.gameWindow = new GameWindow(width, height);
        this.gameWindow.loadImages({
            tanks: "../img/tanks.png",
            tiles: "../img/tiles.png",
            title: "../img/title.png"
        });
        this.controlState = new ControlState();
        this.scenes = {
            loading: new Loading(this),
            menu: new Menu(this),
            gameLevel: new GameLevel(this),
        };
        this.currentScene = this.scenes.loading;
        this.currentScene.init();
    }

    changeScene(status) {
        switch (status) {
            case Scene.LOADED:
                return this.scenes.menu;
            case Scene.START_GAME:
                return this.scenes.gameLevel;
            default:
                return this.scenes.menu;
        }
    }

    frame(time) {
        if (this.currentScene.status !== Scene.WORKING) {
            this.currentScene = this.changeScene(this.currentScene.status);
            this.currentScene.init();
        }
        this.currentScene.render(time);
        requestAnimationFrame(this.frame.bind(this));
    }

    run() {
        requestAnimationFrame(this.frame.bind(this));
    }
}

export default Game