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
var gamestate = 'hungry';

var bedroomImg, gardenImg, washroomImg;
function preload()
{
  img1 = loadImage("img/dogImg.png")
  img2 = loadImage("img/dogImg1.png")
  bedroomImg = loadImage("img/Bed Room.png")
  gardenImg = loadImage("img/Garden.png")
  washroomImg = loadImage("img/Wash Room.png");
}

function setup() {
	createCanvas(1200, 700);
  
  foodObj = new Food();

  foodObj.getFoodStock();

  //Initializes the dog
  dog = createSprite(width / 2 + width / 4, height / 2, 50, 50);
  dog.addImage(img1);
  dog.scale = 0.3;

  //Button responsible for feeding the dog
  feed = createButton("Feed the Dog");
  feed.position(1100, 15);
  feed.mousePressed(feedDog);

  //Button responsible for adding food
  addFood = createButton("Add Food");
  addFood.position(1300, 15);
  addFood.mousePressed(addFoods);

  //Used to change dog's name
  input = createInput("Name The Dog");
  input.position(1200, 50);

  //Used to update dog's name
  updatename = createButton("Update Name");
  updatename.position(1200, 90);
  updatename.mousePressed(updatethename);
}


function draw() {
  //Reads the gamestate
  readstate = database.ref('gameState');
  readstate.on('value', function(data) {
    gamestate = data.val();
  })

  if (gamestate != "hungry") {
    addFood.hide();
    feed.hide();
    dog.remove();
    input.hide();
    updatename.hide();
  }
  else{
    addFood.show();
    feed.show();
    dog.addImage(img1);
    input.show();
    updatename.show();


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

    foodObj.display();
  }

  currentTime = hour();
  if (currentTime == (lastFed + 1)) {
    update("playing");
    foodObj.garden();
  }
  else if (currentTime == (lastFed + 2)) {
    update("sleeping");
    foodObj.bedroom();
  }
  else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("bathing");
    foodObj.washroom();
  }
  else {
    update("hungry");
    foodObj.display();
  }
}

function feedDog() {
  if (timer == 0) {
    if (foodS > 0) {
      timer = 40;
      milkpos = 200;
      foodS -= 1;
      imageCount += 1;
      database.ref('/').update({
        Food:foodS,
        FeedTime: hour()
      })
    }
  }
}

function addFoods() {
  if (foodS < 60) {
    foodS++;

    database.ref('/').update({
      Food: foodS
    })
  }
}

function updatethename() {
  database.ref('/').update({
    name: input.value()
  })
}

function update(state) {
  database.ref('/').update({
    gameState: state
  })
}