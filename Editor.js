let _Editor;

class Editor
{
  constructor()
  {
    this.cam = new Vec2(0, 0);
    this.images = {};
    this.preloadImages();
    this.offset = new Vec2(100, 50);
    _Editor = this;
    this.LM = false;
    this.mousedown = function(e)
    {
      _Editor.LM = true;
      _Editor.OnMouseOver(e);
    }
    this.mouseup = function()
    {
      _Editor.LM = false;
    }

    this.onkeydown = function(e)
    {
      if(e.type == 'keyup') return;
      if(e.code == 'ArrowLeft')
      {
        _Editor.cam.x = Math.max(0, _Editor.cam.x - 10)
      }
      else if(e.code == 'ArrowRight'){
        _Editor.cam.x = _Editor.cam.x + 10;
      }
    }




    canvas.addEventListener('mousedown', this.mousedown, false);
    canvas.addEventListener('mouseup', this.mouseup, false);
    canvas.addEventListener('mousemove', this.OnMouseOver, false);
    ['keydown', 'keyup'].forEach(eventName => {
        window.addEventListener(eventName, this.onkeydown);
    });
    this.brush = "tile";
    this.map = [];


    _InEditorMenu.Load();
  }

  async preloadImages()
  {
    this.images['enemy'] = await loadImage('res/enemyTile.png');
    this.images['flyingenemy'] = await loadImage('res/enemyTile.png');
    this.images['buttonenemy'] = await loadImage('res/enemyTile.png');
    this.images['player'] = await loadImage('res/playerSpawner.png');
    this.images['empty'] = await loadImage('res/emptyTile.png');
    this.images['rainbow'] = await loadImage('res/rainbowTile.png');
    this.images['fill'] = await loadImage('res/tile.png');
    this.images['addJump'] = await loadImage('res/addJumpTile.png');
    this.draw();
  }

  OnMouseOver(e)
  {
    if(!_Editor.LM)
      return;
    var pos = new Vec2(e.offsetX, e.offsetY);
    pos.x -= _Editor.offset.x;
    pos.y -= _Editor.offset.y;

    var x = Math.floor(pos.x / 30) + _Editor.cam.x;
    var y = Math.floor(pos.y / 30) + _Editor.cam.y;
    if(x - _Editor.cam.x >= 20 || y - _Editor.cam.y >= 19) return;

    let curTile = (_Editor.map[x] == null) ? {type : 'empty'} : ((_Editor.map[x][y] != null) ? _Editor.map[x][y] : {type : 'empty'});



      if(_Editor.map[x] == null)
      {
        _Editor.map[x] = [];
      }


      switch (_Editor.brush) {
        case 'tile':
            _Editor.map[x][y] = {type : 'tile', x : x, y : y};
          break;
        case 'empty':
            _Editor.map[x][y] = {type : 'empty', x : x, y : y};
          break;
        case 'enemy':
              _Editor.map[x][y] = {type : 'enemy', x : x, y : y};
            break;
        case 'flyingenemy':
                  _Editor.map[x][y] = {type : 'flyingenemy', x : x, y : y};
                break;
        case 'buttonenemy':
                _Editor.map[x][y] = {type : 'buttonenemy', x : x, y : y};
                break;
        case 'rainbow':
        console.log(_Editor.map[x][y]);
              if(_Editor.map[x][y] != null && _Editor.map[x][y].type == "rainbow")
              {
                _Editor.map[x][y] = {type : 'addJump', x : x, y : y};
              }
              else{
                _Editor.map[x][y] = {type : 'rainbow', x : x, y : y};
              }
              break;
        default:
        _Editor.map[x][y] = {type : 'player', x : x, y : y};
      }
  }


  draw()
  {
    for(let x = 0; x < 20; x++)
    {
      for(let y = 0; y < 19; y++)
      {
        let levelX = x + _Editor.cam.x;
        let levelY = y + _Editor.cam.y;
        let tile = (_Editor.map[levelX] == null) ? null : _Editor.map[levelX][levelY];
        if(tile == null)
        {
          _Editor.drawTile(x, y, _Editor.images['empty']);
        }
        else if(tile != null)
        {
          if(tile.type == 'enemy')
          {
            _Editor.drawTile(x,y,_Editor.images['enemy']);
          }
          if(tile.type == 'flyingenemy')
          {
            _Editor.drawTile(x,y,_Editor.images['enemy']);
          }
          if(tile.type == 'buttonenemy')
          {
            _Editor.drawTile(x, y, _Editor.images['buttonenemy'])
          }
          else if(tile.type == 'rainbow')
          {
            _Editor.drawTile(x,y,_Editor.images['rainbow']);
          }
          else if(tile.type == 'tile'){
            _Editor.drawTile(x,y,_Editor.images['fill']);
          }
          else if(tile.type == 'empty')
          {
            _Editor.drawTile(x, y, _Editor.images['empty']);
          }
          else if(tile.type == "addJump")
          {
            _Editor.drawTile(x, y, _Editor.images['addJump']);
          }
          else {
            _Editor.drawTile(x,y,_Editor.images['player']);
          }
        }
      }
    }
  }


  drawTile(x, y, image)
  {
    x = this.offset.x + x * 30;
    y = this.offset.y + y * 30;
    let context = canvas.getContext('2d');
    context.drawImage(image, x, y, 30, 30);
  }

  Close()
  {
    clearInterval(this.interval);
    canvas.removeEventListener('mousedown', this.mousedown);
    canvas.removeEventListener('mouseup', this.mouseup);
    canvas.removeEventListener('mousemove', this.OnMouseOver);

    ['keydown', 'keyup'].forEach(eventName => {
        window.removeEventListener(eventName, this.onkeydown);
    });

    _SceneManager.currentScene.AddQueue(() => {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  GetLevel()
  {
    let lvl = {
      tiles : [],
      entities : []
    };

    for(var x = 0; x < this.map.length; x++)
    {
      if( !this.map[x] ) continue;
      for(var y = 0; y < this.map[x].length; y++){
        let obj = this.map[x][y];
        if(obj == null) continue;
        if( obj.type == 'tile' )
        {
          lvl.tiles.push({x : x,y : y});
        }
        else if(obj.type != 'empty'){
          lvl.entities.push({x : x, y : y, type : obj.type});
        }
      }
    }
    return lvl;
  }

  ConvertLevelToJSON()
  {
    let lvl = {
      tiles : [],
      entities : []
    };

    for(var x = 0; x < this.map.length; x++)
    {
      if( !this.map[x] ) continue;
      for(var y = 0; y < this.map[x].length; y++){
        let obj = this.map[x][y];
        if(obj == null) continue;
        if( obj.type == 'tile' )
        {
          lvl.tiles.push({x : x,y : y});
        }
        else if(obj.type != 'empty'){
          lvl.entities.push({x : x, y : y, type : obj.type});
        }
      }
    }

    return JSON.stringify(lvl);
  }

  SetMap(x, y, value)
  {
    if(!this.map[x])
      this.map[x] = [];
    this.map[x][y] = value;
  }

  LoadLevel(level)
  {
    console.log("Level loaded ");
    console.log(level);
    for(let tile of level.tiles)
    {
      tile.type = 'tile';
      this.SetMap(tile.x, tile.y, tile);
    }
    for(let entity of level.entities)
    {
      this.SetMap(entity.x, entity.y, entity)
    }
  }

}
