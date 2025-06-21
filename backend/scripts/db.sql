create table personajes (
    id serial primary key,
    nombre varchar(100) not null,
    origen varchar(100) not null,
    descripcion varchar(255) not null,
    poder varchar(100) not null,
    imagen varchar(255)
)

create table duelo (
    id serial primary key,
    personaje1_id int REFERENCES personajes (id),
    personaje2_id int REFERENCES personajes (id),
    votos_personaje1 int default 0,
    votos_personaje2 int default 0,
    ganador_id INT
)

create table estadisticas (
    personaje_id int REFERENCES personajes (id),
    duelos_participados int default 0,
    duelos_ganados int default 0,
    duelos_perdidos int default 0,
    porcentaje_victoria decimal(5,2) default 0.00,
    imagen varchar(255)
)