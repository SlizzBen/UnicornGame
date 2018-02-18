class Scene
{
  constructor(name)
  {
    this.name = name;
    this.timer;
    this.ui = [];
    this.queue = [];
  }

  Play()
  {
    this.Start();
    let scene = this;


  }

  Start()
  {

  }

  Unload()
  {
    this.timer.stop();
    while(this.ui.length > 0)
    {
      delete(this.ui[0]);
      this.ui.splice(0, 1);
    }
  }

  ClickEvent(pos)
  {
    console.log("Click in ui", this.ui);
    this.ui.forEach((e) => {
      if(e.isClick(pos))
      {
        //break;
      }

    });
    this.UpdateQueue(0, this);
  }

  Update(deltaTime)
  {

  }

  UpdateQueue(deltaTime, _class)
  {
    while(_class.queue.length > 0)
    {
      _class.queue[0]();
      _class.queue.splice(0, 1);
    }
  }

  AddQueue(func)
  {

    this.queue.push(func);
  }
}
