# TP2 - Introducción al Desarrollo de Software

### Grupo IS NOT NULL

Este es el TP integrador de la materia, el proyecto consiste en una página web de duelos entre personajes de varios universos, donde el usuario elige un ganador del duelo.

### Tecnologías Utilizadas
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js/Express 
- **Base de datos**: PostgreSQL
- **Docker**: Docker Compose para levantar la base de datos.

#### La estructura de la base de datos se encuentra en
```
./backend/scripts/db.sql
```

#### Para levantar el backend del proyecto, correr:
```
make run-backend
```

#### Para levantar solo la base de datos, correr:

```
make start-db
```

#### Para parar la base de datos del proyecto, correr:

```
make stop-db
```