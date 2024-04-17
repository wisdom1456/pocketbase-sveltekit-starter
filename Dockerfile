# Build the backend
FROM golang:1.22-alpine AS backend-builder
WORKDIR /build
COPY pb/go.mod pb/go.sum ./
RUN go mod download
COPY pb/main.go ./
COPY pb/hooks ./hooks
RUN apk --no-cache add upx make git gcc libtool musl-dev ca-certificates dumb-init \
  && go mod tidy \
  && CGO_ENABLED=0 go build \
  && upx pocketbase

# Build the frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/sk
COPY sk/package.json sk/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY sk/ ./
RUN pnpm build

# Final stage
FROM alpine
WORKDIR /app/pb

# Copy backend files
COPY --from=backend-builder /build/pocketbase /app/pb/pocketbase
COPY pb/pb_migrations ./pb_migrations
COPY pb/data/email_templates ./data/email_templates

# Copy frontend files
COPY --from=frontend-builder /app/sk/build ../sk/build

EXPOSE 8090

ENTRYPOINT ["/app/pb/pocketbase", "serve", "--http", "0.0.0.0:8090", "--publicDir", "../sk/build"]