PHONY: *

start-infra:
	@echo "==> Running infra containers"
	@docker compose --profile infra up -d

stop-infra:
	@echo "==> Stopping infra containers"
	@docker compose --profile infra down -v --remove-orphans

logs-all:
	@echo "==> Reading all compose logs together"
	@docker compose -p finsplitter logs -f

logs-infra:
	@echo "==> Reading infra logs"
	@docker compose -p finsplitter --profile infra logs -f
