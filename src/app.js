const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/pedidos', orderRoutes);

app.use(errorHandler);

module.exports = app;