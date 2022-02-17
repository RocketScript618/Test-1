class CBall {
    constructor(x,y,radius){
        this.x = x;
        this.y = y;

        this.radius = radius;

        var options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,
            isStatic: true
        }

        this.body = Bodies.circle(x,y,this.radius,options);

        this.image = loadImage("cannonball.png");

        this.img = loadImage("gray.jpg");
        
        this.trajectory = []
        World.add(world,this.body);
    }

    shoot(){
        var velocity = p5.Vector.fromAngle(cannon.angle);

        velocity.mult(20);

        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{x: velocity.x, y: velocity.y})
    }

    display(){
        var pos = this.body.position;

        //console.log(pos);

        var angle = this.body.angle;

        push();

        translate(pos.x,pos.y);
        rotate(angle);

        imageMode(CENTER);
        image(this.image,0,0,this.radius,this.radius);

        pop();

        if(this.body.velocity.x>0 && this.body.position.x>250){
            var location = [this.body.position.x,this.body.position.y];
            this.trajectory.push(location);
        }
        
        for(var i = 0; i<this.trajectory.length; i++){
            image(this.image,this.trajectory[i][0], this.trajectory[i][1],5,5);
        }
    }
}