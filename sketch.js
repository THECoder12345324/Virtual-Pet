//Create variables here
var dog, img2, database, foodS, foodStock;
var timer = 0;
var milkpos = 0;
var offset = 0;
var offset1 = 0;
var imageCount = 0;
var feed;
var lastFed = 0;
var dogname = "Kutta Kar";
var input;
var updatename;
function preload()
{
  img1 = loadImage("dogImg.png")
  img2 = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(1200, 700);
  
  foodObj = new Food();

  foodObj.getFoodStock();

  dog = createSprite(width / 2 + width / 4, height / 2, 50, 50);
  dog.addImage(img1);
  dog.scale = 0.3;

  feed = createButton("Feed the Dog");
  feed.position(1100, 15);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(1300, 15);
  addFood.mousePressed(addFoods);

  input = createInput("Name The Dog");
  input.position(1200, 50);

  updatename = createButton("Update Name");
  updatename.position(1200, 90);
  updatename.mousePressed(updatethename);
}


function draw() { 
  background(46, 139, 87);
  offset = imageCount * 30
  timer -= 1;
  milkpos -= 1;
  fedTime = database.ref('FeedTime');
  fedTime.on('value', function(data) {
    lastFed = data.val();
  })
  fill(255, 255, 255);
  textSize(20);
  if (lastFed >= 12) {
    console.log("EXECUTING NOW");
    text("Last Fed: " + str(lastFed % 12) + " PM", 100, 30)
  }
  else if (lastFed == 0) {
    text("Last Fed: " + "12 AM", 100, 30)
  }
  else {
    text("Last Fed: " + str(lastFed) + " AM", 100, 30);
  }


  nameofdog = database.ref("name");
  nameofdog.on('value', function(data) {
    dogname = data.val()
  })
  text("Name of Dog: " + dogname, 100, 80);



  if (timer <= 0) {
    timer = 0;
    imageCount = 0;
  }

  if (milkpos <= 0) {
    milkpos = 0;
  }

  if (foodS > 0) {
    feed.show();
  }
  else if (foodS <= 0) {
    feed.hide();
  }
  if (timer <= 0) {
    dog.addImage(img1);
  }
  else {
    image(foodObj.image, dog.x - milkpos - offset1, dog.y, 50, 50);
    if (milkpos === 200) {
      imageCount += 1;
      offset1 = offset
    }
    dog.addImage(img2);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  text("Food Left: " + foodS, width / 2 - 80, 30)

  //text("Use the up arrow key to feed your dog!", width / 2 - 150, 100)

  foodObj.display();
}

//Function to read the data


//Function to update the data


function feedDog() {
  if (timer == 0) {
    if (foodS > 0) {
      timer = 40;
      milkpos = 200;
      foodS -= 1;
      imageCount += 1;
      //foodObj.deductFood();
      //foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
      database.ref('/').update({
        Food:foodS,
        FeedTime: hour()
      })
    }
  }
}

function addFoods() {
  foodS++;

  database.ref('/').update({
    Food: foodS
  })
}

function updatethename() {
  database.ref('/').update({
    name: input.value()
  })
}