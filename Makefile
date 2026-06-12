# ─────────────────────────────────────────────────────────────
#  diploma — task runner
#  Run `make` or `make help` to list available targets.
# ─────────────────────────────────────────────────────────────
.DEFAULT_GOAL := help

# Override on the CLI, e.g.  make docker-build IMAGE=myname:tag
IMAGE        ?= diploma:latest
PORT         ?= 3000
COMPOSE      ?= docker compose
NPM          ?= npm

.PHONY: help
help: ## Show this help
	@grep -hE '^[a-zA-Z0-9_-]+:.*?## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

# ── Local development ────────────────────────────────────────
.PHONY: install
install: ## Install dependencies (npm ci)
	$(NPM) ci

.PHONY: dev
dev: ## Start the Next.js dev server
	$(NPM) run dev

.PHONY: build
build: ## Production build
	$(NPM) run build

.PHONY: start
start: ## Run the production server (after `make build`)
	$(NPM) run start

.PHONY: lint
lint: ## Run ESLint
	$(NPM) run lint

.PHONY: typecheck
typecheck: ## Type-check without emitting
	$(NPM) exec tsc -- --noEmit

# ── Prisma / database ────────────────────────────────────────
.PHONY: prisma-generate
prisma-generate: ## Generate the Prisma client
	$(NPM) exec prisma generate

.PHONY: migrate
migrate: ## Create & apply a dev migration (NAME=my_migration)
	$(NPM) exec prisma migrate dev $(if $(NAME),--name $(NAME),)

.PHONY: migrate-deploy
migrate-deploy: ## Apply pending migrations (production)
	$(NPM) exec prisma migrate deploy

.PHONY: db-studio
db-studio: ## Open Prisma Studio
	$(NPM) exec prisma studio

.PHONY: db-reset
db-reset: ## Drop, recreate & re-migrate the database (DESTRUCTIVE)
	$(NPM) exec prisma migrate reset

# ── Docker (single image) ────────────────────────────────────
.PHONY: docker-build
docker-build: ## Build the production image
	docker build -t $(IMAGE) .

.PHONY: docker-run
docker-run: ## Run the image (needs a reachable DATABASE_URL via .env)
	docker run --rm -p $(PORT):3000 --env-file .env $(IMAGE)

# ── Docker Compose (app + postgres) ──────────────────────────
.PHONY: compose-up
compose-up: ## Build & start the full stack (db + migrate + app)
	$(COMPOSE) up --build -d

.PHONY: compose-down
compose-down: ## Stop the stack (keep data volume)
	$(COMPOSE) down

.PHONY: compose-down-v
compose-down-v: ## Stop the stack and DELETE the data volume
	$(COMPOSE) down -v

.PHONY: compose-logs
compose-logs: ## Tail logs from all services
	$(COMPOSE) logs -f

.PHONY: compose-migrate
compose-migrate: ## Apply migrations against the compose db only
	$(COMPOSE) run --rm migrate

# ── Quality gates & tests ────────────────────────────────────
.PHONY: lint-eslint
lint-eslint: ## Run ESLint
	$(NPM) run lint

.PHONY: lint-deps
lint-deps: ## Run dependency-cruiser
	$(NPM) run lint:deps

.PHONY: lint-metrics
lint-metrics: ## rust-code-analysis complexity gate (downloads the binary on first run)
	@RCA_BIN=./bin/rust-code-analysis-cli sh scripts/install-rca.sh
	@RCA_BIN=./bin/rust-code-analysis-cli \
		RCA_VERSION=0.0.25 \
		RCA_SCOPE=src/ \
		RCA_EXCLUDES='**/node_modules/** **/.next/** **/coverage/** **/tests/** **/generated/**' \
		METRICS_POLICY=config/metrics-policy.json \
		METRICS_POLICY_SCHEMA=config/metrics-policy.schema.json \
		sh scripts/lint-metrics.sh

.PHONY: lint-all
lint-all: lint-eslint typecheck lint-deps lint-metrics ## Run every static check

.PHONY: test
test: ## Run unit tests (Jest, jsdom)
	$(NPM) test

.PHONY: test-integration
test-integration: ## Run integration tests (Jest, node)
	$(NPM) run test:integration

.PHONY: test-e2e-install
test-e2e-install: ## Install Playwright browsers
	$(NPM) exec playwright install

.PHONY: test-e2e
test-e2e: ## Run Playwright E2E tests (needs the app + a DB — see README)
	$(NPM) run test:e2e

# ── Housekeeping ─────────────────────────────────────────────
.PHONY: clean
clean: ## Remove build output and node_modules
	rm -rf .next out node_modules
