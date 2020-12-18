//Create variables here
var dog, img2, database, foodS, foodStock;
var timer = 0;
function preload()
{
  img1 = loadImage("dogImg.png")
  img2 = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  
  dog = createSprite(width / 2, height / 2, 50, 50);
  dog.addImage(img1);
  dog.scale = 0.5;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
}


function draw() {  

  timer -= 1;
  if (timer <= 0) {
    timer = 0;
  }

  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(img2);
    timer = 40;
  }
  if (timer <= 0) {
    dog.addImage(img1);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  text("Food Left: " + foodS, width / 2 - 80, 30)

  text("Use the up arrow key to feed your dog!", width / 2 - 150, 100)
}

//Function to read the data
function readStock(data) {
  foodS = data.val();
}

//Function to update the data
function writeStock(x) {
  
  if (x <= 0) {
    x = 0
  }
  if (x > 0) {
    x -= 1
  }


  database.ref('/').update({
    Food: x
  })
}