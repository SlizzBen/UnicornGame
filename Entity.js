const SIDES = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right'),
};

class Trait {
    constructor(name) {
        this.NAME = name;

        this.tasks = [];
    }

    finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }

    queue(task) {
        this.tasks.push(task);
    }

    collides(us, them) {

    }

    obstruct() {

    }

    update() {

    }
}

class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new ClipBox(this.pos, this.size, this.offset);
        this.lifetime = 0;

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }
    //Проверка на столкновение с врагом
    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }
    //ПРоверка на столкновение с окружением
    obstruct(side, match) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match);
        });
    }
    //Прорисовка
    draw() {

    }

    finalize() {
        this.traits.forEach(trait => {
            trait.finalize();
        });
    }

    update(deltaTime, level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        });

        this.lifetime += deltaTime;
    }

    onRemove(){
      if(this.sprite == null)
        return;

      this.sprite.Remove();
    }
}
