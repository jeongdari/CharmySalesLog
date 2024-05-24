const express = require('express');
const salesRoutes = require('./routes/salesRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/sales', salesRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
