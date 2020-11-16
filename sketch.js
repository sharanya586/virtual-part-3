//Create variables here
var database;
var foods;
var lastFed;
var dogImage;
var happyDog;
var milkbottle;
var foodObject;
var currentTime;
var gameState;

function preload()
{
  //load images here
  dogImage = loadImage("images/Dog.png");
  happyDog = loadImage("images/happy dog.png");
  milkbottle = loadImage("images/milk.png");

  bedroomImage = loadImage("images/Bed Room.png");
  washroomImage = loadImage("images/Wash Room.png");
  gardenImage = loadImage("images/Garden.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();

  dog = createSprite(600,250,20,20);
  dog.addImage(dogImage);
  dog.scale=0.2;

  database.ref('Food').on("value",readFood);

  addFood = createButton('Add Food');
  addFood.position(500,200);
  addFood.mousePressed(AddFood);

  feedDog = createButton('Feed Food');
  feedDog.position(600,200);
  feedDog.mousePressed(FeedDog);

  database.ref('lastFed').on("value",function(data){
    lastFed = data.val();
    console.log(lastFed);
  })

  foodObject = new Food();

  database.ref('gameState').on("value",function(data){
    gameState=data.val();
  })
}


function draw() {  

  background(46, 139, 87);
  drawSprites();

  fill(255);
  text("Food Remaining :"+ foods,300,50);
  
  /*
  if(keyWentDown(UP_ARROW)){
    foods--;
    database.ref('/').update({
      Food:foods
    })
  }
  */
  //add styles here

  if(lastFed<12){
    text("last Fed :"+lastFed+ "AM",300,100);
  }
  else if(lastFed==12){
    text("last Fed :"+lastFed + "PM",300,100);
  }
  else if(lastFed>12){
    text("last Fed :"+lastFed%12 + "PM",300,100);
  }

  foodObject.display();

  currentTime = hour();

  if(currentTime==lastFed+1){
    update("playing");
    foodObject.garden();
  }
  else  if(currentTime==lastFed+2){
    update("sleeping");
    foodObject.bedroom();
  }
  else  if(currentTime>lastFed+2&& currentTime<=lastFed+4){
    update("bathing");
    foodObject.washroom();
  }
  else{
    update("hungry");
    foodObject.display();
  }

  if(gameState!=="hungry"){
    addFood.hide();
    feedDog.hide();
  }
  else {
    addFood.show();
    feedDog.show();
  }
  

}

function readFood(data){
  foods = data.val();
}

function AddFood(){
foods++;
database.ref('/').update({
  Food:foods
})
}

function FeedDog(){
  if(foods>0)
  foods--;
  else
foods=foods
  dog.addImage(happyDog)
database.ref('/').update({
  Food:foods,
  lastFed: hour(),
})
}

function update(x){
  database.ref('/').update({
    gameState:x
  })
}

