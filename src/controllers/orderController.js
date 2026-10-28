const { orderService, TIPOS_PERMITIDOS, PRIORIDADES_PERMITIDAS } = require('../services/orderService');

exports.getAllOrders = (req, res, next) => {
  try {
    const orders = orderService.getAll();
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = (req, res, next) => {
  try {
    const order = orderService.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = (req, res, next) => {
  try {
    const { cliente, tipo, valor, prioridade } = req.body;

    if (!cliente || typeof cliente !== 'string' || cliente.trim().length === 0) {
      return res.status(400).json({ error: 'O campo cliente é obrigatório e não pode ser vazio.' });
    }

    if (typeof valor !== 'number' || valor <= 0) {
      return res.status(400).json({ error: 'O valor deve ser um número maior que zero.' });
    }

    if (!tipo || !TIPOS_PERMITIDOS.includes(tipo)) {
      return res.status(400).json({ 
        error: `Tipo inválido. Valores permitidos: ${TIPOS_PERMITIDOS.join(', ')}` 
      });
    }

    if (!prioridade || !PRIORIDADES_PERMITIDAS.includes(prioridade)) {
      return res.status(400).json({ 
        error: `Prioridade inválida. Valores permitidos: ${PRIORIDADES_PERMITIDAS.join(', ')}` 
      });
    }

    const newOrder = orderService.create({ cliente, tipo, valor, prioridade });
    return res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'O campo status é obrigatório.' });
    }

    const result = orderService.updateStatus(req.params.id, status);

    if (result.error === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    if (result.error === 'INVALID_STATUS') {
      return res.status(400).json({ error: 'Status informado é inválido.' });
    }

    if (result.error === 'TRANSITION_NOT_ALLOWED') {
      return res.status(400).json({ error: 'Pedidos entregues ou cancelados não podem ter seu status alterado.' });
    }

    return res.status(200).json(result.order);
  } catch (error) {
    next(error);
  }
};