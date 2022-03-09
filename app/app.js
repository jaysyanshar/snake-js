const direction = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
}

class Snake {
    constructor(xPos, yPos, length) {
        this.xPos = xPos
        this.yPos = yPos
        this.trail = []
        this.length = length
    }
}

class Food {
    constructor(xPos, yPos) {
        this.xPos = xPos
        this.yPos = yPos
    }
}

function init() {
    //Cari elemen dengan nama ID yang telah di tentukan
    canv = document.getElementById("game-canvas")
    
    //Konteks Kanvas / Halaman Permainan
    ctx = canv.getContext("2d")
    
    //Pastikan bahwa program / web menerima input keyboard
    document.addEventListener("keydown", keyPush)
    
    //Atur jeda / interval pada permainan
    setInterval(game, 1000 / 15)
}

//Atur Konstanta / Ketetapan Awal Pada Permainan
let snake = new Snake(10, 10, 5) 
let food = new Food(15, 15)
gs = tc = 20
xInc = yInc = 0

function game() {
    //Atur Batasan (Boundary) Pada Halaman Permainan
    snake.xPos += xInc
    snake.yPos += yInc
    if (snake.xPos < 0) {
        snake.xPos = tc - 1
    }
    if (snake.xPos > tc - 1) {
        snake.xPos = 0
    }
    if (snake.yPos < 0) {
        snake.yPos = tc - 1
    }
    if (snake.yPos > tc - 1) {
        snake.yPos = 0
    }
    
    //Atur Warna Pada Halaman Permainan
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canv.width, canv.height)

    //Atur Warna Pada Snake
    ctx.fillStyle = "red"
    for (var i = 0; i < snake.trail.length; i++) {
        ctx.fillRect(snake.trail[i].x * gs, snake.trail[i].y * gs, gs - 2, gs - 2)
        // Jika Head Menabrak Tail
        if (snake.trail[i].x == snake.xPos && snake.trail[i].y == snake.yPos) {
            snake.length = 5
        }
    }
    
    //Atur Panjang Pada Ekor Snake-nya
    snake.trail.push({x : snake.xPos, y : snake.yPos})
    while (snake.trail.length > snake.length) {
        snake.trail.shift()
    }

    //Jika Snake Memakan Food-nya, Acak Lokasi Food-nya
    if (food.xPos == snake.xPos && food.yPos == snake.yPos) {
        snake.length++
        food.xPos = Math.floor(Math.random() * tc)
        food.yPos = Math.floor(Math.random() * tc)
    }
    
    //Atur Warna Pada Food-nya
    ctx.fillStyle = "purple"
    ctx.fillRect(food.xPos * gs, food.yPos * gs, gs - 2, gs - 2)
}

//Atur Mekanisme Inputan-nya berdasarkan keyCode-nya
function keyPush(evt) {
    switch (evt.keyCode) {
        //Input Panah Kiri
        case direction.left:
            xInc = -1
            yInc = 0
            break
        //Input Panah Atas
        case direction.up:
            xInc = 0
            yInc = -1
            break
        //Input Panah Kanan
        case direction.right:
            xInc = 1
            yInc = 0
            break
        //Input Panah Bawah
        case direction.down:
            xInc = 0
            yInc = 1
            break
    }
}