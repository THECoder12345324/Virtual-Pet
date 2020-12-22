//Create variables here
var dog, img2, database, foodS, foodStock;
var timer = 0;
function preload()
{
  img1 = loadImage("dogImg.png")
  img2 = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(1200, 700);
  
  foodObj = new Food();

  dog = createSprite(width / 2, height / 2, 50, 50);
  dog.addImage(img1);
  dog.scale = 0.5;

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  

  timer -= 1;
  if (timer <= 0) {
    timer = 0;
  }

  background(46, 139, 87);

  if (timer <= 0) {
    dog.addImage(img1);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  text("Food Left: " + foodS, width / 2 - 80, 30)

  text("Use the up arrow key to feed your dog!", width / 2 - 150, 100)

  foodObj.display();
}

//Function to read the data


//Function to update the data


function feedDog() {
  dog.addImage(img2);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food:foodObj.getFoodStock()
  })
}

function addFoods() {
  foodS++;

  database.ref('/').update({
    Food: foodS
  })
}