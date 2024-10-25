const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const authRoutes = require('./routes/auth');
const getdata = require('./routes/userdata');
const orderRoute = require('./routes/order');
const dataorderRoute = require('./routes/order-data');
const tracingRoute = require('./routes/tracingData');
const cors = require('cors');
app.use(express.urlencoded({extended: false}));

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"));

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);
app.use('/app', authRoutes);
app.use('/app', getdata);
app.use('/app', orderRoute);
app.use('/app', dataorderRoute);
app.use('/app', tracingRoute);
app.listen(port, () => console.log(`InstaYa app listening on port ${port}!`));
