# Feast Backend

### Apps

- `@remis/feast`: Express.js backend
- `apps/levis`: React frontend

Both applications are written in **TypeScript**.

---

## Backend Development

- Install Docker
- Run `yarn install` to install dependencies
- Run `yarn dev:feast` to start the Feast backend
- Backend URL: http://localhost:3000
- Drizzle Studio: https://local.drizzle.studio/?port=3001&host=127.0.0.1

---

## Frontend Development

```bash
cd apps/levis
yarn install
yarn dev
```

Frontend URL:

```
http://localhost:5173
```

> Change the port if your frontend is configured differently.

---

## Database

Whenever a new schema is created or an existing schema is modified:

Generate a migration:

```bash
yarn db:generate
```

Apply the migration:

```bash
yarn dev:migration
```

Generated SQL files are stored in:

```
apps/feast/drizzle
```

---

## Docker Commands

- `yarn dev:feast` starts the backend, MySQL and Redis
- `yarn dev:mysql` starts only the MySQL container
- `yarn dev:migration` runs pending database migrations
- `yarn dev:studio` starts Drizzle Studio
- `yarn stop:feast` stops all Feast containers
- `yarn list:containers` lists running containers
- `yarn logs:feast` shows backend logs
- `yarn logs:mysql` shows MySQL logs
- `yarn logs:studio` shows Drizzle Studio logs
- `yarn logs:migration` shows migration logs
- `yarn kill:docker` forcefully stops all running Docker containers

---

## Rebuilding Containers

If the container is outdated after pulling the latest changes:

```bash
docker compose -f docker/feast/docker-compose-dev.yml up --build
```

If that does not resolve the issue:

```bash
docker compose -f docker/feast/docker-compose-dev.yml up --force-recreate
```

---

## Common Issues

### Migrations are not applied

Run:

```bash
yarn dev:migration
```

If the migration still does not apply, enter the backend container:

```bash
docker exec -it feast_backend sh
```

Then run:

```bash
yarn db:migrate
```

---

### Drizzle Studio

Start Studio:

```bash
yarn dev:studio
```

Open:

```
https://local.drizzle.studio/?port=3001&host=127.0.0.1
```