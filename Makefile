include .env

NAME=finsplitter
VERSION=prod

.PHONY: *

start-infra:
	@echo "==> Running infra containers"
	@docker compose --profile infra up -d

stop-infra:
	@echo "==> Stopping infra containers"
	@docker compose --profile infra down -v --remove-orphans

start-dev: export BUILD_TARGET=dev-builder
start-dev: start-infra
	@echo "==> Running development containers"
	@docker compose --profile backend up

stop-dev:
	@echo "==> Stopping development containers"
	@docker compose --profile full down --rmi local -v --remove-orphans

logs-all:
	@echo "==> Reading all compose logs together"
	@docker compose -p finsplitter logs -f

logs-infra:
	@echo "==> Reading infra logs"
	@docker compose -p finsplitter --profile infra logs -f

build:
	@echo "==> Building Docker API image"
	@docker build --target production --rm --compress -t ${NAME}:${VERSION} .

run-network-host: build
	@echo "==> Running Docker API image"
	@docker run --rm --env-file .env --network host --name ${NAME} -t ${NAME}:${VERSION}

run-network-compose: build start-infra
	@echo "==> Running Docker API image"
	@docker run --rm --env-file .env --network finsplitter-net -p ${PORT}:${PORT} --name ${NAME} -t ${NAME}:${VERSION}

test:
	@echo "==> Running unit tests"
	@npm run test

test-watch:
	@echo "==> Running unit tests in watch mode"
	@npm run test:watch

test-cov:
	@echo "==> Running test coverage report"
	@npm run test:cov

test-e2e:
	@echo "==> Running e2e tests"
	@npm run test:e2e

clean:
	@echo "==> Deleting Docker image"
	@docker rmi ${NAME}:${VERSION}

docker-scout:
	@echo "==> Search for vulnerabilities on prod image"
	@docker scout cves -e --only-fixed ${NAME}:${VERSION}