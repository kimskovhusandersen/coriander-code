-- from commandline:
-- psql -d actors -f actors.sql

DROP TABLE IF EXISTS actors;

create table actors(
    id serial primary key,
    first varchar(255) not null,
    last varchar(255) not null,
    age integer,
    oscars integer
);

insert into actors (first, last, age, oscars) values ('Jennifer', 'Lawrence', 25,1);
insert into actors (first, last, age, oscars) values ('Samuel L.', 'Jackson', 67,0);
insert into actors (first, last, age, oscars) values ('Meryl', 'Streep', 66, 3);
insert into actors (first, last, age, oscars) values ('John', 'Cho', 4);
insert into actors (first, last, age, oscars) values ('John', 'Cho', 43,0);

select (first, last) from actors where oscars > 1;
-- (Meryl,Streep)
-- (1 row)

select (first, last) from actors where age > 30;
--  (Leonardo,DiCaprio)
--  ("Samuel L.",Jackson)
--  (Meryl,Streep)
--  (John,Cho)
-- (4 rows)
