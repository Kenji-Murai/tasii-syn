const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Rotas da API
app.use('/api/v1/pedidos', orderRoutes);

// Middleware de tratamento centralizado de erros
app.use(errorHandler);

module.exports = app;