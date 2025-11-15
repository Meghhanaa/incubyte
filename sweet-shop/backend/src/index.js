require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const sweetsRoutes = require('./routes/sweets');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

const port = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(port, () => {
    console.log('Server running on port', port);
  });
}

module.exports = app;
