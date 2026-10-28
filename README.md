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

Os dados da aplicação são gerenciados temporariamente **em memória** dentro da camada de serviço (`src/services/orderService.js`).

- **Estrutura do Pedido (`Order`):**
  - `id`: Identificador único gerado automaticamente.
  - `cliente`: Nome do cliente responsável pelo pedido (`string`, obrigatório).
  - `itens`: Lista de produtos/serviços (`array`, obrigatório e deve conter ao menos 1 item).
  - `total`: Valor total calculado automaticamente com base na quantidade e no preço unitário dos itens.
  - `status`: Estado atual do processamento do pedido (padrão: `PENDENTE`).
  - `criadoEm`: Data e hora (`timestamp`) de criação do registro.

- **Operações do Serviço:**
  - Métodos isolados para listar todos os pedidos, buscar por ID, criar novos pedidos, atualizar status, deletar registros e resetar o estado da memória (utilitário para testes).

---

## Endpoints da API

Todas as rotas possuem o prefixo de versão `/api/v1/pedidos`:

| Método | Endpoint | Descrição | Status Sucesso | Status Erro Comum |
| :--- | :--- | :--- | :---: | :---: |
| `GET` | `/` | Lista todos os pedidos cadastrados | `200 OK` | `500 Internal Error` |
| `GET` | `/:id` | Busca os detalhes de um pedido por ID | `200 OK` | `404 Not Found` |
| `POST` | `/` | Cria um novo pedido na aplicação | `201 Created` | `400 Bad Request` |
| `PATCH` | `/:id/status` | Atualiza o estado (`status`) de um pedido | `200 OK` | `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/:id` | Remove permanentemente um pedido por ID | `204 No Content` | `404 Not Found` |

---

### Validação de Entrada (POST)

Para realizar a criação de um pedido (`POST /api/v1/pedidos`), o corpo (`body`) da requisição deve atender aos seguintes critérios obrigatórios:

1. **`cliente`**: Deve ser informado uma `string` válida e não vazia.
2. **`itens`**: Deve conter um `array` com **pelo menos 1 item** válido (com quantidade e preço unitário informados para o cálculo do total).

> ⚠️ Caso os dados enviados não atendam a estes requisitos, a API interromperá o processamento e retornará o status **`400 Bad Request`** com a mensagem de erro correspondente.

## Testes Automatizados

Os testes de integração foram desenvolvidos utilizando **Jest** e **Supertest**, validando a criação de pedidos, cálculo do valor total, buscas e respostas de erro.

Para rodar os testes:

npm test

## Registro do Uso de Inteligência Artificial

Em conformidade com as orientações do projeto, o uso de Inteligência Artificial (Gemini) foi adotado como ferramenta de apoio durante o desenvolvimento do mesmo.

* **Tarefas em que foi utilizada:**
  * Auxílio na estruturação inicial da arquitetura em camadas (`routes`, `controllers`, `services`).
  * Sugestão de padrões para validações de entrada e tratamento centralizado de erros.
  * Elaboração dos cenários de testes automatizados com Jest.

* **Sugestões Aceitas e Modificadas:**
  * **Separar `app.js` e `server.js` (Aceita):** A IA sugeriu isolar a instância do Express da inicialização do servidor HTTP, o que facilitou a execução dos testes com `supertest` sem prender portas de rede.
  * **Estrutura do modelo de dados (Modificada):** A sugestão inicial da IA trazia um array de itens dentro do pedido. Após checagem e validação das especificações do projeto, modificamos para atender estritamente aos campos solicitados: `cliente`, `tipo`, `valor`, `prioridade` e `status`.