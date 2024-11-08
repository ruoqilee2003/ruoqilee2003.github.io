let faceImg;
let eyeImg;
let mouthImg;
let decoImg;

function preload (){
  let eyeNum = floor(random(1, 5));
  let mouthNum = floor(random(1, 5));
  let decoNum = floor(random(1, 4));
  faceImg = loadImage("images/face.png");
  eyeImg = loadImage("images/eye-"+eyeNum+".png");
  mouthImg = loadImage("images/mouth-"+mouthNum+".png");
  decoImg = loadImage("images/deco-"+decoNum+".png");
}

async function setup(){
  createCanvas(600, 600);
  background(225, 225, 225);
  image(faceImg, 0, 0, 600, 600);
  image(eyeImg, 0, 0, 600, 600);
  image(mouthImg, 0, 0, 600, 600);
  image(decoImg, 0, 0, 600, 600);
}

function draw(){

}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}