class SceneManager
{
  constructor()
  {

  }


  PlayScene(scene)
  {
    ClearAllButtonListeners();
    setTimeout(() => {

      document.getElementById('score-sign').innerHTML = "";
        document.getElementById('unicorn-score').innerHTML = "";
    }, 0);
    _SoundManager.StopAllPlayedSounds();
    if(this.currentScene)
    {
      this.currentScene.Unload();
      if(this.currentScene.loadedMenu)
      {
        this.currentScene.loadedMenu.Unload();
      }
    }
    this.currentScene = scene;
    scene.Play();
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  }



}
