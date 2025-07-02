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

開啟瀏覽器至 `http://localhost:3000` 便可使用圖形介面。
現在可一次選擇多張照片進行上傳。
送出後伺服器會依序處理每張照片並回傳所有檔案的網址，
網頁會將這些網址用於預覽區塊中顯示處理結果。
所有處理完成的檔案都會存放在 `/uploads` 目錄中。
