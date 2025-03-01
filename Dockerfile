####################
###  BASE Stage  ###
####################
FROM node:22.14.0-bookworm-slim AS base

WORKDIR /app
RUN chown node:node /app && \
    DEBIAN_FRONTEND=noninteractive apt -qq update && apt -qq upgrade -y && \
    apt -qq install --no-install-recommends dumb-init procps -y

########################
### PROD BUILD Stage ###
########################
FROM base AS builder

COPY --chown=node:node . .
RUN npm ci && rm -rf dist
RUN npm run build

#######################
### DEV BUILD Stage ###
#######################
FROM base AS dev-builder

COPY --chown=1000:1000 package*.json ./
RUN npm ci
USER 1000

##################
### PROD Stage ###
##################
FROM base AS production

ENV NODE_ENV=production
COPY --from=builder /app/package*.json .
RUN npm ci --omit=dev
COPY --from=builder /app/dist dist
USER node

CMD ["dumb-init", "npm", "run", "start:prod"]