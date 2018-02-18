class Level {
    constructor(level) {
        this.gravity = 1500;
        this.totalTime = 0;
        this.level = level;

        this.comp = new Compositor();
        this.entities = new Set();

        let tileMatrix = new Matrix();
        for(let tile of level.tiles)
        {
          tileMatrix.set(tile.x, tile.y, {});
          let sprite = new Sprite('res/emptyTile.png');
          sprite.setPosition(tile.x * 60, tile.y * 60);
          sprite.setSize(new Vec2(60, 60));
          sprite.setOffset(_SceneManager.currentScene.camera.pos);
          _SceneManager.currentScene.spriteRenderer.AddSprite(sprite, 1);
        }

        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = null;

        setupEntities(level, this, _SceneManager.currentScene.entityFactory);
        this.setCollisionGrid(tileMatrix);
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime) {
        //draw background
        var ctx = canvas.getContext('2d');
        var my_gradient=ctx.createLinearGradient(0,0,0,170);
        my_gradient.addColorStop(0,"#0715BD");
        my_gradient.addColorStop(1,"#447CED");
        ctx.fillStyle=my_gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
        });

        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });


        this.entities.forEach(entity => {
            entity.finalize();
        });

        this.totalTime += deltaTime;
    }
}
