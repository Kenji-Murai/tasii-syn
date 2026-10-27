let orders = [];
let nextId = 1;

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
      cliente: data.cliente,
      itens: data.itens, // Array de itens { nome, quantidade, precoUnitario }
      total: data.itens.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0),
      status: 'PENDENTE',
      criadoEm: new Date().toISOString()
    };
    orders.push(newOrder);
    return newOrder;
  }

  updateStatus(id, status) {
    const order = this.getById(id);
    if (!order) return null;
    
    order.status = status;
    return order;
  }

  delete(id) {
    const index = orders.findIndex(order => order.id === Number(id));
    if (index === -1) return false;
    
    orders.splice(index, 1);
    return true;
  }

  clearAll() { // Útil para resetar o estado durante os testes
    orders = [];
    nextId = 1;
  }
}

module.exports = new OrderService();