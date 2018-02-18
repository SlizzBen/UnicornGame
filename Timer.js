class Timer {
    constructor(deltaTime = 1/60, _class) {
        let accumulatedTime = 0;
        let lastTime = 0;
        this.class = _class;
        this.add_list = [];
        this.stoped = false;
        this.updateProxy = (time) => {
            if(lastTime == 0)
              lastTime = time;
            accumulatedTime += (time - lastTime) / 1000;

            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            }

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime, _class);
                accumulatedTime -= deltaTime;


            }

            lastTime = time;

            this.enqueue();
        }
    }

    enqueue() {
      if(this.stoped)
        return;
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }

    stop()
    {
      this.stoped = true;
    }

    addListener(func){
      this.add_list.push(func);
    }
}
