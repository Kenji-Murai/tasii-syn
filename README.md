# API de Gerenciamento de Pedidos

A API REST desenvolvida aqui é voltada para a atividade A2 da disciplina de **Tópicos Avançados em Sistemas de Informação**. O objetivo do projeto é gerenciar o fluxo de pedidos de uma pequena loja.

## Tecnologias Utilizadas Pré-Definidas

* **Node.js**
* **Express**
* **Dotenv**
* **Jest & Supertest**

## Pré-requisitos e Instalação

1. Clone o repositório:
   git clone <URL_DO_REPOSITORIO>
   cd <PASTA_DO_PROJETO>

   ---

## Como Executar a Aplicação

Para iniciar o servidor HTTP:

npm start

A API estará acessivel em: http://localhost:3000.

## Regras de Negócio e Armazenamento

Os dados são armazenados temporariamente **em memória** dentro da camada de serviço (`src/services/orderService.js`).

* **Estrutura do Pedido:** `id`, `cliente`, `itens` (array), `total` (calculado automaticamente com base na quantidade e preço unitário), `status` (padrão: `PENDENTE`) e `criadoEm`.
* **Operações do Serviço:** Métodos isolados para listar, buscar por ID, criar, atualizar status, deletar e resetar o estado da memória.

## Endpoints da API

Todas as rotas possuem o prefixo `/api/v1/pedidos`:

| Método | Endpoint | Descrição | Status Sucesso | Status Erro Comum |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Lista todos os pedidos | `200 OK` | `500 Internal Error` |
| `GET` | `/:id` | Busca um pedido por ID | `200 OK` | `404 Not Found` |
| `POST` | `/` | Cria um novo pedido | `201 Created` | `400 Bad Request` |
| `PATCH` | `/:id/status` | Atualiza o status do pedido | `200 OK` | `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/:id` | Remove um pedido por ID | `204 No Content` | `404 Not Found` |

### Validação de Entrada (POST)

Para criar um pedido, o corpo da requisição deve conter obrigatoriamente um `cliente` (string) e ao menos um item no array `itens`. Caso contrário, a API retorna `400 Bad Request`.

## 🧪 Testes Automatizados

Os testes de integração foram desenvolvidos utilizando **Jest** e **Supertest**, validando a criação de pedidos, cálculo do valor total, buscas e respostas de erro.

Para rodar os testes:

npm test