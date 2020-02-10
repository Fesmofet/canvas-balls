
function View(){
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.pi = Math.PI;
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.timer = null;
}

function Ball(x, y, color, size, signX, signY, speed){
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.signX = signX;
    this.signY = signY;
    this.speed = speed;
}

function CollectionBalls(){
    this.collection = [];
}

CollectionBalls.prototype.setBall = function(ball){
    this.collection.push(ball);
};

View.prototype.onClick = function(e){
    this.makeBall.bind(this, e)();
};

let collection = new CollectionBalls();

View.prototype.makeBall = function(e){
    let x = e.offsetX;
    let y = e.offsetY;
    let size = Math.round(10 - 0.5 + Math.random() * (50 - 10 + 1));
    let color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

    let firstSign = Math.floor(Math.random() * 2);
    let secondSign = Math.floor(Math.random() * (2));
    let signX = firstSign === 1 ? '+' : '-';
    let signY = secondSign === 1 ? '+' : '-';
    let speed = Math.floor(Math.random() * (4 - 1)) + 1;

    let ball = new Ball(x, y, color, size, signX, signY, speed);
    collection.setBall(ball);
    this.drawBall(collection);
};

View.prototype.drawBall = function(balls){
    clearTimeout(this.timer);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 800, 600);

    balls.collection.forEach((item) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = item.color;

        if(item.x + item.size >= 800){
            item.signX = '-';
        }if(item.y + item.size >= 600){
            item.signY = '-';
        }if(item.y - item.size <= 0){
            item.signY = '+';
        }if(item.x - item.size <= 0){
            item.signX = '+';
        }

        if(item.signX === '+'){
            item.x = item.x + item.speed;
        }if(item.signX === '-'){
            item.x = item.x - item.speed;
        }if(item.signY === '+'){
            item.y = item.y + item.speed;
        }if(item.signY === '-'){
            item.y = item.y - item.speed;
        }

        this.ctx.arc(item.x, item.y, item.size, 0, this.pi * 2);
        this.ctx.fill();
    });
    this.timer = setTimeout(() => {
        this.drawBall(balls)
    }, 1);
};
let view = new View();
view.onClick();


