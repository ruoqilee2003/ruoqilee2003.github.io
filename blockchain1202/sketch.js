<<<<<<< HEAD
let dvd; // DVD 圖片
let cracks = []; // 裂痕紀錄
let crackImages = []; // 裂痕圖片陣列
let x, y; // DVD 位置
let xSpeed, ySpeed; // DVD 速度
let boundary = { x: 100, y: 100, w: 600, h: 400 }; // 框的範圍

// 震動變數
let oscillation = 17; // 設置較大的初始振幅
let damping = 0.8; // 阻尼係數，用於減弱震動
let oscillating = false; // 是否在震動

function preload() {
  dvd = loadImage('windows.png');
  
  // 載入裂痕貼圖
  crackImages.push(loadImage('crack1.png')); // 替換成你的圖片路徑
  crackImages.push(loadImage('crack2.png'));
  crackImages.push(loadImage('crack3.png'));
  crackImages.push(loadImage('crack4.png'));
}

function setup() {
  createCanvas(800, 600);
  x = random(boundary.x, boundary.x + boundary.w - 100); // 初始位置
  y = random(boundary.y, boundary.y + boundary.h - 100);
  xSpeed = random(65, 80); // 初始速度範圍減小
  ySpeed = random(65, 80);
}

function draw() {
  background(255); // 白色背景

  // 畫出黑色框內區域
  noStroke();
  fill(0); // 黑色填充
  rect(boundary.x, boundary.y, boundary.w, boundary.h);

  // 畫出框線
  noFill();
  stroke(0); // 黑色框線
  strokeWeight(2);
  rect(boundary.x, boundary.y, boundary.w, boundary.h);

  // 更新位置
  x += xSpeed;
  y += ySpeed;

  // 檢測碰撞
  checkCollision();

  // 計算震動位移
  let vibration = oscillating ? cos(oscillation) * oscillation * 0.5 : 0; // 減少震動幅度
  oscillation *= damping; // 阻尼使震動逐漸減弱

  if (abs(oscillation) < 0.01) {
    oscillating = false; // 當震動很小時，停止震動
  }

  // 繪製裂痕
  for (let i = cracks.length - 1; i >= 0; i--) {
    let c = cracks[i];
    image(c.img, c.x, c.y, 100, 100); // 裂痕放大至 150x150
    c.life--; // 減少壽命
    if (c.life <= 0) {
      cracks.splice(i, 1); // 移除過期的裂痕
    }
  }

  // 繪製 DVD 圖片
  image(dvd, x + vibration, y + vibration, 100, 100);

  // 如果速度大於10，就減緩至10
  if (xSpeed >= 10) {
    xSpeed *= 0.6; 
    ySpeed *= 0.6; 
  } else {
    xSpeed *= 1; 
    ySpeed *= 1; 
  }
}

// 檢測碰撞的函數
function checkCollision() {
  if (x <= boundary.x) {
    xSpeed *= -1;
    addOscillation(true); // 左邊框，左右震動
    addCrack(boundary.x - 40, y + 50); // 左邊框
  } else if (x + 100 >= boundary.x + boundary.w) {
    xSpeed *= -1;
    addOscillation(true); // 右邊框，左右震動
    addCrack(boundary.x + boundary.w - 40, y + 50); // 右邊框
  }
  if (y <= boundary.y) {
    ySpeed *= -1;
    addOscillation(false); // 上邊框，上下震動
    addCrack(x + 50, boundary.y - 40); // 上邊框
  } else if (y + 100 >= boundary.y + boundary.h) {
    ySpeed *= -1;
    addOscillation(false); // 下邊框，上下震動
    addCrack(x + 50, boundary.y + boundary.h - 40); // 下邊框
  }
}

// 增加震動效果的函數
function addOscillation(horizontal) {
  oscillating = true;
  oscillation = 15; // 設置較大的初始振幅
}

