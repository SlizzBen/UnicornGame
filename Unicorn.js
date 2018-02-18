const UNICORN = {
    imageURL: 'https://fintech.tinkoff.ru/static/images/js_game/unicorn_full.png',
    frames: [
        {
            name: 'idle',
            rect: [0, 0, 172, 119]
        },
        {
            name: 'run-1',
            rect: [0, 0, 172, 119]
        },
        {
            name: 'run-2',
            rect: [173, 0, 172, 119]
        },
        {
            name: 'run-3',
            rect: [344, 0, 172, 119]
        },
        {
            name: 'run-4',
            rect: [517, 0, 172, 119]
        },
        {
            name: 'break',
            rect: [0, 0, 172, 119]
        },
        {
            name: 'jump',
            rect: [690, 0, 172, 119]
        },
        {
            name: 'death-1',
            rect: [0, 120, 172, 119]
        },
        {
            name: 'death-2',
            rect: [173, 120, 172, 119]
        },
        {
            name: 'death-3',
            rect: [344, 120, 172, 119]
        },
        {
            name: 'death-4',
            rect: [517, 120, 172, 119]
        },
        {
            name: 'death-5',
            rect: [690, 120, 172, 119]
        },
        {
            name: 'death-6',
            rect: [863, 120, 172, 119]
        },
        {
            name: 'death-7',
            rect: [1036, 120, 172, 119]
        },
        {
            name: 'death-8',
            rect: [1209, 120, 172, 119]
        },
        {
            name: 'death-9',
            rect: [1382, 120, 172, 119]
        }
    ],

    animations: [
        {
            name: 'run',
            frameLen: 0.2,
            frames: [
                'run-1',
                'run-2',
                'run-3',
                'run-4'
            ]
        },
        {
            name: 'death',
            frameLen: 0.2,
            frames: [
                'death-5',
                'death-6',
                'death-7',
                'death-8',
                'death-9'
            ]
        },
        {
          name: 'jump',
          frameLen : 1,
          frames: [
            'jump'
          ]
        }
    ]
};


function UnicornAnimationController(unicorn)
{
  if(unicorn.killable.dead)
  return;
  if(unicorn.jump.falling){
    unicorn.sprite.PlayAnimation('jump');
  }
  else
  {
    unicorn.sprite.PlayAnimation('run');
  }
}

function loadUnicorn() {
    return loadSpriteSheet(UNICORN)
    .then(createUnicornFactory);
}

function createUnicornFactory(sprite) {
    return function createUnicorn() {
        const unicorn = new Entity();

        unicorn.size.set(120, 90);
        unicorn.offset.x = 20;
        unicorn.offset.y = 29;
        unicorn.sprite = new Sprite(UNICORN.imageURL);
        unicorn.addTrait(new Physics());
        unicorn.addTrait(new Solid());
        unicorn.addTrait(new Run());
        unicorn.addTrait(new Jump());
        unicorn.addTrait(new Picker());
        unicorn.addTrait(new Killable());

        unicorn.killable.removeAfter = 1;
        unicorn.killable.AddDieListener(() => {
          if(unicorn.runEnd)
            return;
            unicorn.traits[2].speed = 0;
            unicorn.vel.x = 0;
            unicorn.runEnd = true;
            unicorn.sprite.PlayAnimation('death');
          setTimeout(() => {
            _SceneManager.currentScene.AddQueue(() => {
              _SceneManager.PlayScene(_MainMenuScene);
            });
          }, 1000)

        });
        unicorn.sprite.setSheet(UNICORN);
        unicorn.sprite.setPositionAnchor(unicorn.pos);
        unicorn.sprite.setOffset(_SceneManager.currentScene.camera.pos);
        _SceneManager.currentScene.spriteRenderer.AddSprite(unicorn.sprite, 10);
        unicorn.sprite.animated = true;
        unicorn.sprite.PlayAnimation('run');
        return unicorn;
    }
}
