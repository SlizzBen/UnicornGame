class TextInput
{
  constructor(x, y, text = "0")
  {
    this.elem = document.createElement("INPUT");
    document.body.appendChild(this.elem);
    this.elem.style.position = "absolute";
    this.elem.style.left = (canvas.getBoundingClientRect().x + x)+"px";
    this.elem.style.top = y+"px";
    this.elem.value = text;
  }

  GetText()
  {
    return this.elem.value;
  }

  remove()
  {
    this.elem.remove();
  }

}
