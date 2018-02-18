let timer;
let _EditorMode = false;
let currentLevel = -1;
let compliteLevels = (localStorage.getItem("level")) ? +localStorage.getItem('level') : 1;
let ShowButtonBugTip = false;
//Создание игрока
function createPlayerEnv(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkpoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}
//Загрузка персонажей
function loadChars() {
    const entityFactories = {};

    function addFactory(name) {
        return factory => entityFactories[name] = factory;
    }
    entityFactories['addJump'] = createAddJump;
    entityFactories['flyingenemy'] = createFlyingEnemy;
    entityFactories['buttonenemy'] = createButtonMonster;

    return Promise.all([
        loadUnicorn().then(addFactory('player')),
        loadEnemyBug().then(addFactory('enemy')),
        loadRainbow().then(addFactory('rainbow')),
    ])
    .then(() => entityFactories);
}

async function main(canvas) {

}
const _ImageLoader = new ImageLoader();
const canvas = document.getElementById('screen');
const onClickEvents = [];
canvas.addEventListener('click', (e) => {
  var pos = [e.offsetX, e.offsetY];
  for(var i = 0 ; i < onClickEvents.length; i++){
    onClickEvents(pos);
  }
  if(_SceneManager && _SceneManager.currentScene)
    _SceneManager.currentScene.ClickEvent(pos);
}, false);

function AddClickListener(func){
  onClickEvents.push(func);
}

function RemoveAllClickListeners(){
  onClickEvents = [];
}


let buttons = [{key : 'KeyZ', anim : 'z'},
{key : 'KeyX', anim : 'x'},
{key : 'KeyC', anim : 'c'}
];
let AreRemoved = false;
['keydown', 'keyup'].forEach(eventName => {
    window.addEventListener(eventName, event => {
      AreRemoved= false;
      var needCheck = false;
      if(event.type === 'keydown')
        buttons.forEach(b => {if(event.code == b.key) needCheck = true;})
      ButtonClickListeners.forEach(e => {
        e(event);
      })
      if(needCheck && !AreRemoved)
      {
        _SceneManager.currentScene.playerEnv.playerController.AddPoints(-50);
      }
    });
});

let ButtonClickListeners = [];

function AddButtonEventListener(f){
  ButtonClickListeners.push(f);
}

function RemoveButtonEventListener(f)
{
  ButtonClickListeners.splice(ButtonClickListeners.indexOf(f), 1);
}

function ClearAllButtonListeners()
{
  ButtonClickListeners = [];
}


let _SceneManager = new SceneManager();
let _MainMenuScene;
async function Preload()
{
  await PreloadMenuList();
  _MainMenuScene = new MainMenuScene();
  _SceneManager.PlayScene(_MainMenuScene);
}
Preload();

const _SoundManager = new SoundManager();
