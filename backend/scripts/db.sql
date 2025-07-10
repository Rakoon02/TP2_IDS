CREATE TABLE universos (
    id serial primary key,
    nombre varchar(100) NOT NULL UNIQUE,
    creador varchar(100) NOT NULL,
    fecha varchar(50) NOT NULL,
    descripcion varchar(255) NOT NULL,
    imagen varchar(255)
);

CREATE TABLE personajes (
    id serial primary key,
    nombre varchar(100) NOT NULL,
    origen_id int REFERENCES universos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    descripcion varchar(255) NOT NULL,
    poder varchar(100) NOT NULL,
    imagen varchar(255)
);


CREATE TABLE lugares (
    id serial primary key,
    nombre varchar(100) NOT NULL UNIQUE,
    descripcion varchar(255) NOT NULL,
    origen_id int REFERENCES universos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    tipo varchar(100) NOT NULL,    
    imagen varchar(255)
);


CREATE TABLE duelo (
    id serial primary key,
    personaje1_id int REFERENCES personajes (id) ON DELETE CASCADE ON UPDATE CASCADE,
    personaje2_id int REFERENCES personajes (id) ON DELETE CASCADE ON UPDATE CASCADE,
    fecha TIMESTAMP DEFAULT now(),
    lugar_id INT REFERENCES lugares(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ganador_id int REFERENCES personajes(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE estadisticas (
    personaje_id int REFERENCES personajes (id) ON DELETE CASCADE ON UPDATE CASCADE,
    duelos_participados int default 0,
    duelos_ganados int default 0,
    duelos_perdidos int default 0,
    porcentaje_victoria decimal(5,2) default 0.00
);


