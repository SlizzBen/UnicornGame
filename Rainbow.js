const RAINBOW = {
    imageURL: 'https://fintech.tinkoff.ru/static/images/js_game/rainbow_line.png',
    frames: [
        {
            name: 'idle',
            rect: [0, 0, 83, 93]
        },
        {
            name: 'spark-1',
            rect: [0, 0, 83, 93]
        },
        {
            name: 'spark-2',
            rect: [83, 0, 83, 93]
        },
        {
            name: 'spark-3',
            rect: [166, 0, 83, 93]
        },
        {
            name: 'spark-4',
            rect: [249, 0, 83, 93]
        },
        {
            name: 'spark-5',
            rect: [332, 0, 83, 93]
        },
        {
            name: 'spark-6',
            rect: [415, 0, 83, 93]
        }
    ],
    animations: [
        {
            name: 'spark',
            frameLen: 0.2,
            frames: [
                'spark-1',
                'spark-2',
                'spark-3',
                'spark-4',
                'spark-5',
                'spark-6'
            ]
        }
    ]
};

function loadRainbow() {
    return loadSpriteSheet(RAINBOW)
    .then(createRainbowFactory);
}


class BehaviorRainbow extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.pickable.picked || !them.picker) {
            return;
        }

        us.pickable.pick();
        us.vel.set(30, -400);
        us.solid.obstructs = false;
    }
}

class AdditionalJump extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.pickable.picked || !them.jump) {
            return;
        }
        console.log("Call collide on AdditionalJump");
        _SoundManager.Play("Sounds/jump.wav", 0.1);
        us.pickable.pick();
        them.jump.allowJump();
        us.vel.set(30, -400);
        us.solid.obstructs = false;
    }
}

function createRainbowFactory(sprite) {
    return function createRainbow() {
        const rainbow = new Entity();
        rainbow.size.set(83, 93);
        rainbow.sprite = new Sprite(RAINBOW.imageURL);
        rainbow.sprite.setSheet(RAINBOW);
        rainbow.sprite.animated = true;
        rainbow.sprite.setPositionAnchor(rainbow.pos);
        _SceneManager.currentScene.spriteRenderer.AddSprite(rainbow.sprite, 2);
        //rainbow.addTrait(new Physics());
        rainbow.addTrait(new Solid());
        rainbow.addTrait(new Pickable());
        rainbow.addTrait(new BehaviorRainbow());


        return rainbow;
    };
}

function createAddJump(sprite) {
  const rainbow = new Entity();
  rainbow.size.set(83, 93);
  rainbow.sprite = new Sprite("res/addJumpTile.png");
  rainbow.sprite.setPositionAnchor(rainbow.pos);
  _SceneManager.currentScene.spriteRenderer.AddSprite(rainbow.sprite, 2);
  //rainbow.addTrait(new Physics());
  rainbow.addTrait(new Solid());
  rainbow.addTrait(new Pickable((e) => {
    console.log("Call pick");
      console.log(e);
    _SceneManager.currentScene.level.playerEntity.jump.allowJump();
  }));
  rainbow.addTrait(new AdditionalJump());


  return rainbow;
}
