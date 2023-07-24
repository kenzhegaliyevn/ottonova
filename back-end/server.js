const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 4200;

app.use(express.json());

app.get('/api/data', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: 'Failed to read data from the file' });
    }

    try {
      const jsonData = JSON.parse(data);
      return res.json(jsonData);
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Failed to parse data from the file' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
