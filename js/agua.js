const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "24px Arial";

const f0 = new Image()
const f1 = new Image()
const f2 = new Image()
const f3 = new Image()
const f4 = new Image()
const f5 = new Image()

f0.src="./../img/frames/0.gif"
f1.src="./../img/frames/3.gif"
f2.src="./../img/frames/5.gif"
f3.src="./../img/frames/7.gif"
f4.src="./../img/frames/8.gif"
f5.src="./../img/frames/9.gif"


const e0 = new Image()
const e1 = new Image()
const e2 = new Image()
const e3 = new Image()
const e4 = new Image()
const e5 = new Image()
e0.src = "./../img/0magykarp.gif"
e1.src = "./../img/1 (1).gif"
e2.src = "./../img/2.gif"
e3.src = "./../img/2.gif"
e4.src = "./../img/3.gif"
e4.src = "./../img/4.gif"

const p0 = new Image()
const p1 = new Image()
const p2 = new Image()
const p3 = new Image()
const p4 = new Image()
p0.stc = "./../img/0.gif"
p1.stc = "./../img/01.gif"
p2.stc = "./../img/02.gif"
p3.stc = "./../img/03.gif"
p4.stc = "./../img/04.gif"
//Medidas canvas 1000 x 600
const eSprites = [e0,e1,e2,e3,e4,e5]
const tankSprites = [f0,f1,f2,f3,f4,f5]
const bosssprites = [p0,p1,p2,p3,p4]



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
            this.posicionX = this.posicionX + 30;
        }
    }
    atras() {
        if (this.posicionX > 0) {
          this.posicionX = this.posicionX - 30;
        }
    }
    
    subir() {
        if (this.posicionY > 0) {
          this.posicionY = this.posicionY - 30;
        }
    }
    
    bajar() {
        if (this.posicionY + 200 < 600) {
          this.posicionY = this.posicionY + 30;
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
       
        this.posicionX = this.posicionX - 1;
        
    }
    draw(){
        this.ctx.drawImage(this.imagen, this.posicionX, this.posicionY, 100 , 100 );
        
    }
    perderVida() {
        this.life = this.life - 1;
    }
}
const jefe = new boss(ctx, 1000, 300 , p0)

let contadorTankSprite = 0;
let timer = 0;
let intervalId;
let intervalIdEnemigos;

function comenzar(){
    personaje.vidas = 3;
    enemigos = [];
    municiones = [];
    personaje.posicionX = 40;
    personaje.posicionY = 200;
    personaje.imagen = tankSprites[contadorTankSprite]
    intervalId = setInterval(() => {
      ctx.clearRect(0, 0, 1000, 600);
      personaje.draw();
        
      enemigos.forEach((enemigo, posicionEnemigo) => {
        enemigo.atras();
        enemigo.draw();
        enemigo.imagen = eSprites[contadorTankSprite];
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
            personaje.score = personaje.score + 10;
            
          }
        });
      });
  

      ctx.fillText(`Pokemones: ${municiones.length}`, 600, 40);
  
   
      ctx.fillText(`${timer} seg`, 800, 40);
      if (personaje.score == 150){
        clearInterval(intervalId);
        clearInterval(intervalIdEnemigos);
        alert("Gano") 
      }
  
      if (personaje.score >= 100) {
        jefe.draw()
        jefe.atras()
        jefe.imagen = eSprites[contadorTankSprite]
        if (
            jefe.posicionX <= personaje.posicionX + 100 &&
           
            personaje.posicionY <= jefe.posicionY + 1000 &&
          
            personaje.posicionY + 1000 >= jefe.posicionY
          ) {
            
            
            clearInterval(intervalId);
            clearInterval(intervalIdEnemigos);
            alert("perdio")     
      }}
    }, 1000 / 60);
  
    intervalIdEnemigos = setInterval(() => {
      
      timer++;
  
    
      if (Math.floor(Math.random() * 2) == 1) {
      
        const altura = Math.floor(Math.random() * 360);
  
        const Enemigo = new Enemy(ctx, 1000, altura, e0);
        enemigos.push(Enemigo);
      }
    }, 1000);
    setInterval(() => {
        actualizarSprites();
      }, 100);
        
    
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

function actualizarSprites() {
    personaje.imagen = tankSprites[contadorTankSprite];
  
    if (contadorTankSprite < 5) {
      contadorTankSprite++;
    } else {
      contadorTankSprite = 0;
    }
  
    enemigos.imagen = eSprites[contadorTankSprite];
  
    if (contadorTankSprite < 5) {
      contadorTankSprite++;
    } else {
      contadorTankSprite = 0;
    }
    jefe.imagen = bosssprites[contadorTankSprite];
  
    if (contadorTankSprite < 3) {
      contadorTankSprite++;
    } else {
      contadorTankSprite = 0;
    }
}