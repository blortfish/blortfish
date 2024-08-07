package main

import (
	"excludetube-api/graph"
// 	"log"
	"net/http"
// 	"os"
  "github.com/go-chi/chi/v5"
  "github.com/rs/cors"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func main() {
	router := chi.NewRouter()

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:8080"},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)


	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
// 	srv.AddTransport(&transport.Websocket{
// 		Upgrader: websocket.Upgrader{
// 			CheckOrigin: func(r *http.Request) bool {
// 				// Check against your desired domains here
// 				return r.Host == "example.org"
// 			},
// 			ReadBufferSize:  1024,
// 			WriteBufferSize: 1024,
// 		},
// 	})

	router.Handle("/", playground.Handler("Starwars", "/query"))
	router.Handle("/query", srv)

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		panic(err)
	}
}
