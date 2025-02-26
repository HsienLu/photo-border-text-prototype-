// exif.js
const fs = require('fs').promises;
const exifParser = require('exif-parser');

/**
 * 從指定的 JPEG 檔案中讀取 EXIF 資訊，
 * 並根據相機廠牌、型號、焦距、光圈、快門速度及 ISO 等資訊組合成文字
 * 如果某個欄位不存在則使用預設值或略過
 */
async function extractExifText(imagePath) {
  try {
    // 讀取圖片檔案為 buffer
    const buffer = await fs.readFile(imagePath);
    // 建立 exif-parser 解析器並解析 EXIF 資訊
    const parser = exifParser.create(buffer);
    const result = parser.parse();
    const tags = result.tags;
    console.log(result)
    // 取得相機資訊
    const make = tags.Make || 'Unknown Make';
    const model = tags.Model || 'Unknown Model';
    const focalLength = tags.FocalLength ? `${tags.FocalLength}mm` : '';
    const fNumber = tags.FNumber ? `f/${tags.FNumber}` : '';
    
    // 快門速度：若曝光時間小於 1 秒則轉換為分數
    let exposure = '';
    if (tags.ExposureTime) {
      exposure = tags.ExposureTime < 1
        ? `1/${Math.round(1 / tags.ExposureTime)}`
        : tags.ExposureTime.toString();
    }
    
    const iso = tags.ISO ? `ISO${tags.ISO}` : '';

    // 組合成多行文字，並移除首尾空白
    return `${make}\n${model}\n${focalLength} ${fNumber} ${exposure} ${iso}`.trim();
  } catch (err) {
    console.error('讀取 EXIF 資訊失敗:', err);
    return "No EXIF data available";
  }
}

module.exports = { extractExifText };
