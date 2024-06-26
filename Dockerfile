FROM golang:1.22-alpine AS builder
WORKDIR /build
COPY pb/go.mod pb/go.sum ./
RUN go mod download
COPY pb/main.go ./
COPY pb/hooks ./hooks
RUN apk --no-cache add upx make git gcc libtool musl-dev ca-certificates dumb-init \
  && go mod tidy \
  && CGO_ENABLED=0 go build \
  && upx pocketbase

FROM alpine
WORKDIR /app/pb
COPY --from=builder /build/pocketbase /app/pb/pocketbase
COPY pb/pb_migrations ./pb_migrations
COPY ./sk/build ./pb_public
COPY pb/data/email_templates ./data/email_templates

ENTRYPOINT ["/app/pb/pocketbase", "serve", "--http", "0.0.0.0:8090", "--publicDir", "/app/pb/pb_public"]