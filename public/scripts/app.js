// Funciones de JS para el totito
// Empieza por default el turno en dos. Con el primer evento cambia a uno.
var turno=2;
var matrix;
var state=0;
var viewport= document.getElementById("viewport");
// matriz para almacenar valores de cruz y circulo marcados
function createMatrix(){
  matrix = new Array(3);
  for (var i = 0; i <= 2; i++) {
    matrix[i] = [0,0,0];
  }
}
createMatrix();

// Modelo del juego
//ESTADO:
// A. Numero de boton en tablero;
// B. Turno actual  

function State(turn, numBoton){
  this.turn = turn;
  this.numBoton = numBoton;
}

function render(state){

  var numBoton= state.numBoton;
  var turn = state.turn;
  var html="";
  // HTML PARA cargar los botones del tablero
  html+='<div>';
  html+='<button id="button1" class="square square1"></button>';
  html+='<button id="button2" class="square square2"></button>';
  html+='<button id="button3" class="square square3"></button>';
  html+='<button id="button4" class="square square4"></button>';
  html+='<button id="button5" class="square square5"></button>';
  html+='<button id="button6" class="square square6"></button>';
  html+='<button id="button7" class="square square7"></button>';
  html+='<button id="button8" class="square square8"></button>';
  html+='<button id="button9" class="square square9"></button>';
  html+='</div>';

  if(turno==2){ 
     document.getElementById("turn").innerHTML="Player1";
  }
  else{ 
     document.getElementById("turn").innerHTML="Player2";
  }

  var val= numBoton+1;

  if(turn==1){
    // se crea una imagen X
    document.getElementById('button'+val).innerHTML="X";
    turno=2;
  }
  else if(turn==2){
    // se crea una imagen O
    document.getElementById('button'+val).innerHTML="O";
    turno=1;
  }

  if (isFull()) {
    alert("Fin del Juego: EMPATE");
  }

  return html;
}

viewport.innerHTML = render(state);

// revisa si se termino juego en empate
function isFull(){
  for (var i = 0; i <= 2; i++) {
    for (var j = 0; j<=2; j++) {
       if(matrix[i][j]==0){
        return false;
       }
    } 
  }
  return true;
}

function isAvailable(i,j) {  
  if(matrix[i][j]==0){     
    return true;   
  }
  else{
    return false;
  } 
}
// param es el turno, num es el numero de boton apachado.
function createImage(param,num){ 
  // Cambiar el turno al crear un simbolo cruz o circulo.
  var state= new State(param,num); 
  // RENDER con el nuevo estado despues de un click
  render(state);
  revWinner();
}

function boxSelection() {
  var botonApachado =this.id;

  switch(botonApachado){
      case 'button1':
        if(isAvailable(0,0)){
         matrix[0][0]=turno;   
         createImage(turno,0);
        }
        break;
      case 'button2':
        if(isAvailable(0,1)){
         matrix[0][1]=turno;   
         createImage(turno,1);
        }
        break;
      case 'button3':
        if(isAvailable(0,2)){
         matrix[0][2]=turno;   
         createImage(turno,2);
        }
        break;
      case 'button4':
        if(isAvailable(1,0)){
         matrix[1][0]=turno;   
         createImage(turno,3);
        }
        break;
      case 'button5':
        if(isAvailable(1,1)){
         matrix[1][1]=turno;   
         createImage(turno,4);
        }
        break;
      case 'button6':
        if(isAvailable(1,2)){
         matrix[1][2]=turno;   
         createImage(turno,5);
        }
        break;
      case 'button7':
        if(isAvailable(2,0)){
         matrix[2][0]=turno;   
         createImage(turno,6);
        }
        break;
      case 'button8':
        if(isAvailable(2,1)){
         matrix[2][1]=turno;   
         createImage(turno,7);
        }
        break;
      case 'button9':
        if(isAvailable(2,2)){
         matrix[2][2]=turno;   
         createImage(turno,8);
        }
        break;
      case 'button10':
        for (var i=1; i < 10; i++) {
          document.getElementById('button'+i).innerHTML="";
        }
        createMatrix();    
        break;
  }
}

// CICLO PARA GENERAR LOS EVENTOS DE TODOS LOS BOTONES
for (var i = 1; i <= 10; i++) {
  var button = document.getElementById('button'+i);
  button.onclick = boxSelection;
}

function revWinner(){
  for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++){
      if(matrix[i][j]!=0){
        var circleOrCross=matrix[i][j];
        if(revFila(i,j)){
            alert("WINNER");
        }
        if(revColumna(i,j)){
          alert("WINNER!");
        }
      }
    }
     if(revDiagonal()){  
          alert("WINNER!");
        }
  }
}

function revFila(x,y){
   var lista= new Array(2);
  
   for(var i = 0; i < 3; i++){
      var value= matrix[x][y+i];
      lista[i]=value;  
   }
   if(lista[0]===lista[1]){
    if(lista[1]===lista[2]){
      return true;
    }     
   }
   else{
      return false;
   }
}

function revColumna(x,y){
   var lista= new Array(2);
  
   for(var i = 0; i < 3; i++){
      var value= matrix[x+i][y];
      lista[i]=value;  
   }
   if(lista[0]===lista[1]){
    if(lista[1]===lista[2]){
      return true;
    }     
   }
   else{
      return false;
   }
}

function revDiagonal(){
  var lista= new Array(2);

  lista[0]=matrix[0][0];
  lista[1]=matrix[1][1];
  lista[2]=matrix[2][2];

   if(lista[0]===lista[1]){
    if(lista[1]===lista[2]){
       if(lista[0]!=0 || lista[1]!=0||lista[2]){
          return true;  
      }
    }     
   }   
  lista[0]=matrix[0][2];
  lista[1]=matrix[1][1];
  lista[2]=matrix[2][0];

  if(lista[0]===lista[1]){
    if(lista[1]===lista[2]){
      if(lista[0]!=0 || lista[1]!=0||lista[2]){
        return true;
      }
    }     
  }
  return false;  
}
