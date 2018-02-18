class Button
{
  constructor(x, y, img, context)
  {
    this.x = x;
    this.y = y;
    this.src =
    this.img = img;
    this.ctx = context;
  }

  addText(text)
  {
    if(!this.fontSize)
      this.fontSize = 15;
    if(!this.font)
      this.font = "Arial";

    this.text = text;
  }

  draw()
  {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
    this.ctx.font = this.fontSize+"px " + this.font;
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.text, this.x + this.img.width / 2, this.y + this.img.height / 2 + 5);
  }

  isClick(pos)
  {
    var pX = - this.x + pos[0];
    var pY = - this.y + pos[1];
    if(pX >= 0 && pX < this.img.width && pY >= 0 && pY < this.img.height)
    {
      _SoundManager.Play('Sounds/ui_btn_click.wav');
      _SceneManager.currentScene.AddQueue(() => {this.OnClick()});

    }
    else
    {
      //console.log("NoClick");
    }
  }

  OnClick()
  {

  }

  size(width, height)
  {
    this.img.width = width;
    this.img.height = height;
  }

  fontSize(size)
  {
    this.fontSize = size;
  }

}
