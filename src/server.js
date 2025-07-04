require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
