// addBorderAndText.js
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs').promises;
const { extractExifText } = require('./exif');

/**
 * 為圖片加上邊框與下方文字，文字內容從 EXIF 資訊中取得
 * 可透過參數自定義各項設定
 */
async function addBorderAndText({
  imagePath,            // 圖片來源路徑
  outputPath,           // 輸出圖片儲存路徑
  borderSize = 200,     // 左右與上方邊框寬度（預設200px）
  bottomBorderSize = 500, // 底部邊框高度（預設500px）
  textMargin = 100,     // 文字行與行之間的間隔（預設100px）
  textImageMargin = 200, // 圖片與文字區塊間的間隔（預設200px）
  font = '72px Arial',  // 文字字體與大小
  textAlign = 'center', // 文字對齊方式
  backgroundColor = 'white', // 背景顏色（邊框區域）
  textColor = 'black'   // 文字顏色
}) {
  try {
    // 1. 從圖片中讀取 EXIF 資訊並組合成文字
    const text = await extractExifText(imagePath);

    // 2. 載入圖片
    const image = await loadImage(imagePath);
    // 計算新畫布尺寸
    const newWidth = image.width + borderSize * 2;
    const newHeight = image.height + borderSize + bottomBorderSize;

    // 3. 建立畫布與取得 2D 繪圖上下文
    const canvas = createCanvas(newWidth, newHeight);
    const ctx = canvas.getContext('2d');

    // 4. 填充整個畫布背景（邊框區域）
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, newWidth, newHeight);

    // 5. 在畫布上繪製圖片，從邊框距離處開始
    ctx.drawImage(image, borderSize, borderSize);

    // 6. 設定文字樣式
    ctx.fillStyle = textColor;
    ctx.font = font;
    ctx.textAlign = textAlign;

    // 7. 計算文字起始 Y 軸位置（位於圖片下方加上設定的間隔）
    const textStartY = image.height + borderSize + textImageMargin;
    const textLines = text.split("\n");

    // 8. 逐行繪製文字
    textLines.forEach((line, index) => {
      ctx.fillText(line, newWidth / 2, textStartY + index * textMargin);
    });

    // 9. 轉換畫布內容為 JPEG 格式（最高品質）並寫入檔案
    const buffer = canvas.toBuffer('image/jpeg', { quality: 1 });
    await fs.writeFile(outputPath, buffer);

    console.log('圖片處理完成，並使用 EXIF 資訊更新文字內容');
  } catch (err) {
    console.error('圖片處理錯誤:', err);
  }
}

module.exports = { addBorderAndText };
