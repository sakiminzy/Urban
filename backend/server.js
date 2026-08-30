const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { seedCatalogIfEmpty } = require('./database/seed');

dotenv.config();
seedCatalogIfEmpty();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Urban Harvest Hub API running on port ${PORT}`);
});
