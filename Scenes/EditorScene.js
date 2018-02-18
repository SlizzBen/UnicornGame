class EditorScene extends Scene
{
  constructor(level){
    super('Editor');
    this.lvl = level;
    this.redrawTime = 0.1;
  }

  async Start()
  {
    this.context = canvas.getContext('2d');
    this.timer = new Timer(1/60, this);

    this.editor = new Editor();
    this.editor.LoadLevel(this.lvl);


    this.timer.update = this.Update;
    this.timer.start();
  }

  Update(deltaTime, _class)
  {
    _class.redrawTime -= deltaTime;
    if(_class.redrawTime <= 0)
    {
      _class.redrawTime += 0.1;
      _Editor.draw();
    }

    _class.ui.forEach((e) => {
      e.draw();
    });
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
    _Editor.Close();

  }
}
