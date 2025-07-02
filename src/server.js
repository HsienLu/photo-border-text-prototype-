const express = require('express');
const multer = require('multer');
const path = require('path');
const archiver = require('archiver');
const { addBorderAndText } = require('./addBorderAndText');

// Parse integers safely so invalid values won't become NaN
function safeParseInt(value, defaultValue) {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

const app = express();
const upload = multer({ dest: 'uploads/' });
let processedFilePaths = [];

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const urls = [];
    const files = req.files || [];
    processedFilePaths = [];
    for (const [index, file] of files.entries()) {
      const inputPath = file.path;
      const fileName = `output-${Date.now()}-${index}.jpg`;
      const outputPath = path.join('uploads', fileName);
      await addBorderAndText({
        imagePath: inputPath,
        outputPath,
        topBorderSize: safeParseInt(req.body.topBorder, undefined),
        bottomBorderSize: safeParseInt(req.body.bottomBorder, undefined),
        leftBorderSize: safeParseInt(req.body.leftBorder, undefined),
        rightBorderSize: safeParseInt(req.body.rightBorder, undefined),
        backgroundColor: req.body.borderColor,
      });
      urls.push('/uploads/' + fileName);
      processedFilePaths.push(path.join(__dirname, '..', outputPath));
    }
    res.json({ urls });
  } catch (err) {
    console.error(err);
    res.status(500).send('Processing failed');
  }
});

app.get('/download-zip', (req, res) => {
  if (!processedFilePaths.length) {
    return res.status(404).send('No files to download');
  }

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="images.zip"');

  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('error', err => {
    console.error(err);
    res.status(500).end();
  });

  archive.pipe(res);
  processedFilePaths.forEach(p => {
    archive.file(p, { name: path.basename(p) });
  });
  archive.finalize();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

