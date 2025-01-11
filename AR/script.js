const videoElement = document.getElementById('videoElement');
const canvasElement = document.getElementById('canvasElement');
const ctx = canvasElement.getContext('2d');

// 設定 MediaPipe 手部追蹤
const hands = new Hands({locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`});
hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

// 設定相機
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 640,
  height: 480
});
camera.start();

// 當 MediaPipe 偵測到手部時的處理函數
hands.onResults((results) => {
  ctx.save();
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      // 繪製手部地標點
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 2});
      drawLandmarks(ctx, landmarks, {color: '#FF0000', lineWidth: 1});

      // 偵測觸碰事件，假設使用拇指和食指作為觸控點
      const thumbTip = landmarks[4];  // 拇指尖端
      const indexTip = landmarks[8];  // 食指尖端

      const distance = Math.sqrt(
        Math.pow(thumbTip.x - indexTip.x, 2) +
        Math.pow(thumbTip.y - indexTip.y, 2)
      );

      // 假設當拇指和食指的距離小於某個閾值時觸發互動
      if (distance < 0.05) {
        triggerInteraction();
      }
    }
  }
  ctx.restore();
});

// 當手部接觸時觸發的互動
function triggerInteraction() {
  alert('你觸碰到了物體！');
}
