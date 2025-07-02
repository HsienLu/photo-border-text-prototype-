# Photo Border Text Prototype

這個專案示範如何將照片加上邊框並於下方顯示 EXIF 資訊。程式已依照 3Rs 原則重構，提升可讀性與重複利用度。

## 安裝

```bash
npm install
```

## 使用

```bash
npm start
```

執行後會將 `DSC08101.jpg` 產生加上文字與邊框的 `output.jpg`。

### 啟動網頁介面

```bash
npm run start:web
```

開啟瀏覽器至 `http://localhost:3000` 即可看到新增的圖形介面。
選擇照片並送出後，處理完成的圖片會直接顯示在頁面下方，
無須下載即可預覽加上邊框與文字的效果，並可點擊下載圖片。
伺服器會回傳處理後圖片的網址，網頁便利用此網址載入並顯示結果，
所有處理完成的檔案都會存放在 `/uploads` 目錄中。
