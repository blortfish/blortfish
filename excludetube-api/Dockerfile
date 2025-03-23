FROM golang:1.22-alpine AS builder

# Set working directory
WORKDIR /app

# Install git and build dependencies
RUN apk add --no-cache git

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server .

# Create final lightweight image
FROM alpine:3.19

# Add necessary runtime dependencies
RUN apk --no-cache add ca-certificates tzdata

# Set working directory
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/server /app/server

# Copy any required config or data files
COPY --from=builder /app/graph /app/graph
COPY --from=builder /app/mongo-data /app/mongo-data

# Expose the API port
EXPOSE 8080

# Run the server
CMD ["/app/server"]