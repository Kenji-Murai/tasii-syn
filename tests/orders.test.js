const request = require('supertest');
const app = require('../src/app');
const orderService = require('../src/services/orderService');

beforeEach(() => {
  orderService.clearAll();
});

describe('API de Pedidos', () => {
  it('Deve criar um pedido com sucesso (POST /api/v1/pedidos)', async () => {
    const payload = {
      cliente: 'Maria Silva',
      itens: [
        { nome: 'Camiseta', quantidade: 2, precoUnitario: 50.0 }
      ]
    };

    const res = await request(app)
      .post('/api/v1/pedidos')
      .send(payload);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.total).toEqual(100.0);
  });

  it('Deve retornar 400 ao tentar criar um pedido sem itens', async () => {
    const res = await request(app)
      .post('/api/v1/pedidos')
      .send({ cliente: 'João' });

    expect(res.statusCode).toEqual(400);
  });

  it('Deve listar os pedidos cadastrados (GET /api/v1/pedidos)', async () => {
    orderService.create({
      cliente: 'Carlos',
      itens: [{ nome: 'Livro', quantidade: 1, precoUnitario: 30.0 }]
    });

    const res = await request(app).get('/api/v1/pedidos');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
  });
});