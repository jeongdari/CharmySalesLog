const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const salesRoutes = require('./routes/sales');
const authRoutes = require('./routes/auth');
const reportsRoutes = require('./routes/reports');
const profileRoutes = require('./routes/profile');
const crawlerRoutes = require('./routes/crawler');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/sales', salesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/crawler', crawlerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
