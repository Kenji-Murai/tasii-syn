let orders = [];
let nextId = 1;

const TIPOS_PERMITIDOS = ['entrega', 'retirada'];
const PRIORIDADES_PERMITIDAS = ['baixa', 'normal', 'alta'];
const STATUS_PERMITIDOS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

class OrderService {
  getAll() {
    return orders;
  }

  getById(id) {
    return orders.find(order => order.id === Number(id));
  }

  create(data) {
    const newOrder = {
      id: nextId++,
      cliente: data.cliente.trim(),
      tipo: data.tipo,
      valor: Number(data.valor),
      prioridade: data.prioridade,
      status: 'recebido'
    };
    orders.push(newOrder);
    return newOrder;
  }

  updateStatus(id, newStatus) {
    const order = this.getById(id);
    if (!order) return { error: 'NOT_FOUND' };

    if (!STATUS_PERMITIDOS.includes(newStatus)) {
      return { error: 'INVALID_STATUS' };
    }

    if (['entregue', 'cancelado'].includes(order.status)) {
      return { error: 'TRANSITION_NOT_ALLOWED' };
    }

    order.status = newStatus;
    return { order };
  }

  clearAll() {
    orders = [];
    nextId = 1;
  }
}

module.exports = {
  orderService: new OrderService(),
  TIPOS_PERMITIDOS,
  PRIORIDADES_PERMITIDAS,
  STATUS_PERMITIDOS
};