const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "24px Arial";

const f0 = new Image()
// const f1 = new Image()
// const f2 = new Image()
// const f3 = new Image()
// const f4 = new Image()
// const f5 = new Image()
// const f6 = new Image()
// const f7 = new Image()
// const f8 = new Image()
// const f9 = new Image()
f0.src="./img/0 (1).gif"
// f1.src="../img/WnES-2 (dragged).tiff"
// f2.src="../img/WnES-3 (dragged).tiff"
// f3.src="../img/WnES-4 (dragged).tiff"
// f4.src="../img/WnES-5 (dragged).tiff"
// f5.src="../img/WnES-6 (dragged).tiff"
// f6.src="../img/WnES-7 (dragged).tiff"
// f7.src="../img/WnES-8 (dragged).tiff"
// f8.src="../img/WnES-9 (dragged).tiff"
// f9.src="../img/WnES-10 (dragged).tiff"

const e0 = new Image()
e0.src = "./img/0magykarp.gif"
//Medidas canvas 1000 x 600

const p0 = new Image()
p0.stc = "./img/pika.jpeg"

let enemigos = []
let municiones = []
//Definicion personaje
class Character{
    constructor(ctx, posicionX, posicionY, imagen){
        this.name = 'bulbasor';
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.life = 3;
        this.ctx = ctx;
        this.imagen = imagen;
        this.score = 0;
    }
    adelante(){
        if(this.posicionX + 200< 1000){
            this.posicionX = this.posicionX + 20;
        }
    }
    atras() {
        if (this.posicionX > 0) {
          this.posicionX = this.posicionX - 20;
        }
    }
    
    subir() {
        if (this.posicionY > 0) {
          this.posicionY = this.posicionY - 20;
        }
    }
    
    bajar() {
        if (this.posicionY + 200 < 600) {
          this.posicionY = this.posicionY + 20;
        }
    }

    draw(){
    this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY , 150 , 150);
    
    this.ctx.fillText(`Life: ${this.life}`, 40, 40);

    this.ctx.fillText(`Score: ${this.score}`, 400, 40);
    }
    perderVida() {
        this.life = this.life - 1;
      }
    
    disparar() {
    console.log("disparar");
    if (municiones.length < 10) {
        const misil = new municion(
        ctx,
        personaje.posicionX + 180,
        personaje.posicionY + 65,
        e0
        );
          //Agregamos al arreglo
        municiones.push(misil);
    }
    }
}
const personaje = new Character(ctx, 40, 300 , f0)
class Enemy {
   
     constructor(ctx, posicionX, posicionY, imagen){
            
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.ctx = ctx;
        this.imagen = imagen;
    }
    atras() {
       
        this.posicionX = this.posicionX - 5;
        
    }
    draw(){
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY , 100 , 100);
    
        }
}



class municion{
    constructor(ctx, posicionX, posicionY, imagen){
            
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.ctx = ctx;
        this.imagen = imagen;
    }
    draw(){
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY , 50 , 50);
    
    }
    adelante(){
         
        this.posicionX = this.posicionX + 10;
        
    }
}
class boss {
    constructor(ctx, posicionX, posicionY, imagen){
            
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.ctx = ctx;
        this.imagen = imagen;
        this.life = 3;
    }
    atras() {
       
        this.posicionX = this.posicionX - 5;
        
    }
    draw(){
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY, 100 , 100 );
        this.ctx.fillRect(this.posicionX ,this.posicionY, 10, 10)
    }
    perderVida() {
        this.life = this.life - 1;
    }
}
const jefe = new boss(ctx, 1000, 300 , e0)

let timer = 0;
let intervalId;
let intervalIdEnemigos;

function comenzar(){
    personaje.vidas = 3;
    enemigos = [];
    municiones = [];
    personaje.posicionX = 40;
    personaje.posicionY = 200;
  
    intervalId = setInterval(() => {
      ctx.clearRect(0, 0, 1000, 600);
      personaje.draw();
  
      enemigos.forEach((enemigo, posicionEnemigo) => {
        enemigo.atras();
        enemigo.draw();
        if (
          enemigo.posicionX <= personaje.posicionX + 100 &&
         
          personaje.posicionY <= enemigo.posicionY + 100 &&
        
          personaje.posicionY + 100 >= enemigo.posicionY
        ) {
          personaje.perderVida();
 
          enemigos.splice(posicionEnemigo, 1);
  
     
          if (personaje.life == 0) {
            clearInterval(intervalId);
            clearInterval(intervalIdEnemigos);
            alert("perdio")
           
          }
        }
  
        if (enemigo.posicionX < 0) {

          enemigos.splice(posicionEnemigo, 1);
        }
      });
  

      municiones.forEach((misil, indexMisil) => {
        misil.draw();
        misil.adelante();
  
  
        if (misil.posicionX + 50 > 1000) {
          municiones.splice(indexMisil, 1);
        }
 
        enemigos.forEach((enemigo, indexEnemigo) => {
  
          if (
            misil.posicionX + 20 >= enemigo.posicionX &&
            misil.posicionY <= enemigo.posicionY + 200 &&
            misil.posicionY + 40 >= enemigo.posicionY
          ) {

            municiones.splice(indexMisil, 1);
  
            enemigos.splice(indexEnemigo, 1);
            personaje.score = personaje.score + 1;
            
          }
        });
      });
  

      ctx.fillText(`Misiles: ${municiones.length}`, 600, 40);
  
   
      ctx.fillText(`${timer} seg`, 800, 40);

  
      if (personaje.score >= 1) {
        jefe.draw()
        jefe.atras()
        console.log(jefe)
      }
    }, 1000 / 60);
  
    intervalIdEnemigos = setInterval(() => {
      
      timer++;
  
    
      if (Math.floor(Math.random() * 2) == 1) {
      
        const altura = Math.floor(Math.random() * 360);
  
        const Enemigo = new Enemy(ctx, 1000, altura, e0);
        enemigos.push(Enemigo);
      }
    }, 1000);
        
    
}
comenzar()
window.addEventListener("keyup", (evento) => {
    
    switch (evento.code) {
      case "ArrowRight":
        personaje.adelante();
        break;
      case "ArrowLeft":
        personaje.atras();
        break;
      case "ArrowUp":
        personaje.subir();
        break;
      case "ArrowDown":
        personaje.bajar();
        break;
      case "KeyD":
        personaje.disparar();
        break;
      
    }
  });