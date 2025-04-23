const dotenv = require('dotenv');
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const cors = require('cors');
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5000'];



const app = express();
const port = process.env.PORT || 5000 ;
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
connectDB();
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/service', require('./routes/serviceRoutes'));
app.use('/api/booking', require('./routes/bookAppRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});