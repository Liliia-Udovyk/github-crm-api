# GitHub CRM — Backend

This is the backend for the GitHub CRM project built with NestJS.

## ⚙️ Tech Stack

* [NestJS](https://nestjs.com/)
* PostgreSQL
* TypeORM
* Swagger (API Docs)
* Docker

## 🚀 Running with Docker

### 1. Create `.env` file

In the `github-crm-nest` root, create a `.env` file.

> Note: `github_crm_db` is the name of the Postgres service used in the shared Docker network.

### 2. Create an external network (once)

```bash
docker network create githubcrm_network
```

### 3. Start the backend

```bash
docker-compose up --build
```

### 4. API Docs

After the server starts, Swagger is available at: [http://localhost:4000/doc](http://localhost:4000/doc)