// 新增裂痕的函數
function addCrack(crackX, crackY) {
  let randomCrack = random(crackImages); // 隨機選擇一張裂痕圖片
  cracks.push({ x: crackX, y: crackY, img: randomCrack, life: 120 }); // 壽命延長至 120 幀
}
=======
let dvd; // DVD 圖片
let cracks = []; // 裂痕紀錄
let crackImages = []; // 裂痕圖片陣列
let x, y; // DVD 位置
let xSpeed, ySpeed; // DVD 速度
let boundary = { x: 100, y: 100, w: 600, h: 400 }; // 框的範圍

// 震動變數
let oscillation = 9; // 設置較大的初始振幅
let damping = 0.8; // 阻尼係數，用於減弱震動
let oscillating = false; // 是否在震動

function preload() {
  dvd = loadImage('windows.png');
  
  // 載入裂痕貼圖
  crackImages.push(loadImage('crack1.png')); // 替換成你的圖片路徑
  crackImages.push(loadImage('crack2.png'));
  crackImages.push(loadImage('crack3.png'));
  crackImages.push(loadImage('crack4.png'));
}

function setup() {
  createCanvas(800, 600);
  x = random(boundary.x, boundary.x + boundary.w - 100); // 初始位置
  y = random(boundary.y, boundary.y + boundary.h - 100);
  xSpeed = random(40, 70); // 初始速度範圍減小
  ySpeed = random(40, 70);
}

function draw() {
  background(255); // 白色背景

  // 畫出黑色框內區域
  noStroke();
  fill(0); // 黑色填充
  rect(boundary.x, boundary.y, boundary.w, boundary.h);

  // 畫出框線
  noFill();
  stroke(0); // 黑色框線
  strokeWeight(2);
  rect(boundary.x, boundary.y, boundary.w, boundary.h);

  // 更新位置
  x += xSpeed;
  y += ySpeed;

  // 檢測碰撞
  checkCollision();

  // 計算震動位移
  let vibration = oscillating ? cos(oscillation) * oscillation * 0.5 : 0; // 減少震動幅度
  oscillation *= damping; // 阻尼使震動逐漸減弱

  if (abs(oscillation) < 0.01) {
    oscillating = false; // 當震動很小時，停止震動
  }

  // 繪製裂痕
  for (let i = cracks.length - 1; i >= 0; i--) {
    let c = cracks[i];
    image(c.img, c.x, c.y, 100, 100); // 裂痕放大至 150x150
    c.life--; // 減少壽命
    if (c.life <= 0) {
      cracks.splice(i, 1); // 移除過期的裂痕
    }
}

  // 繪製 DVD 圖片
  image(dvd, x + vibration, y + vibration, 100, 100);

  if (xSpeed >= 5) {
    xSpeed *= 0.7; 
    ySpeed *= 0.7; 
  } else {
    xSpeed *= 1; 
    ySpeed *= 1; 
  }
}

// 檢測碰撞的函數
function checkCollision() {
  if (x <= boundary.x) {
    xSpeed *= -1;
    addOscillation(true); // 左邊框，左右震動
    addCrack(boundary.x - 40, y + 50); // 左邊框
  } else if (x + 100 >= boundary.x + boundary.w) {
    xSpeed *= -1;
    addOscillation(true); // 右邊框，左右震動
    addCrack(boundary.x + boundary.w - 40, y + 50); // 右邊框
  }
  if (y <= boundary.y) {
    ySpeed *= -1;
    addOscillation(false); // 上邊框，上下震動
    addCrack(x + 50, boundary.y - 40); // 上邊框
  } else if (y + 100 >= boundary.y + boundary.h) {
    ySpeed *= -1;
    addOscillation(false); // 下邊框，上下震動
    addCrack(x + 50, boundary.y + boundary.h - 40); // 下邊框
  }
}

// 增加震動效果的函數
function addOscillation(horizontal) {
  oscillating = true;
  oscillation = 20; // 設置較大的初始振幅
}

// 新增裂痕的函數
function addCrack(crackX, crackY) {
  let randomCrack = random(crackImages); // 隨機選擇一張裂痕圖片
  cracks.push({ x: crackX, y: crackY, img: randomCrack, life: 120 }); // 壽命延長至 120 幀
}
>>>>>>> d0c474efc5b258cd47974e4e8d2144c278a7695c
