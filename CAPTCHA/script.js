document.addEventListener("DOMContentLoaded", () => {
    const imageGrid = document.querySelector(".image-grid");
    const verifyBtn = document.getElementById("verify-btn");
    const resultMessage = document.getElementById("result-message");

    // 定義正確的目標圖片
    const correctTargets = ["50-1.png", "50-2.png", "50-4.png", "50-6.png", "50-8.png", "50-9.png", "50-11.png", "50-12.png", "50-14.png"];
    const images = [];

    // 動態生成圖片資料
    for (let i = 1; i <= 16; i++) {
        const imgName = `50-${i}.png`;
        images.push({
            src: `images/${imgName}`,
            isTarget: correctTargets.includes(imgName) // 判斷是否為正確目標
        });
    }

    // 動態生成 16 張圖片
    images.forEach(imgData => {
        const img = document.createElement("img");
        img.src = imgData.src;
        img.alt = "Image";
        img.dataset.target = imgData.isTarget; // 使用 dataset 儲存目標資訊
        img.dataset.name = imgData.src.split("/").pop(); // 儲存檔名
        imageGrid.appendChild(img);

        // 點擊事件
        img.addEventListener("click", () => {
            img.classList.toggle("selected");
        });
    });

    // 驗證邏輯
    verifyBtn.addEventListener("click", () => {
        const selectedImages = document.querySelectorAll(".image-grid img.selected");
        const selectedNames = Array.from(selectedImages).map(img => img.dataset.name);
        const isAllCorrect = 
            selectedNames.length === correctTargets.length && // 選中的數量必須正確
            correctTargets.every(target => selectedNames.includes(target)); // 確保所有正確目標被選中

        // 顯示結果
        if (isAllCorrect) {
            resultMessage.textContent = "成功！";
            resultMessage.style.color = "green";
        } else {
            resultMessage.textContent = "もう一度お試しください";
            resultMessage.style.color = "red";
        }
    });
});
