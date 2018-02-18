class SoundManager
{
  constructor()
  {
    this.audioSources = {};
  }

  AddSoundSource(src)
  {
    var audioElem = document.createElement("audio");
    audioElem.autoplay  = false;
    audioElem.src = src;
    document.body.appendChild(audioElem);
    this.audioSources[src] = audioElem;
    return audioElem;
  }

  Play(src, volume = 1)
  {
    if(this.audioSources[src] == null)
      this.AddSoundSource(src);
    this.audioSources[src].play();
    this.audioSources[src].volume = volume;
  }

  Stop(src){
    if(this.audioSources[src] == null)
      return;
    this.audioSources[src].pause();
    this.audioSources[src].currentTime = 0;
  }

  StopAllPlayedSounds()
  {
    for(let snd in _SoundManager.audioSources)
    {
      _SoundManager.Stop(snd);
    }
  }
}




//"Sounds/ui_btn_click.wav"
