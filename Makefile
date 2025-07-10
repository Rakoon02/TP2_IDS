.PHONY: start-db start-backend start-frontend 


start-db:
	cd ./backend && docker compose up -d db

start-backend:
	cd ./backend && docker compose up -d backend


start-frontend:
	cd ./backend && docker compose up -d frontend
