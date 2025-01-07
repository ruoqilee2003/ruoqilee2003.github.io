let nfts = [];
let textures = [];
let nftInfo = {}; // NFT 詳情
let cubes = []; // 用於儲存立方體的數據
let player = { x: 0, y: 100, z: 0 }; // 玩家初始位置
let gravity = 0.98; // 模擬重力
let keys = {}; // 儲存按鍵狀態
let camAngleX = 0; // 攝像機角度（上下）
let camAngleY = 0; // 攝像機角度（左右）
let cubeSize = 500; // 立方體大小

function setup() {
  createCanvas(800, 600, WEBGL);
  const walletAddress = getWalletFromURL();
  if (walletAddress) {
    fetchNFTs(walletAddress);
  }

  // 初始化攝像機
  camera(0, 0, 800, 0, 0, 0, 0, 1, 0);
}

function draw() {
  background(30);
  lights();

  // 玩家移動控制
  handlePlayerMovement();

  // 旋轉視角
  rotateX(camAngleX);
  rotateY(camAngleY);

  // 平移場景以模擬第一人稱視角
  translate(-player.x, -player.y, -player.z);

  // 更新並顯示立方體
  for (let cube of cubes) {
    push();

    // 模擬重力效果
    if (cube.y < 0) {
      cube.y = 0; // 停止在地面上
    } else {
      cube.y -= gravity;
    }

    // 平移到立方體的位置
    translate(cube.x, cube.y, cube.z);

    // 顯示完整立方體，所有面均包含 NFT 材質
    for (let i = 0; i < 6; i++) {
      push();
      texture(cube.texture); // 為每一面添加 NFT 材質
      noStroke(); // 移除線條
      switch (i) {
        case 0: translate(0, 0, cubeSize / 2); break; // 前面
        case 1: translate(0, 0, -cubeSize / 2); rotateY(PI); break; // 後面
        case 2: translate(0, -cubeSize / 2, 0); rotateX(-HALF_PI); break; // 上面
        case 3: translate(0, cubeSize / 2, 0); rotateX(HALF_PI); break; // 下面
        case 4: translate(-cubeSize / 2, 0, 0); rotateY(-HALF_PI); break; // 左面
        case 5: translate(cubeSize / 2, 0, 0); rotateY(HALF_PI); break; // 右面
      }
      plane(cubeSize, cubeSize);
      pop();
    }

    pop();
  }
}

function handlePlayerMovement() {
  let speed = 5;

  // WASD 控制移動
  if (keys['w']) player.z -= speed;
  if (keys['s']) player.z += speed;
  if (keys['a']) player.x -= speed;
  if (keys['d']) player.x += speed;
}

function mouseDragged() {
  // 滑鼠拖動旋轉視角
  camAngleY += movedX * 0.01;
  camAngleX -= movedY * 0.01;
}

function keyPressed() {
  keys[key] = true;
}

function keyReleased() {
  keys[key] = false;
}

async function fetchNFTs(walletAddress) {
  try {
    const response = await fetch(
      `https://api.tzkt.io/v1/tokens/balances?account=${walletAddress}&token.metadata.artifactUri.null=false`
    );
    const data = await response.json();

    let positions = generateRandomPositions(data.length, cubeSize * 1.5);

    for (let i = 0; i < 35; i++) {
      const item = data[i];
      const imageUrl = item.token.metadata.displayUri || item.token.metadata.artifactUri;

      if (imageUrl) {
        const resolvedUrl = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
        loadImage(resolvedUrl, (img) => {
          textures.push(img); // 將圖片添加到材質陣列

          // 將立方體數據添加到 cubes
          cubes.push({
            x: positions[i].x,
            y: positions[i].y,
            z: positions[i].z,
            texture: img,
          });
        });

        // 儲存 NFT 的詳細資訊
        nftInfo[i] = {
          name: item.token.metadata.name,
          description: item.token.metadata.description || "No description available",
        };
      }
    }
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    alert("Failed to fetch NFTs. Please try again later.");
  }
}

function generateRandomPositions(count, spacing) {
  let positions = [];

  for (let i = 0; i < count; i++) {
    let x = random(-spacing * 5, spacing * 5);
    let y = random(spacing * 2, spacing * 5); // 隨機高度
    let z = random(-spacing * 5, spacing * 5);
    positions.push({ x: x, y: y, z: z });
  }

  return positions;
}

function getWalletFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("wallet");
}