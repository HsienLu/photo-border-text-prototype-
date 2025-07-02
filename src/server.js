const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { addBorderAndText } = require('./addBorderAndText');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const fileName = `output-${Date.now()}.jpg`;
    const outputPath = path.join('uploads', fileName);
    await addBorderAndText({ imagePath: inputPath, outputPath });
    fs.unlink(inputPath).catch(() => {});
    res.json({ url: `/uploads/${fileName}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Processing failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

