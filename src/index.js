// index.js
const { addBorderAndText } = require('./addBorderAndText');

(async () => {
  await addBorderAndText({
    imagePath: './DSC08101.jpg',
    outputPath: 'output.jpg'
    // 可依需要傳入其他參數自定義設定
  });
})();
