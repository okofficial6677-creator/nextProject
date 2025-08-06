
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const registrationRoutes = require('./src/routes/registrationRoutes');
const cardDataRoute = require('./src/routes/cardDataRoute');
const searchPropertyRoute = require('./src/routes/searchPropertyRoutes');
const sortByAscRoute = require('./src/routes/sortByAscRoutes');
const loginAuth = require('./src/routes/login_authRoute');
const propertyRoute = require('./src/routes/propertyRoute');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


app.use('/registration', registrationRoutes);
app.use('/login', loginAuth);
app.use('/hotelinfo', cardDataRoute);
app.use('/searchproperty', searchPropertyRoute);
app.use('/sort', sortByAscRoute);
app.use('/property', propertyRoute);


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'starting',
    message: 'API is running successfully'
  });
});


app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
