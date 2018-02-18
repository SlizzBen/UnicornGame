class MainMenuScene extends Scene
{
  constructor(){
    super('Menu');
  }

  async Start()
  {
    _SoundManager.Play("Sounds/main_menu_theme.ogg", 0.1);
    this.context = canvas.getContext('2d');
    this.timer = new Timer(1/60, this);

    _MainMenu.Load();


    this.timer.update = this.Update;
    this.timer.start();

    if(_EditorMode)
    {
      let lvl = LevelList.get("test");
      let _EditorScene = new EditorScene(lvl);
      _SceneManager.PlayScene(_EditorScene);
    }
  }

  Update(deltaTime, _class)
  {

    _class.ui.forEach((e) => {
      e.draw();
    });
  }



  Unload()
  {

  }
}
