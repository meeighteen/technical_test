#build stage
FROM golang:1.24.1-alpine3.20 AS builder
RUN apk add --no-cache git

WORKDIR /app

COPY ["go.mod", "go.sum", "./"]

RUN go mod download -x
# -x para ver lo que se esta descargando

COPY . .

RUN go build -o app -v ./cmd/main.go


#final stage
FROM alpine:3.20
LABEL Name=apigo

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=builder /app .

ENV PORT=8080 \
    JWT_SECRET=supersecreto123 \
    APP_VUE_PROD=https://app-vue-fe-46101751761.us-central1.run.app

EXPOSE $PORT

ENTRYPOINT ["./app"]