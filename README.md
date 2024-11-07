# In.Orbit

Aplicação de gerenciamento de metas desenvolvida durante o NLW Pocket de Javascript da Rocketseat


## Melhorias

Além do que foi desenvolvido durante o evento, este projeto conta as funcionalidades de desmarcar as metas concluídas e de selecionar de qual semana será mostrada o resumo


## Rodando local

Clone o projeto

```bash
  git clone https://github.com/PedroWaite/MetasGerenciador.git
```

Entre no diretório geral do projeto
```bash
  cd Metas
```

#### Rodando o backend

A partir do diretório geral entre no diretório server
```bash
  cd server
```

Instale as dependências
```bash
  pnpm install
```

Execute o banco de dados utilizando docker
```bash
  docker compose up -d
```

Na raiz do server crie um arquivo .env e defina a variável `DATABASE_URL` (ex: "postgresql://docker:docker@localhost:5432/inorbit")

Rode as migrations do banco de dados e o arquivo seed.ts para pré-popular o banco
```bash
pnpm db:migrate
pnpm db:seed
```

Rode o projeto
```bash
pnpm dev
```

#### Rodando o frontend

A partir do diretório geral entre no diretório web
```bash
  cd web
```

Instale as dependências
```bash
  pnpm install
```

Rode o projeto
```bash
pnpm dev
```

## Documentação da API

Por padrão a API roda na porta 3333

#### Retorna o resumo da semana

```http
  GET /summary
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `weekOfYear` | `number` | **Opcional**. Determina uma semana do ano especifica para buscar |

#### Retorna as metas a serem concluídas na semana

```http
  GET /pending-goals
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `weekOfYear` | `number` | **Opcional**. Determina uma semana do ano especifica para buscar |

#### Cria uma nova meta

```http
  POST /goals
```
**Estrutura do body:**
```json
{
  "title": "Nome da meta",
  "desiredWeeklyFrequency": 4 // Frequencia que a meta deve ser completa na semana
}
```

#### Completa uma meta na semana atual

```http
  POST /completions
```
**Estrutura do body:**
```json
{
  "goalId": "ID da meta"
}
```

#### Descompleta uma meta na semana atual

```http
  DELETE /completions
```
**Estrutura do body:**
```json
{
  "goalCompletionId": "ID da conclusão"
}
```
## Stack utilizada

**Front-end:** React, Vite, TailwindCSS, TanstackQuery, ReactHookForm, Zod, Dayjs

**Back-end:** Node, Fastify, Zod, Dayjs, DrizzleORM, Docker, Postgres
