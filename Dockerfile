# build SPA
FROM node:22-slim AS node
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /node/src/app
COPY app .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# build app
FROM golang:1.24 AS go

WORKDIR /go/src/app
COPY . .

RUN go mod download
RUN CGO_ENABLED=0 go build -o /go/bin/lab ./base/main.go

FROM gcr.io/distroless/static-debian12
COPY --from=node /node/src/public /public
COPY --from=go /go/bin/lab /
ENTRYPOINT ["/lab", "serve"]
