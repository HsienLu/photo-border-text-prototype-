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
可以將多張照片直接拖曳到頁面上，或在檔案選擇器中一次勾選多個檔案後上傳。
介面提供欄位可分別調整四邊邊框大小與顏色，套用到所有上傳的圖片。
送出後伺服器會依序處理每張照片並回傳包含所有檔案網址的陣列，
網頁會以此在預覽區塊中逐一顯示處理結果。
所有處理完成的檔案都會存放在 `/uploads` 目錄中。

### 下載所有處理後的圖片

上傳並處理完多張照片後，可按下「Download All」按鈕一次取得 ZIP 檔。伺服器提供 `/download-zip` 路徑會將上一批處理的檔案打包後下載。

### 使用 React 版前端

本專案已改寫前端為使用 Vite、React 與 TailwindCSS。開發階段可在 `client/` 目錄啟動
Vite 開發伺服器：

```bash
cd client
npm install
npm run dev
```

建置完成後的檔案會產生在 `client/dist`，執行 Express 伺服器時若 `NODE_ENV=production`
即會提供這些靜態檔案。
