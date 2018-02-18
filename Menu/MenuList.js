const _MainMenu = new Menu();
const _LevelList = new Menu()
const _EditorMenu = new Menu();
const _InEditorMenu = new Menu();

async function PreloadMenuList()
{
  //MainMenu
  var btn = new Button(canvas.width/2 - 100, 200, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Play');
  btn.OnClick = function(){
    _LevelList.Load();
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _MainMenu.AddButton(btn);

  var btn = new Button(canvas.width/2 - 100, 300, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Редактор');
  btn.OnClick = function(){
    _EditorMenu.Load();
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _MainMenu.AddButton(btn);


//Меню выбора уровня
  var btn = new Button(canvas.width/2 - 100, 200, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('1');
  _GameScene = new GameScene(LevelList.get("0"));
  btn.OnClick = function(){
     _GameScene = new GameScene(LevelList.get("0"));
    _SceneManager.PlayScene(_GameScene);
    currentLevel = 1;
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _LevelList.AddButton(btn);

  var btn = new Button(canvas.width/2 - 100, 300, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('2');
  btn.OnClick = function(){
    if(compliteLevels < 1)
    {
      alert("Выполните предыдущие уровни");
      return;
    }
     _GameScene = new GameScene(LevelList.get("1"));
     currentLevel = 1;
    _SceneManager.PlayScene(_GameScene);
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _LevelList.AddButton(btn);

  var btn = new Button(canvas.width/2 - 100, 400, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('3');
  btn.OnClick = function(){
    if(compliteLevels < 2)
    {
      alert("Выполните предыдущие уровни");
      return;
    }
     _GameScene = new GameScene(LevelList.get("2"));
     currentLevel = 2;
    _SceneManager.PlayScene(_GameScene);
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _LevelList.AddButton(btn);

  var btn = new Button(canvas.width/2 - 100, 500, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('4');
  btn.OnClick = function(){
    if(compliteLevels < 3)
    {
      alert("Выполните предыдущие уровни");
      return;
    }
     _GameScene = new GameScene(LevelList.get("3"));
     currentLevel = 3;
    _SceneManager.PlayScene(_GameScene);
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _LevelList.AddButton(btn);


  //Кнопки редактора
let input;
  _EditorMenu.AdditionalLoad = () => {
      input = new TextInput(canvas.width / 2 - 60, 150, "0");
      _EditorMenu.doms.push(input);
  };


  var btn = new Button(canvas.width/2 - 100, 200, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Загрузить');
  btn.OnClick = function(){
    let lvl = LevelList.get(input.GetText());
    let _EditorScene = new EditorScene(lvl);
    _SceneManager.PlayScene(_EditorScene);
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _EditorMenu.AddButton(btn);

  var btn = new Button(canvas.width/2 - 100, 300, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Новый');
  btn.OnClick = function(){
    let _EditorScene = new EditorScene(GetFreeLevel());
    _SceneManager.PlayScene(_EditorScene);
    console.log("Click on new btn");
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _EditorMenu.AddButton(btn);

  var btn = new Button(canvas.width/2 - 100, 400, await _ImageLoader.LoadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('В МЕНЮ');
  btn.OnClick = function(){
    _MainMenu.Load();
  };
  btn.size(200, 60);
  btn.fontSize(30);
  _EditorMenu.AddButton(btn);

  ///////////////////// В редакторе
  var btn = new Button(10, canvas.height - 30, await loadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Tile');
  btn.OnClick = function(){
    _Editor.brush = 'tile';
  };
  btn.size(100, 30);
  btn.fontSize(15);
  _InEditorMenu.AddButton(btn);

  var btn = new Button(110, canvas.height - 30, await loadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Empty');
  btn.OnClick = function(){
    _Editor.brush = 'empty'
  };
  btn.size(100, 30);
  btn.fontSize(15);
  _InEditorMenu.AddButton(btn);

  let enemy_btn = new Button(210, canvas.height - 30, await loadImage('res/button.png'), canvas.getContext('2d'));
  enemy_btn.addText('Enemy');
  enemy_btn.OnClick = function(){
    let enemyList = ['enemy', 'flyingenemy', 'buttonenemy'];
    let index = enemyList.indexOf(_Editor.brush);
    if(index != -1)
    {
      var currentEnemy = (enemyList.length - 1 == index) ? 0 : index + 1;
      _Editor.brush = enemyList[currentEnemy];
      enemy_btn.addText(enemyList[currentEnemy]);
    }
    else
    {
      _Editor.brush = enemyList[0];
      enemy_btn.addText(enemyList[0]);
    }
  };
  enemy_btn.size(100, 30);
  enemy_btn.fontSize(15);
  _InEditorMenu.AddButton(enemy_btn);

  var btn = new Button(310, canvas.height - 30, await loadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Rainbow');
  btn.OnClick = function(){
    _Editor.brush = 'rainbow'
  };
  btn.size(100, 30);
  btn.fontSize(15);
  _InEditorMenu.AddButton(btn);

  var btn = new Button(410, canvas.height - 30, await loadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Player');
  btn.OnClick = function(){
    _Editor.brush = 'player'
  };
  btn.size(100, 30);
  btn.fontSize(15);
  _InEditorMenu.AddButton(btn);

  var btn = new Button(510, canvas.height - 30, await loadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('Показать');
  btn.OnClick = function(){
    let lvl = _Editor.GetLevel();
    LevelList.set("test", lvl);
    console.log(_Editor.ConvertLevelToJSON());
    var _GameScene = new GameScene(lvl);
     _GameScene = new GameScene(lvl);
    _SceneManager.PlayScene(_GameScene);
    _EditorMode = true;
  };
  btn.size(100, 30);
  btn.fontSize(15);
  _InEditorMenu.AddButton(btn);

  var btn = new Button(610, canvas.height - 30, await loadImage('res/button.png'), canvas.getContext('2d'));
  btn.addText('В меню');
  btn.OnClick = function(){
    _SceneManager.PlayScene(_MainMenuScene);
    _EditorMode = false;
  };
  btn.size(100, 30);
  btn.fontSize(15);
  _InEditorMenu.AddButton(btn);

}
