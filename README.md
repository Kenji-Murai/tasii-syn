# API de Gerenciamento de Pedidos

A API REST desenvolvida neste projeto é voltada para a avaliação **A2** da disciplina de **Tópicos Avançados em Sistemas de Informação II**. O objetivo da aplicação é gerenciar o fluxo de pedidos de uma loja.

---

## Tecnologias Utilizadas

- **Node.js** (Runtime JavaScript)
- **Express** (Framework web HTTP)
- **Dotenv** (Gerenciamento de variáveis de ambiente)
- **Jest & Supertest** (Testes de integração e automatizados)

---

## Pré-requisitos e Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <PASTA_DO_PROJETO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. (Opcional) Configure o arquivo `.env`:
   ```bash
   cp .env.example .env
   ```

---

## Como Executar a Aplicação

Para iniciar o servidor HTTP:
```bash
npm start
```

Para iniciar em modo de desenvolvimento (com recarregamento automático):
```bash
npm run dev
```

A API estará acessível em: `http://localhost:3000`

---

## Regras de Negócio e Armazenamento

Os dados da aplicação são gerenciados temporariamente **em memória** dentro da camada de serviço (`src/services/orderService.js`).

### Estrutura do Pedido (`Order`)
- **`id`**: Identificador único gerado automaticamente.
- **`cliente`**: Nome do cliente responsável pelo pedido (`string`, obrigatório).
- **`itens`**: Lista de produtos/serviços (`array`, obrigatório e deve conter ao menos 1 item).
- **`total`**: Valor total calculado automaticamente com base na quantidade e no preço unitário dos itens.
- **`status`**: Estado atual do processamento do pedido (padrão: `PENDENTE`).
- **`criadoEm`**: Data e hora (`timestamp`) de criação do registro.

### Operações do Serviço
O serviço disponibiliza métodos isolados para:
- Listar todos os pedidos;
- Buscar um pedido por ID;
- Criar novos pedidos e calcular o total automaticamente;
- Atualizar o status de um pedido;
- Deletar registros por ID;
- Resetar o estado da memória (utilitário para isolamento dos testes).

---

## Endpoints da API

Todas as rotas possuem o prefixo de versão `/api/v1/pedidos`:

| Método | Endpoint | Descrição | Status Sucesso | Status Erro Comum |
| :--- | :--- | :--- | :---: | :---: |
| **`GET`** | `/` | Lista todos os pedidos cadastrados | `200 OK` | `500 Internal Error` |
| **`GET`** | `/:id` | Busca os detalhes de um pedido por ID | `200 OK` | `404 Not Found` |
| **`POST`** | `/` | Cria um novo pedido na aplicação | `201 Created` | `400 Bad Request` |
| **`PATCH`** | `/:id/status` | Atualiza o estado (`status`) de um pedido | `200 OK` | `400 Bad Request` / `404 Not Found` |
| **`DELETE`** | `/:id` | Remove permanentemente um pedido por ID | `204 No Content` | `404 Not Found` |

---

## Validação de Entrada (POST)

Para realizar a criação de um pedido (`POST /api/v1/pedidos`), o corpo (`body`) da requisição deve atender aos seguintes critérios obrigatórios:
1. **`cliente`**: Deve ser informada uma string válida e não vazia.
2. **`itens`**: Deve conter um array com pelo menos 1 item válido (com quantidade e preço unitário informados para o cálculo automático do valor total).

> ⚠️ Caso os dados enviados não atendam a estes requisitos, a API interromperá o processamento e retornará o status **`400 Bad Request`** com a mensagem de erro correspondente.

---

## Testes Automatizados

Os testes de integração foram desenvolvidos utilizando **Jest** e **Supertest**, validando a criação de pedidos, o cálculo do valor total, as buscas, as atualizações de status e as respostas para cenários de erro.

Para rodar os testes:
```bash
npm test
```

---

## Registro do Uso de Inteligência Artificial

Em conformidade com as orientações acadêmicas da atividade A2, o uso de Inteligência Artificial (Gemini) foi adotado como ferramenta de apoio durante o desenvolvimento do projeto.

- **Tarefas em que foi utilizada:**
  - Auxílio na estruturação inicial da arquitetura em camadas (`routes`, `controllers`, `services`).
  - Sugestão de padrões para validações de entrada e tratamento centralizado de erros.
  - Elaboração e estruturação dos cenários de testes automatizados de integração com Jest e Supertest.
- **Sugestões Aceitas e Modificadas:**
  - **Separação de `app.js` e `server.js` (Aceita):** A IA sugeriu isolar a instância do Express da inicialização do servidor HTTP, permitindo a execução dos testes de integração com `supertest` sem ocupar portas de rede.
  - **Validação e Cálculo do Total (Modificadas):** As sugestões de validação enviadas pela IA foram recalculadas para garantir que o cálculo do campo `total` fosse feito obrigatoriamente no backend com base no preço unitário e na quantidade do array de `itens`, evitando manipulações indevidas vindas do cliente.