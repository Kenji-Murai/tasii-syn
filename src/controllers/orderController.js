const orderService = require('../services/orderService');

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
    const { cliente, itens } = req.body;

    // Validação básica de entrada
    if (!cliente || !itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: 'Informe o cliente e pelo menos um item válido.' });
    }

    const newOrder = orderService.create({ cliente, itens });
    return res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'O novo status é obrigatório.' });
    }

    const updatedOrder = orderService.updateStatus(req.params.id, status);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = (req, res, next) => {
  try {
    const deleted = orderService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};