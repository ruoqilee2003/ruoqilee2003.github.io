let catImg;  // Declare image variable globally

function preload() {
  // Array of cute cat image URLs
  const catUrls = [
    'https://a.pinatafarm.com/500x611/7761b37244/scared-hamster.jpg',
    'https://d.newsweek.com/en/full/2272085/balltze-dog-aka-cheems.jpg?w=1600&h=1600&q=88&f=5fabbe04adc2d69c801bee18bf470bc3',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNWtvn2m0XTjlsPwTeSXTZn_Y3qDLsUOsxxrjqOIMh7IAv0PRMnpKR0ZPWbLYFwWA3xIQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxy1s4iuDpyXcEY7Ja8K9z4FpQ9b0Vfu6kxCfKOFF_ywo-WRkNX9-oe0_4OXmz0QNd1A4&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTxyeu1HFzHNCgHJzgN_lJQ1bpIuzSGA3iQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoCYAb-ecZLFr9dq6ZlibAG-MCWr7Ya_cczr4EWH677AoWvnvNWP2kMX5xcEblzqYbIKU&usqp=CAU',
    'https://wimg.mk.co.kr/news/cms/202406/09/news-p.v1.20240607.b9261839770849919a6c858cb02f0738_P1.png'
  ];
  // Randomly select a cat image
  const randomCatUrl = random(catUrls);
  catImg = loadImage(randomCatUrl);
}

async function setup() {
  createCanvas(800, 800);
  background(255);

  // Draw the cat image and apply a light overlay
  image(catImg, 0, 0, width, height);
  fill(255, 255, 255, 0.3);  // Semi-transparent white
  rect(0, 0, width, height);

  colorMode(HSB);

  let mainHue = random(0, 360);
  let shapeType = random(0, 1);
  let fillType = random(0, 1);

  let emojis = ['💝', '✨', '🩷', '💗', '💕', '💖', '⭐']
  let cornerSize = 200;
  for(let i=0; i<50; i++){
    let corner = floor(random(4));
    let posX, posY;
    
    switch(corner) {
      case 0: // Top-left
        posX = random(0, cornerSize);
        posY = random(0, cornerSize);
        break;
      case 1: // Top-right
        posX = random(width - cornerSize, width);
        posY = random(0, cornerSize);
        break;
      case 2: // Bottom-left
        posX = random(0, cornerSize);
        posY = random(height - cornerSize, height);
        break;
      case 3: // Bottom-right
        posX = random(width - cornerSize, width);
        posY = random(height - cornerSize, height);
        break;
    }
    
    let size = random(20, 50);  // Slightly reduced max size
    
    let colorH = mainHue + random(-30, 30);
    let colorS = random(10, 30);
    let colorB = random(80, 100);
    
    fill(colorH, colorS, colorB);
    noStroke();
    
    textSize(size);
    textAlign(CENTER, CENTER);
    let selectedEmoji = random(emojis);
    text(selectedEmoji, posX, posY);
    
    await sleep(10);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}