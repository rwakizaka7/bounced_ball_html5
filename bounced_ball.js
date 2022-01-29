var game = new Phaser.Game({
        type: Phaser.WEBGL,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#9adaea',
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    })

function preload() {
    this.load.image('sky', 'assets/sky.png');
}

function create() {
    
    var skyButton = this.add.image(100, 100, 'sky').setInteractive();
    
    this.input.on('gameobjectup', function (pointer, gameobject) {
        if (gameobject === skyButton) {
            console.log('u')
        }
    });
    
    this.input.on('gameobjectdown', function (pointer, gameobject) {
        if (gameobject === skyButton) {
            console.log('d')
        }
    });
}

function update() {
    //console.log('up')
}
