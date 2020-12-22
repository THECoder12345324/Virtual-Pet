class Food {
    constructor () {
        this.foodStock = foodStock;
        this.lastFed;
        this.image = loadImage("Milk.png");
    }
    getFoodStock() {
        database = firebase.database();
        this.foodStock = database.ref('Food');
        this.foodStock.on('value', function(data) {
            foodS = data.val();
        });
    }
    updateFoodStock(x) {
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
    deductFood() {
        foodS -= 1;
        this.updateFoodStock(foodS);
    }
    display() {
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if (this.FoodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i%10===0) {
                    x = 80;
                    y += 50;
                }
                image(this.image, x, y, 50, 50)
                x += 30;
            }
        }
    }
}