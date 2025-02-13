#Build stage
FROM node:20.18-alpine AS build
ARG FOLDER_PATH=.
WORKDIR /app

# COPY package*.json ./ yarn.lock ./
COPY "${FOLDER_PATH}/package.json" ./
# Install pnpm
RUN npm i -g pnpm@10.0.0
# Install dependencies
RUN pnpm i

# Copy the source code and dependencies to the container
COPY . .
# Build the source code
RUN yarn run build

#Production stage
FROM node:20.18-alpine AS production

WORKDIR /app

# COPY package*.json ./
COPY --from=build /app/package.json ./


# Install pnpm
RUN npm i -g pnpm@10.0.0
# Install dependencies without devDependencies
RUN pnpm i --ignore-scripts --prod

#npm ci --only=production

# Run database migrations

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./
# COPY --from=build /app/drizzle/ ./drizzle
COPY --from=build /app/drizzle.config.ts ./
COPY --from=build /app/scripts ./scripts
RUN chmod +x ./scripts/run.sh

# CMD ["node", "dist/index.js"]
# Run migration and then start the server in cmd
CMD ["./scripts/run.sh"] 