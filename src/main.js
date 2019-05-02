import css from '../style/common.css'
import Game from "./game"

// TODO: the following interface:
window.onload = () => {
    const theTank = new Game();
    theTank.run();
};
