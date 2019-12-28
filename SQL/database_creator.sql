\c postgres;
DROP DATABASE drzaveapp;
CREATE DATABASE drzaveapp;

\c drzaveapp;

CREATE TABLE country(id BIGSERIAL NOT NULL PRIMARY KEY, 
name TEXT NOT NULL);

CREATE TABLE city(id BIGSERIAL NOT NULL PRIMARY KEY,
name TEXT NOT NULL, population INTEGER, 
countryid INTEGER NOT NULL REFERENCES country(id));

INSERT INTO country (name) VALUES ('Denmark');
INSERT INTO country (name) VALUES ('Germany');
INSERT INTO country (name) VALUES ('Sweeden');

INSERT INTO city(name, population, countryid) VALUES ('Copenhagen', 100250, 1);
INSERT INTO city(name, population, countryid) VALUES ('Odense', 67327, 1);

INSERT INTO city(name, population, countryid) VALUES ('Berlin', 88220, 2);
INSERT INTO city(name, population, countryid) VALUES ('Bonn', 76548, 2);
INSERT INTO city(name, population, countryid) VALUES ('Aalen', 79324, 2);

INSERT INTO city(name, population, countryid) VALUES ('Stockholm', 109859, 3);
INSERT INTO city(name, population, countryid) VALUES ('Gothenburg', 99508, 3);
INSERT INTO city(name, population, countryid) VALUES ('Karlstad', 66912, 3);
INSERT INTO city(name, population, countryid) VALUES ('Uppsala', 46983, 3);

------- Get_Cities
CREATE FUNCTION get_cities(_country TEXT) RETURNS TABLE(city_name TEXT, city_population int)
AS $$
BEGIN

RETURN query SELECT city.name, city.population FROM city WHERE countryid = 
(SELECT id from country WHERE country.name = _country);
IF NOT FOUND THEN
RETURN query SELECT city.name, city.population FROM city;
END IF;

END
$$
LANGUAGE plpgsql;

------- Get_Cities_by_Population
CREATE FUNCTION get_cities_by_population(_population int) 
RETURNS TABLE (city_name text, city_population int)
AS $$
BEGIN

RETURN query SELECT city.name, city.population FROM city
WHERE city.population > _population;

END
$$
LANGUAGE plpgsql;

------- Get_Countries_by_Population
CREATE FUNCTION get_countries_by_population(_population int) 
RETURNS TABLE (country_name text, country_population bigint)
AS $$
BEGIN

RETURN query 
SELECT * FROM
(
SELECT country.name,
SUM(city.population) AS cntry_pop
FROM city, country
WHERE city.countryid = country.id
GROUP BY country.name
ORDER BY country.name

) AS inner_query
WHERE cntry_pop > _population;

END
$$
LANGUAGE plpgsql;

------- Functions_Tests
\echo '\nThis returns all cities for country: Denmark\n'
SELECT * FROM get_cities('Denmark');

\echo '\nThis returns all cities by predefined population over 80000\n'
SELECT * FROM get_cities_by_population(80000);

\echo '\nThis returns all countires by predefined population over 182000\n'
SELECT * FROM get_countries_by_population(182000);




