.PHONY: build up down logs cli restart clean

# Переменные
COMPOSE=docker-compose
COMPOSE_FILE=docker-compose.yml

# Сборка образов
build:
	$(COMPOSE) build

# Запуск сервисов
up:
	$(COMPOSE) up -d

# Запуск сервисов с выводом логов
up-logs:
	$(COMPOSE) up

# Остановка сервисов
down:
	$(COMPOSE) down

# Остановка сервисов с удалением volumes
down-volumes:
	$(COMPOSE) down -v

# Просмотр логов
logs:
	$(COMPOSE) logs -f

# Просмотр логов конкретного сервиса
logs-backend:
	$(COMPOSE) logs -f backend

logs-postgres:
	$(COMPOSE) logs -f postgres

logs-redis:
	$(COMPOSE) logs -f redis

# Подключение к контейнеру backend (работает после создания Dockerfile)
cli:
	$(COMPOSE) exec backend sh

# Подключение к контейнеру postgres
cli-postgres:
	$(COMPOSE) exec postgres psql -U postgres -d okn_ai

# Подключение к контейнеру redis
cli-redis:
	$(COMPOSE) exec redis redis-cli

# Перезапуск сервисов
restart:
	$(COMPOSE) restart

# Перезапуск конкретного сервиса
restart-backend:
	$(COMPOSE) restart backend

# Очистка (остановка и удаление volumes)
clean: down-volumes

# Показать статус сервисов
ps:
	$(COMPOSE) ps

# Выполнить миграции Prisma в контейнере
migrate:
	$(COMPOSE) exec backend npx prisma migrate dev

# Выполнить генерацию Prisma Client в контейнере
prisma-generate:
	$(COMPOSE) exec backend npx prisma generate

# Открыть Prisma Studio в контейнере
prisma-studio:
	$(COMPOSE) exec backend npx prisma studio

