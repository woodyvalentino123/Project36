class Food {
    constructor(){
        
        this.body = createSprite(720,220,70,70)
        this.image = loadImage("images/milk.png");
       
        this.foodStock = 0;
        this.lastFed ;
        
    }
   
       
    getFedTime(lastFed){
      this.lastFed=lastFed;   
       }
    
    updateFoodStock(foodS){
        
    this.foodStock = foodS;
    
  }
   
    
    deductFoodStock(){
        if(this.foodStock>0){
        this.foodStock = this.foodStock-1;
          }
        }
          
        getFoodStock(){
            return this.foodStock;
        }
    bedroom(){
        background(bedroom1,550,500);
    }
    garden(){
        background(garden1,550,500);
    }
    washroom(){
        background(washroom1,550,500);
    }
     
    display(){
        
        var x =50,y=100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        
        if(this.foodStock!==0){
            for(var i =0;i<this.foodStock;i++){
                if(i%10===0){
                    x = 50;
                    y = y+50;
                }
                image(this.image,x,y,50,40);
                
                x=x+30;
            }
        }
    }
}