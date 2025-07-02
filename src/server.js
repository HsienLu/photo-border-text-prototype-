const express = require('express');
const multer = require('multer');
const path = require('path');
const { addBorderAndText } = require('./addBorderAndText');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const urls = [];
    const files = req.files || [];
    for (const [index, file] of files.entries()) {
      const inputPath = file.path;
      const fileName = `output-${Date.now()}-${index}.jpg`;
      const outputPath = path.join('uploads', fileName);
      await addBorderAndText({ imagePath: inputPath, outputPath });
      urls.push('/uploads/' + fileName);
    }
    res.json({ urls });
  } catch (err) {
    console.error(err);
    res.status(500).send('Processing failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

