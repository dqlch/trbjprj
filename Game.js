class Game {
  constructor() {}

  start(){
    form = new Form();
    form.display();
    car1 = createSprite(width/2 -50, height -100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width/2 +100, height -100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    player = new Player();
    playerCount = player.getCount();
  }
  
  getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data){
      gameState = data.val();
    })
  }
  update(state){
    database.ref("/").update({
      gameState: state
    })
  }

  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play(){
    this.handleElements();
    Player.getPlayersInfo();
    if(allPlayers !== undefined){
      image(track, 0, -height*5, width, height*6);
      //indece de la matriz
      var index = 0;
      for(var plr in allPlayers){
        //agrega 1 al indice para cada bucle
        index = index + 1 ;
        //utilizar datos de la base de datos para mostrar los autos en las direcciones x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if(index === player.index) {
          cars[index -1].position.x - x;
          cars[index -1].posiition.y - y;
          stroke(10);
          fill("red");
          ellipse(x, y, 60,60)
          camara.position.x = cars[index - 1].position.x;
          camara.position.y = cars[index - 1].position.y;
        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls(){
    //manejar eventos del teclado
    if(keyIsDown(UP_ARROW)){
      player.positionY = player.positionY + 10;
      player.update();
    }
  }

}
