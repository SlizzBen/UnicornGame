let LoadedMenu = null;

class Menu
{
  constructor()
  {
    this.buttons = [];
    this.doms = [];
  }

  Load()
  {
    if(LoadedMenu)
    {
      LoadedMenu.Unload();
    }
    this.buttons.forEach((e) => {
        _SceneManager.currentScene.ui.push(e);
    });
    _SceneManager.currentScene.loadedMenu = this;
    this.AdditionalLoad();
    LoadedMenu = this;
  }

  AdditionalLoad()
  {

  }

  Unload()
  {
    this.buttons.forEach((e) => {
      let index = _SceneManager.currentScene.ui.indexOf(e);
      if(index > -1)
        _SceneManager.currentScene.ui.splice(index, 1);
    });
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    this.doms.forEach(e => {
      e.remove();
    })
  }

  AddButton(button)
  {
    this.buttons.push(button);
  }
}
