### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/webprodigies/fuzzie-production.git
```

### Install packages

```shell
npm i
```

### Setup .env file

[.env.example](https://github.com/webprodigies/fuzzie-production/blob/main/.env.example)

### Setup Prisma

Add PostgreSQL Database

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

| command         | description                               |
| :-------------- | :-----------------------------------------|
| `dev`           | Starts a development instance of the app  |
| `build`         | Builds a production instance              |
| `start`         | Starts a production instance of the app   |
| `lint`          | Lints the app                             |
