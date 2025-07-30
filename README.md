# GitHub CRM — Backend

This is the backend for the GitHub CRM project built with NestJS.

## ⚙️ Tech Stack

* [NestJS](https://nestjs.com/)
* PostgreSQL
* TypeORM
* Swagger (API Docs)
* Docker

## 📖 Project Description

This project is a simple CRM system for managing public GitHub projects.

### Key Features:

- User registration and authentication via email and password.
- After login, users access a project list displaying:
  - Project owner
  - Project name
  - Project URL
  - Number of stars
  - Number of forks
  - Number of open issues
  - Creation date (UTC Unix timestamp)
  - Buttons to update and delete projects
- To add a new GitHub repository, users only provide the repository path (e.g., `facebook/react`).
- Ability to synchronise with GitHub and delete projects
- Quick system startup with Docker and Docker Compose.
- Clean and well-documented code following best practices.

## 🚀 Running with Docker

### 1. Create `.env` file

In the `github-crm-api` root, create a `.env` file.

> Note: `github_crm_db` is the name of the Postgres service used in the shared Docker network.

### 2. Create an external network (once)

```bash
docker network create githubcrm_network
```

### 3. Start the project

```bash
docker-compose up --build
```

### 4. API Docs

After the server starts, Swagger is available at: [http://localhost:4000/doc](http://localhost:4000/doc)
