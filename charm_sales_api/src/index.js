const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line
const swaggerUI = require('swagger-ui-express');
const salesRoutes = require('./routes/sales');
const authRoutes = require('./routes/auth');
const reportsRoutes = require('./routes/reports');
const profileRoutes = require('./routes/profile');
const crawlerRoutes = require('./routes/crawler');
require('dotenv').config();

// Adjust the path to your Swagger document
const swaggerDocument = require(path.join(__dirname, '../../docs/openapi.json'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/sales', salesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/crawler', crawlerRoutes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
