// 當用戶點擊按鈕時啟動 AR
document.getElementById("start-ar-btn").addEventListener("click", () => {
  if (navigator.xr) {
      // 啟動 WebXR AR Session，要求手部追蹤特性
      navigator.xr.requestSession('immersive-ar', {
          requiredFeatures: ['hand-tracking']
      }).then(onSessionStarted).catch(err => {
          console.error('Failed to start AR session:', err);
      });
  } else {
      console.error('WebXR is not supported on this device.');
  }
});

function onSessionStarted(session) {
  session.addEventListener('end', onSessionEnded);

  // 設置參考空間來處理虛擬物體的位置
  const handTracking = session.requestReferenceSpace('local').then(referenceSpace => {
      session.requestAnimationFrame(onXRFrame);
  });

  function onXRFrame(time, frame) {
      const referenceSpace = frame.getViewerPose(handTracking);
      if (referenceSpace) {
          // 獲取手部追蹤位置
          const handPosition = referenceSpace[0].pose.position;
          console.log("Hand Position:", handPosition);

          // 假設有一個虛擬物體的位置
          const objectPosition = { x: 0, y: 1.5, z: 2 };  // 這是方塊在三維空間中的位置

          // 檢查手部是否接近物體
          if (isHandNearObject(handPosition, objectPosition)) {
              triggerInteraction();
          }
      }
  }
}

// 計算手部與物體之間的距離
function isHandNearObject(handPosition, objectPosition) {
  const distance = Math.sqrt(
      Math.pow(handPosition.x - objectPosition.x, 2) +
      Math.pow(handPosition.y - objectPosition.y, 2) +
      Math.pow(handPosition.z - objectPosition.z, 2)
  );
  return distance < 0.5; // 如果手部距離物體小於 50 cm，就觸發互動
}

// 當手部接近物體時觸發互動
function triggerInteraction() {
  // 顯示觸摸彈窗
  alert('You touched the object!');
}

// AR session 結束時的處理
function onSessionEnded() {
  console.log('AR session ended');
}
