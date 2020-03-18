-- from commandline:
-- psql -d cities -f cities.sql

-- DELETE TABLE
DROP TABLE IF EXISTS cities;

-- CREATE TABLE
create table cities(
    id serial primary key,
    city varchar(255) not null,
    state varchar(255),
    country varchar
);

-- ALTER TABLE
alter table cities add column population integer;
alter table cities drop column state;

-- - INSERT
INSERT INTO cities (city, country, population) VALUES ('Berlin', 'Germany', 3610156);
INSERT INTO cities (city, country, population) VALUES ('Hamburg', 'Germany', 1774242);
INSERT INTO cities (city, country, population) VALUES ('Munch', 'Germany', 1450381);
INSERT INTO cities (city, country, population) VALUES ('Tokyo', 'Japan', 13617445);
INSERT INTO cities (city, country, population) VALUES ('Sydney', 'Australia', 4921000);

-- UPDATE
UPDATE cities SET city = 'Munich' WHERE city = 'Munch';

-- DELETE
DELETE FROM cities WHERE country <> 'Germany';

-- SELECT
SELECT * FROM cities;

-- ALIAS
SELECT city AS town, population AS citizens FROM cities;

-- WHERE
SELECT * FROM cities WHERE id < 2;
