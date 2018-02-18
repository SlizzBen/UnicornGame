const ENEMY_BUG = {
    imageURL: 'https://fintech.tinkoff.ru/static/images/js_game/bug_line.png',
    frames: [
        {
            name: 'idle',
            rect: [0, 0, 58, 65]
        },
        {
            name: 'frame-1',
            rect: [0, 0, 58, 65]
        },
        {
            name: 'frame-2',
            rect: [58, 0, 58, 65]
        },
        {
            name: 'frame-3',
            rect: [116, 0, 58, 65]
        },
        {
            name: 'frame-4',
            rect: [174, 0, 58, 65]
        },
        {
            name: 'frame-5',
            rect: [232, 0, 58, 65]
        }
    ],
    animations: [
        {
            name: 'anim',
            frameLen: 0.2,
            frames: [
                'frame-1',
                'frame-2',
                'frame-3',
                'frame-4',
                'frame-5'
            ]
        }
    ]
};

const FLYING_ENEMY ={
  imageURL: 'res/flyingBug.png',
  frames: [
      {
          name: 'idle',
          rect: [0, 0, 29, 29]
      },
      {
          name: 'idle-2',
          rect: [30, 0, 30, 30]
      }
  ],
  animations: [
      {
          name: 'anim',
          frameLen: 0.2,
          frames: [
              'idle',
              'idle-2'
          ]
      }
  ]
};

const BUTTONS = {
  imageURL : 'res/buttons.png',
  frames: [
    {
      name : 'z',
      rect: [0,0,30,30]
    },
    {
      name : 'x',
      rect: [30,0,30,30]
    },
    {
      name : 'c',
      rect: [60,0,30,30]
    }
  ],
  animations: [
    {
      name : 'z',
      frameLen : 10,
      frames: [
        'z'
      ]
    },
    {
      name : 'x',
      frameLen : 10,
      frames: [
        'x'
      ]
    },
    {
      name : 'c',
      frameLen : 10,
      frames: [
        'c'
      ]
    }
  ]
}

function loadEnemyBug() {
    return loadSpriteSheet(ENEMY_BUG)
    .then(createEnemyBugFactory);
}

class BehaviorEnemyBug extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead || !them.killable) {
            return;
        }

        them.killable.kill();
    }
}

class BehaviourButtonBug extends Trait {
  constructor(){
    super("behavior");
  }

  collides(us, them) {
      if (us.killable.dead || !them.killable) {
          return;
      }
      if(!ShowButtonBugTip)
      {
        alert("Нажмите клавишу написанную над жуком, для того, чтобы убить его. При этом жук должен находиться не далеко от вас");
        ShowButtonBugTip = true;
      }
      them.killable.kill();
  }
}

function createEnemyBugFactory(sprite) {


    return function createEnemyBug() {
        const enemyBug = new Entity();
        enemyBug.size.set(58, 45);
        enemyBug.offset.y = 20;
        enemyBug.sprite = new Sprite(ENEMY_BUG.imageURL);
        enemyBug.sprite.setSheet(ENEMY_BUG);
        enemyBug.sprite.animated = true;
        enemyBug.sprite.setPositionAnchor(enemyBug.pos);
        _SceneManager.currentScene.spriteRenderer.AddSprite(enemyBug.sprite, 2);
        enemyBug.addTrait(new Physics());
        enemyBug.addTrait(new Solid());
        enemyBug.addTrait(new BehaviorEnemyBug());
        enemyBug.addTrait(new Killable());

        return enemyBug;
    };
}

function createFlyingEnemy() {
  const flyingBug = new Entity();
  flyingBug.size.set(58, 45);
  flyingBug.offset.y = 20;
  flyingBug.sprite = new Sprite(FLYING_ENEMY.imageURL);
  flyingBug.sprite.setSheet(FLYING_ENEMY);
  flyingBug.sprite.animated = true;
  flyingBug.sprite.setPositionAnchor(flyingBug.pos);
  _SceneManager.currentScene.spriteRenderer.AddSprite(flyingBug.sprite, 2);
  flyingBug.addTrait(new Solid());
  flyingBug.addTrait(new BehaviorEnemyBug());
  flyingBug.addTrait(new Killable());

  return flyingBug;
}


function createButtonMonster(){
  const buttonMonster = new Entity();

  let btn = buttons[getRandomInt(0, buttons.length)];
  buttonMonster.size.set(58,45);
  buttonMonster.offset.y = 20;
  buttonMonster.sprite = new Sprite(ENEMY_BUG.imageURL);
  buttonMonster.sprite.setSheet(ENEMY_BUG);
  buttonMonster.sprite.animated = true;
  buttonMonster.sprite.setPositionAnchor(buttonMonster.pos);
  _SceneManager.currentScene.spriteRenderer.AddSprite(buttonMonster.sprite, 2);
  buttonMonster.addTrait(new Solid());
  buttonMonster.addTrait(new BehaviourButtonBug());
  buttonMonster.addTrait(new Killable());

  let btn_sprite = new Sprite(BUTTONS.imageURL);
  btn_sprite.setSheet(BUTTONS);
  btn_sprite.animated = true;
  btn_sprite.setPositionAnchor(buttonMonster.pos);
  btn_sprite.PlayAnimation(btn.anim);
  _SceneManager.currentScene.spriteRenderer.AddSprite(btn_sprite, 3);

  let btnEvent = (event) => {
    if(!buttonMonster || !_SceneManager.currentScene.level)
      {
        return;
      }
    if(event.code == btn.key && event.type === 'keydown'){
      if(AreRemoved)
        return;
      let posOnScreen = buttonMonster.sprite.position.x - buttonMonster.sprite.offset.x;
      if(posOnScreen >= 0 && posOnScreen < (canvas.width - canvas.width * 0.3))
      {
        AreRemoved= true;
        if(_SceneManager.currentScene.level)
        _SceneManager.currentScene.level.entities.delete(buttonMonster);
        buttonMonster.onRemove();
        btn_sprite.Remove();

        RemoveButtonEventListener(btnEvent);
      }
    }
  }
  AddButtonEventListener(btnEvent);

  return buttonMonster;

  /*
  entity.onRemove();
  level.entities
  */
}
