import MovementVector from './MovementVector'
import AnimationFactory from './AnimationFactory'

class PlayerBody {
    constructor({imageName, speed}) {
        this.x = 8 * 35;
        this.y = 24 * 35;
        this.speed = speed;
        this.velocity = new MovementVector('up', 0);
        this.lastTime = 0;

        this.animations = {};

        const animationFactory = new AnimationFactory(imageName);
        'up_to_right,up_to_left,down_to_right,down_to_left,left_to_up,right_to_up,left_to_down,right_to_down,up_to_down,down_to_up,right_to_left,left_to_right'
            .split(',')
            .forEach(name => {
                this.animations[name] = animationFactory.getAnimation(name);
                // console.log('animation for', name, ':', this.animations[name]);
            });
        this.currentDirection = 'up';
        this.stand(this.currentDirection);
    }

    walk(newDirection, time) {
        this.velocity.setDirection(newDirection, this.speed);

        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }
        if (!(time - this.lastTime > this.speed / 2)) return;

        this.x += (time - this.lastTime) * (this.velocity.x / 1000);
        this.y += (time - this.lastTime) * (this.velocity.y / 1000);
        this.lastTime = time;

        this.checkCoordinates();

        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        console.log('current direction:', this.currentDirection, 'new direction:', newDirection);
        if (this.currentDirection !== newDirection)
            this.turn(newDirection, time);
    }

    checkCoordinates() {
        this.x = (this.x > 900 - 70) ? 900 - 70 : this.x;
        this.y = (this.y > 900 - 70) ? 900 - 70 : this.y;
        this.x = (this.x < 0) ? 0 : this.x;
        this.y = (this.y < 0) ? 0 : this.y;
    }

    turn(newDirection, time) {
        this.view = this.animations[this.currentDirection + '_to_' + newDirection];
        this.view.update(time, Math.trunc(this.x), Math.trunc(this.y));
        this.view.run();
        this.currentDirection = newDirection;
    }

    stand(direction) {
        this.velocity.setDirection(direction, this.speed);
        this.view = this.animations['down_to_up'];
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
    }
}

export default PlayerBody;