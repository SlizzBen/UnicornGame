class Physics extends Trait {
    constructor() {
        super('physics');
    }

    update(entity, deltaTime, level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity);

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity);

        entity.vel.y += level.gravity * deltaTime;
    }
}

class Solid extends Trait {
    constructor() {
        super('solid');
        this.obstructs = true;
    }

    obstruct(entity, side, match) {
        if (!this.obstructs) {
            return;
        }

        if (side === SIDES.BOTTOM) {
            entity.bounds.bottom = match.y1;
            entity.vel.y = 0;
        } else if (side === SIDES.TOP) {
            entity.bounds.top = match.y2;
            entity.vel.y = 0;
        } else if (side === SIDES.LEFT) {
            entity.bounds.left = match.x2;
            entity.vel.x = 0;
        } else if (side === SIDES.RIGHT) {
            entity.bounds.right = match.x1;
            entity.vel.x = 0;
        }
    }
}

class PlayerController extends Trait {
    constructor() {
        super('playerController');
        this.checkpoint = new Vec2(0, 0);
        this.player = null;
        this.score = 0;
        this.scoreSelector = document.getElementById('unicorn-score');
    }

    setPlayer(entity) {
        this.player = entity;

        this.player.picker.onPick = () => {
            this.score += 50;

            setTimeout(() => {
                this.scoreSelector.innerHTML = this.score;
            }, 0);
        }
    }

    AddPoints(pts)
    {
      this.score += pts;

      setTimeout(() => {
          this.scoreSelector.innerHTML = this.score;
      }, 0);
    }

    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)
           || this.player.pos.y > 1200) {
            this.player.killable.kill();
            //this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            //level.entities.add(this.player);
        }
        if(this.player.pos.x >= _SceneManager.currentScene.level.end_point - 80)
        {
          _SceneManager.currentScene.SaveResult();
          this.player.killable.kill();
        }
    }
}

class Run extends Trait {
    constructor() {
        super('run');

        this.speed = 13000;
        this.distance = 0;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.speed * deltaTime;
        this.distance += Math.abs(entity.vel.x) * deltaTime;
    }
}

class Jump extends Trait {
    constructor() {
        super('jump');

        this.ready = 0;
        this.duration = 0.8;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.1;
        this.speedBoost = 0.3;
        this.velocity = 200;
    }

    get falling() {
        return this.ready < 0;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    obstruct(entity, side) {
        if (side === SIDES.BOTTOM) {
            this.ready = 1;
        } else if (side === SIDES.TOP) {
            this.cancel();
        }
    }

    allowJump()
    {
      this.requestTime = this.gracePeriod;
      this.ready = 1;
    }

    update(entity, deltaTime) {
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this.requestTime -= deltaTime;
        }

        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }
}
//Черта того, что энтити может быть убит
class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = .3;
        this.onKillListeners = [];
        this.lastFrameAlive = true;
    }

    kill() {
        this.queue(() => this.dead = true);
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
        this.lastFrameAlive = true;
    }

    update(entity, deltaTime, level) {
        if(this.lastFrameAlive && this.dead){
          this.lastFrameAlive = false;
          this.onKillListeners.forEach((e) => {e();});
        }
        if (this.dead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.removeAfter) {
                this.queue(() => {
                    level.entities.delete(entity);
                });
            }
        }
    }

    AddDieListener(lis)
    {
      console.log("Register new listener");
      this.onKillListeners.push(lis);
    }
}
//Черта того, что энтит может быть подобран Pickerom
class Pickable extends Trait {
    constructor(func) {
        super('pickable');
        this.picked = false;
        this.pickTime = 0;
        this.removeAfter = 0;
        if(func != null)
          this.OnPick = func;
    }

    pick(e) {
        this.picked = true;
    }

    update(entity, deltaTime, level) {
        if (this.picked) {
            this.pickTime += deltaTime;
            if (this.pickTime > this.removeAfter) {
              if(this.OnPick != null)
                this.OnPick(entity);
                this.queue(() => {
                    entity.onRemove();
                    level.entities.delete(entity);

                });
            }
        }
    }
}

class Picker extends Trait {
    constructor() {
        super('picker');
        this.onPick = function() {
        }
    }

    collides(us, them) {
        if (!them.pickable || them.pickable.picked) {
            return;
        }


        this.onPick(us, them);
    }
}
