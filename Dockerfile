FROM node:20.9.0-alpine AS builder
WORKDIR /app
COPY nest-cli.json package.json yarn.lock tsconfig.json tsconfig.build.json ./
RUN yarn
COPY src ./src
RUN yarn build

FROM node:20.9.0-alpine as runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["yarn", "start:prod"]
