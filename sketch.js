//Create variables here
var doghungry, happyDog,database,foods,foodStock;
var img1,img2;
var lastFed,milk;
var time,gameState;
var button1,button2;
var happyD,hungryD;
var getFoodStock;
var bedroom, bedroom1, garden, garden1, washroom, washroom1;
function preload()
{
 
  //load images here
  happyD = loadImage("images/dogImg.png");
  hungryD = loadImage("images/dogImg1.png");
  bedroom1 = loadImage("images/Bed Room.png");
  garden1 = loadImage("images/Garden.png");
  washroom1 = loadImage("images/Wash Room.png");
  
}

function setup() {
  createCanvas(500, 500);
  
  doghungry = createSprite(400,200,20,20);
  doghungry.addImage(hungryD);
  doghungry.scale=0.2;


  database = firebase.database();
  getFoodStock = database.ref('Food');
  getFoodStock.on("value",readStock,showerror);
  getGameState = database.ref('gameState');
  getGameState.on("value",function(data){
    gameState = data.val();
  })

  foodobj = new Food();

  button1 = createButton('Feed the Dog');
  button2 = createButton('Add the Food');

  button1.position(700,95);
  button2.position(800,95);

  button1.mousePressed(feedDog);
  button2.mousePressed(addFoods)
  
  }


function draw() {  
  background(46,139,87);
  foodobj.display();
  var feedTime = database.ref('FeedTime');
  feedTime.on("value",function (data){
   lastFed = data.val();
   
  })
  
 fill(225);
 textSize(15);
if(lastFed>=12) {
  text("Last Fed :" + lastFed%12 + "PM",350,30)
} 
else if (lastFed === 0){
  text("Last Fed : 12  AM",350,30);
}else {
  text("Last Fed : "+ lastFed + "AM",350,30);
}
currentTime = hour();
if(currentTime===(lastFed+1)){
  update("playing");
  foodObj.garden();

}else if(currentTime ===(lastFed+2)){
  update("sleeping");
  foodobj.bedroom();
}else if (currentTime>(lastFed+2)&& currenTime<=(lastFed+4)){
  foodobj.washroom();
}else{
  update("Hungry")
  foodobj.display();
}

if (gameState!=="Hungry"){
  button1.hide();
  button2.hide();
  doghungry.remove();
}else{
  button1.show();
  button2.show();
  doghungry.addImage(hungryD);
}
   
  drawSprites();
   

}



function showerror(){
  console.log("error");

}

  

function readStock(data){
  foodS= data.val();
  foodobj.updateFoodStock(foodS)
  
}
function feedDog(){
 
  doghungry.addImage(happyD);
  doghungry.scale = 0.2;
  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
  Food: foodobj.getFoodStock(),
  FeedTime: hour()
  
 
  
})
}

function addFoods(){
  doghungry.addImage(hungryD)
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
function udate(state){
  database.ref('/').update({
    gameState:state
  });
}
 