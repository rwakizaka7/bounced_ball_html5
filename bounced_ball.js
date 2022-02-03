var screenSize = {
    width: window.innerWidth <= window.innerHeight
        ? window.innerWidth : window.innerHeight,
    height: window.innerHeight
};

var game = new Phaser.Game({
    type: Phaser.WEBGL,
    width: screenSize.width,
    height: screenSize.height,
    backgroundColor: '#9adaea',
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     width: screen.width,
    //     height: screen.height
    // },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

var pressButtonInfo = {
    key: 'press_button',
    url: 'assets/press_to_start_50x50.svg',
    width: 50,
    height: 50,
    zoomRate: 1,
    getZoomSize: function () {
        return {
            width: this.width * this.zoomRate,
            height: this.height * this.zoomRate
        };
    },
    getCenter: function () {
        return {
            x: this.getZoomSize().width / 2,
            y: this.getZoomSize().height / 2
        }
    },
    offsetRate: {
        x: 0.1, y: 0.1
    },
    getOffset: function (screenSize) {
        return {
            x: screenSize.width * this.offsetRate.x,
            y: screenSize.width * this.offsetRate.y,
        }
    },
    getCenterOffset: function (screenSize, itemSize) {
        return {
            x: (screenSize.width - itemSize.width) * 0.5,
            y: (screenSize.height - itemSize.height) * 0.5,
        }
    }
};

function calcZoomRate() {
    var pressButtonOffset = pressButtonInfo.getOffset(screenSize);
    {
        var offsetY = pressButtonOffset.y
        pressButtonInfo['zoomRate'] = (screenSize.width - offsetY * 2) / pressButtonInfo.width;
    }
}
calcZoomRate();

// window.addEventListener('resize', () => {
//     calcZoomRate();
//     game.scale.refresh();
// });

function preload() {
    {
        var info = pressButtonInfo;
        var size = info.getZoomSize();
        this.load.svg(info.key, info.url, {
            width: size.width,
            height: size.height
        });
    }
}

var flag = false

function create() {
    var pressButton;
    {
        var info = pressButtonInfo;
        var center = info.getCenter();
        var offset = info.getOffset(screenSize);
        var itemSize = info.getZoomSize();
        var centerOffset = info.getCenterOffset(screenSize, itemSize);
        pressButton = this.add.image(
            center.x + offset.x,
            center.y + centerOffset.y,
            info.key).setInteractive();
        //pressButton.setScale(0.5);
    }

    this.input.on('gameobjectdown', (pointer, gameobject) => {
        if (gameobject === pressButton) {
            console.log('d')
        }
    });

    this.input.on('gameobjectup', (pointer, gameobject) => {
        if (gameobject === pressButton) {
            var scale = !flag ? 0.75 : 1
            flag = !flag
            pressButton.setScale(scale);
            console.log('u')
        }
    });
}

function update() {
    //console.log('up')
}
