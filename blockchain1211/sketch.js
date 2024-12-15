// 粒子類別
class Particle {
  constructor(x, y, color, speedFactor = 1) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1)); // 初始方向：隨機向外
    this.velocity.setMag(random(1, 3) * speedFactor); // 調整速度大小
    this.gravity = createVector(0, 0.1); // 重力影響，向下加速度
    this.lifespan = 255; // 壽命
    this.color = color; // 粒子顏色
    this.size = random(5, 10); // 隨機大小
  }

  update() {
    this.velocity.add(this.gravity); // 添加重力效果
    this.position.add(this.velocity); // 更新位置
    this.lifespan -= 4; // 壽命遞減
    this.size *= 0.96; // 粒子逐漸縮小
  }

  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.lifespan); // 隨機顏色
    ellipse(this.position.x, this.position.y, this.size);
  }

  isDead() {
    return this.lifespan <= 0; // 壽命結束
  }
}

// 煙火系統
let particles = [];
let currentImageIndex = 0;
let bgImage; // 台北101背景圖片
let bgImages = ['taipei101.jpg', 'Dadaocheng.jpg', 'nccu.jpg', 'sky.jpg']; // 替換為你的圖片路徑
let fireworkTimer = 0; // 煙火計時器

function preload() {
  // 預載所有背景圖片
  bgImages = bgImages.map(image => loadImage(image));
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER); // 設定圖片繪製模式為中心
  bgImage = bgImages[currentImageIndex]; // 初始背景圖片
}

function draw() {
  background(0, 3); // 增強殘影效果

  // 計算背景圖片的適當縮放比例，並完全填滿畫布
  let scaleFactor = max(width / bgImage.width, height / bgImage.height);
  image(bgImage, width / 2, height / 2, bgImage.width * scaleFactor, bgImage.height * scaleFactor);

  // 更新並顯示所有粒子
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();
    if (p.isDead()) {
      particles.splice(i, 1); // 移除壽命結束的粒子
    }
  }
  
  // 每隔一定時間更頻繁地生成煙火
  fireworkTimer++;
  if (fireworkTimer % 20 === 0) { // 每隔約0.2秒生成煙火
    createFirework(random(width), random(height / 2)); // 讓煙火生成在畫面上半部分
  }
}

// 滑鼠點擊觸發煙火
function mousePressed() {
  createHeartFirework(mouseX, mouseY); // 在滑鼠點擊位置生成愛心煙火
}

// 按鈕調用的函數
function changeBackground() {
  currentImageIndex = (currentImageIndex + 1) % bgImages.length; // 切換到下一張圖片
  bgImage = bgImages[currentImageIndex]; // 更新當前背景圖片
  console.log('Background changed to:', bgImage);
}

// 隨機生成煙火
function createFirework(x, y) {
  // 隨機設定煙火的大小
  let fireworkSize = random(50, 400); // 整個煙火的半徑大小
  let numParticles = floor(map(fireworkSize, 50, 150, 30, 100)); // 根據大小決定粒子數量
  for (let i = 0; i < numParticles; i++) {
    let r = random(100, 255);
    let g = random(100, 255);
    let b = random(100, 255);
    particles.push(new Particle(x, y, [r, g, b]));
  }
}

// 添加愛心形狀的煙火
function createHeartFirework(x, y) {
  let numParticles = 100; // 愛心煙火的粒子數量
  let rotationAngle = random(TWO_PI); // 隨機旋轉角度
  for (let i = 0; i < numParticles; i++) {
    let angle = random(TWO_PI); // 隨機角度
    let radius = 10 * (1 - sin(angle)) + random(-2, 2); // 愛心公式
    let offsetX = 16 * pow(sin(angle), 3); // 愛心 x 坐標公式
    let offsetY = -(13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle)); // 愛心 y 坐標公式
    offsetX *= 3; // 放大比例
    offsetY *= 3; // 放大比例

    // 旋轉公式
    let rotatedX = offsetX * cos(rotationAngle) - offsetY * sin(rotationAngle);
    let rotatedY = offsetX * sin(rotationAngle) + offsetY * cos(rotationAngle);

    let r = random(200, 255); // 愛心顏色
    let g = random(50, 100);  // 淡綠色分量
    let b = random(100, 255); // 淡藍色分量
    particles.push(new Particle(x + rotatedX, y + rotatedY, [r, g, b], 0.5)); // 添加速度縮放因子
  }
}