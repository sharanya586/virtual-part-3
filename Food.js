class Food{
    constructor(){

    }

    display(){
        var y=150;
        var x = 20;
        for(var i=0;i<foods;i++){
            x=x+20;
            if(i%10==0){
                y=y+50;
                x=20;
            }
            image(milkbottle,x,y,40,50);
        }
    }

    bedroom(){
        background(bedroomImage)
    }

    washroom(){
        background(washroomImage)
    }
    garden(){
        background(gardenImage)
    }
}