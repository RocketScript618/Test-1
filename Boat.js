class Boat{
    constructor(x,y,width,height,boatPos,boatanimation){

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.boatPosition = boatPos;
        this.animation = boatanimation;

        this.image = loadImage("barc.png");


        var options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0
        }

        this.body = Bodies.rectangle(x,y,width,height,options);

        World.add(world,this.body);
    }

    animate(){
        this.speed += 0.05%1.1;

    }

    display(){

        var pos = this.body.positon;

        var index = floor(this.speed % this.animation.length);

        push();

        translate(this.x,this.y);

        imageMode(CENTER);
        image(this.animation[index],0,this.boatPosition,this.width,this.height);

        pop();
    }
}