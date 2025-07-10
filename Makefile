.PHONY: start-db start-backend start-frontend run stop


start-db:
	cd ./backend && docker compose up -d db

start-backend:
	cd ./backend && docker compose up -d backend


start-frontend:
	cd ./backend && docker compose up -d frontend

run: start-db start-backend start-frontend
stop: 
	cd ./backend && docker compose down
