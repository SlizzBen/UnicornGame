function createAnim(frames, frameLen) {
    return function resolveFrame(distance) {
        const frameIndex = Math.floor(distance / frameLen) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
    };
}

class ImageLoader
{
  constructor()
  {
    this.images = {};
  }


  async LoadImage(url)
  {
    if(this.images[url])
      return this.images[url];
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
        this.images[url] = image;
    });
  }

  DrawImage(image, x, y)
  {
    if(!this.images[image])
    {
      this.LoadImage(image);
      return;
    }

    canvas.getContext('2d').drawImage(this.images[image], x, y);
  }

  DrawImageWithSize(image, x, y, width, height)
  {
    if(!this.images[image])
    {
      this.LoadImage(image);
      return;
    }

    canvas.getContext('2d').drawImage(this.images[image], x, y, width, height);
  }

  DrawImageWithRect(image, rectX, rectY, rectWidth, rectHeight, x, y, width, height)
  {
    if(!this.images[image])
    {
      this.LoadImage(image);
      return;
    }

    canvas.getContext('2d').drawImage(this.images[image], rectX, rectY, rectWidth, rectHeight, x, y, width, height);
  }
}

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
        return image;
    });
}

function loadSpriteSheet(name) {
    return new Promise(resolve => {
        resolve(name);
    })
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),
    ]))
    .then(([sheetSpec, image]) => {
        const sprites = new SpriteSheet(
            image,
            sheetSpec.tileW,
            sheetSpec.tileH);

        if (sheetSpec.frames) {
            sheetSpec.frames.forEach(frameSpec => {
                sprites.define(frameSpec.name, ...frameSpec.rect);
            });
        }

        if (sheetSpec.animations) {
            sheetSpec.animations.forEach(animSpec => {
                const animation = createAnim(animSpec.frames, animSpec.frameLen);
                sprites.defineAnim(animSpec.name, animation);
            });
        }

        return sprites;
    });
}
