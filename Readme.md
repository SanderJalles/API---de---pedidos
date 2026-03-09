# 🚀 Jitterbit Order Integration API

API robusta para integração e gerenciamento de pedidos, desenvolvida com foco em **Clean Code**, **Tipagem Estrita** e **Segurança**. O projeto gerencia o fluxo de autenticação de usuários e o ciclo de vida completo de pedidos e seus itens.



---

## 🧠 Decisões de Arquitetura e Boas Práticas

Durante o desenvolvimento, a aplicação foi estruturada seguindo princípios de engenharia de software para garantir escalabilidade e fácil manutenção:

* **Data Transfer Objects (DTOs):** Implementação de interfaces de contrato para todas as entradas e saídas da API. Isso elimina o uso de `any`, garante a integridade dos dados e protege a API contra exposição desnecessária de campos (como senhas).
* **Camada de Service (Business Logic):** Controllers "lean" que delegam toda a lógica de negócio e persistência para os Services.
* **Mappers de Persistência:** Uso de Mappers para traduzir os dados da API para o formato esperado pelo banco de dados, permitindo que os nomes de campos no JSON sejam amigáveis (ex: `numeroPedido`) sem impactar a estrutura do PostgreSQL.
* **Transações Atômicas:** As atualizações de pedidos e itens são executadas dentro de blocos `$transaction` do Prisma, garantindo que a base de dados nunca fique em estado inconsistente.
* **Segurança com JWT & Bcrypt:** Senhas criptografadas com `bcryptjs` e autenticação via Bearer Token.
* **Tratamento de Erros:** Fluxo de exceções estruturado para retornar mensagens claras e códigos HTTP semânticos (400, 401, 404, 500).

---

## 🛠️ Tecnologias Utilizadas

* **Runtime:** Node.js (v20+)
* **Linguagem:** TypeScript
* **Framework:** Express
* **ORM:** Prisma
* **Banco de Dados:** PostgreSQL
* **Autenticação:** JSON Web Token (JWT) & BcryptJS
* **Infraestrutura:** Docker & Docker Compose

---

## ⚙️ Como Executar

### Pré-requisitos
* Docker e Docker Compose instalados.

### Passo a Passo
1. Clone o repositório:
   ```bash
   git clone <link-do-seu-repo>

   
2. Configure o arquivo .env com sua DATABASE_URL e JWT_SECRET.

3. Suba os containers (API + Banco):

Bash

docker-compose up --build
4. A API estará disponível em http://localhost:3000.


A documentação esta via postman, esta na pasta raiz como "Jitterbit Order API.postman".
Caso o "API Jitterbit rodando em http://localhost:3000" use o comando docker logs Jitterbit-Api
