class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
        this.animations = new Map();
    }

    defineAnim(name, animation) {
        this.animations.set(name, animation);
    }

    define(name, x, y, width, height) {
        const buffers = [false, true].map(() => {
            const buffer = document.createElement('canvas');
            buffer.width = width;
            buffer.height = height;

            const context = buffer.getContext('2d');

            context.drawImage(
                this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                width,
                height);

            return buffer;
        });

        this.tiles.set(name, buffers);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name)[0];
        //context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}

class SpriteDrawer
{
  constructor()
  {
    this.layers = [];
  }

  AddSprite(sprite, depth)
  {
    if(!this.layers[depth])
    this.layers[depth] = [];
    this.layers[depth].push(sprite);
    sprite.layer = this.layers[depth];
  }

  Draw(dt)
  {
    this.layers.forEach(layer => {
      layer.forEach(spr => {
        spr.Draw(dt);
      });
    });
  }
}


class Sprite
{
  constructor(pathToImage){
    _ImageLoader.LoadImage(pathToImage).then(e => this.setImage(e));
    this.loaded = false;
    this.position = new Vec2(0, 0);
    this.frames = {};
    this.path = pathToImage;
    this.offset;
    this.size = new Vec2(60, 60);
    this.animated = false;
    this.animations = {};
    this.currentAnimation = null;
    this.currentFrame = 0;
    this.timer = 0;
    this.layer;
    this.setOffset(_SceneManager.currentScene.camera.pos);
  }

  setSize(size)
  {
    this.size = size;
  }

  setPositionAnchor(pos)
  {
    this.position = pos;
  }

  setOffset(offset)
  {
    this.offset = offset;
  }

  setPosition(x, y)
  {
    this.position = new Vec2(x, y);
  }


  setImage(image)
  {
    this.image = image;
    this.loaded = true;
  }

  setSheet(sheet)
  {
    let first = true;
    for(let frame of sheet.frames){
      this.frames[frame.name] = {x : frame.rect[0], y : frame.rect[1], width : frame.rect[2], height : frame.rect[3]};
    }
    for(let animation of sheet.animations)
    {
      this.animations[animation.name] = animation;
      if(first)
      {
        this.PlayAnimation(animation.name);
      }
    }
  }

  PlayAnimation(name)
  {
    if(this.currentAnimation == this.animations[name])
      return;
    this.currentAnimation = this.animations[name];
    this.currentFrame = 0;
    this.timer = 0;
  }

  NextFrame()
  {
    this.currentFrame++;
    if(this.currentFrame >= this.currentAnimation.frames.length)
    {
      this.currentFrame = 0;
    }
  }

  Draw(dt)
  {
    if(!this.loaded) return;
    let offset = {x : 0, y : 0};
    if(this.offset)
    {
      offset.x = this.offset.x;
      offset.y = this.offset.y;
    }
    if(!this.animated)
    {
      _ImageLoader.DrawImageWithSize(this.path, this.position.x - offset.x, this.position.y - offset.y, this.size.x, this.size.y);
    }
    else {
      this.timer += dt;
      let anim_length = this.currentAnimation.frameLen;
      while(this.timer > anim_length)
      {
        this.timer -= anim_length;
        this.NextFrame();
      }
      this.DrawFrame(this.currentAnimation.frames[this.currentFrame]);
    }

  }

  DrawFrame(name)
  {
    if(!this.loaded) return;
    if(!this.frames[name])
      return;
      let frame = this.frames[name];
      let offset = {x : 0, y : 0};
      if(this.offset)
      {
        offset.x = this.offset.x;
        offset.y = this.offset.y;
      }
      _ImageLoader.DrawImageWithRect(this.path, frame.x, frame.y, frame.width, frame.height, this.position.x - offset.x, this.position.y - offset.y, frame.width, frame.height);
  }

  Remove()
  {
    if(this.layer == null)
      return;
    this.layer.splice(this.layer.indexOf(this), 1);
  }
}
