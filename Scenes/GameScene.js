class GameScene extends Scene
{
  constructor(level){

    super('Game');
    this.targetLevel = level;

    this.spriteRenderer = new SpriteDrawer();
  }


  async Start()
  {
    setTimeout(() => {
      document.getElementById('score-sign').innerHTML = "score";
        document.getElementById('unicorn-score').innerHTML = 0;
    }, 0);
    this.timer = new Timer(1/60, this);
    this.camera = new Camera();
    this.context = canvas.getContext('2d');
    this.entityFactory = await loadChars();
    this.loadLevel = await createLevelLoader(this.entityFactory);
    this.level = await this.loadLevel(this.targetLevel);
    this.playerEnv = createPlayerEnv(this.level.playerEntity);
    this.timer.add_list.push(() => {UnicornAnimationController(this.level.playerEntity);});
    this.level.entities.add(this.playerEnv);

    AddButtonEventListener(this.PlayerButtonInput);
    this.timer.update = this.Update;
    this.timer.start();
  }

  PlayerButtonInput(event)
  {
    console.log("Event code - " + event.code);
    if (event.code === 'Space') {
        const keyState = event.type === 'keydown' ? 1 : 0;

        if (keyState > 0) {
            _SceneManager.currentScene.level.playerEntity.jump.start();
        } else {
            _SceneManager.currentScene.level.playerEntity.jump.cancel();
        }
    }
  }

  Update(deltaTime, _class)
  {
    _class.level.update(deltaTime);
    _class.camera.pos.x = Math.max(0, _class.level.playerEntity.pos.x - 100);
    _class.camera.pos.y = Math.max(0, _class.level.playerEntity.pos.y - 300);
    //_class.level.comp.draw(_class.context, _class.camera);
    _class.timer.add_list.forEach((e) => {
      e();
    });
    _class.spriteRenderer.Draw(deltaTime);
    _class.UpdateQueue(deltaTime, _class);
  }

  Unload()
  {
    this.timer.stop();
    while(this.ui.length > 0)
    {
      delete(this.ui[0]);
      this.ui.splice(0, 1);
    }

    RemoveButtonEventListener(this.PlayerButtonInput);
  }

  SaveResult()
  {
    if(currentLevel == compliteLevels)
    {
      compliteLevels++;
      localStorage.setItem('level', compliteLevels);
    }
  }
}
