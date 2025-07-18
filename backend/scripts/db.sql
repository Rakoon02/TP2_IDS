CREATE TABLE IF NOT EXISTS universos (
    id serial primary key,
    nombre varchar(100) NOT NULL UNIQUE,
    creador varchar(100) NOT NULL,
    fecha varchar(50) NOT NULL,
    descripcion varchar(255) NOT NULL,
    imagen varchar(255)
);

CREATE TABLE IF NOT EXISTS personajes (
    id serial primary key,
    nombre varchar(100) NOT NULL,
    origen_id int REFERENCES universos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    descripcion varchar(255) NOT NULL,
    poder varchar(100) NOT NULL,
    imagen varchar(255)
);


CREATE TABLE IF NOT EXISTS lugares (
    id serial primary key,
    nombre varchar(100) NOT NULL UNIQUE,
    descripcion varchar(255) NOT NULL,
    origen_id int REFERENCES universos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    tipo varchar(100) NOT NULL,    
    imagen varchar(255)
);


CREATE TABLE IF NOT EXISTS duelo (
    id serial primary key,
    personaje1_id int REFERENCES personajes (id) ON DELETE CASCADE ON UPDATE CASCADE,
    personaje2_id int REFERENCES personajes (id) ON DELETE CASCADE ON UPDATE CASCADE,
    fecha TIMESTAMP DEFAULT now(),
    lugar_id INT REFERENCES lugares(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ganador_id int REFERENCES personajes(id) ON DELETE CASCADE ON UPDATE CASCADE
);