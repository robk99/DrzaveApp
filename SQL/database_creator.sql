-- \c postgres;

-- Resetting database to default state
DELETE FROM cities;
DELETE FROM countries;
DELETE FROM login_users

ALTER SEQUENCE "countries_Id_seq" RESTART WITH 1;
ALTER SEQUENCE "cities_Id_seq" RESTART WITH 1;

DROP FUNCTION get_cities_by_country(TEXT);
DROP FUNCTION vrati_cities_i_countries_vece_od(INT);


-- Popunjavanje baze
INSERT INTO public.countries (name) VALUES ('Denmark');
INSERT INTO public.countries (name) VALUES ('Germany');
INSERT INTO public.countries (name) VALUES ('Sweden');

INSERT INTO public.cities(name, population, country_id) VALUES ('Copenhagen', 100250, 1);
INSERT INTO public.cities(name, population, country_id) VALUES ('Odense', 67327, 1);

INSERT INTO public.cities(name, population, country_id) VALUES ('Berlin', 88220, 2);
INSERT INTO public.cities(name, population, country_id) VALUES ('Bonn', 76548, 2);
INSERT INTO public.cities(name, population, country_id) VALUES ('Aalen', 79324, 2);

INSERT INTO public.cities(name, population, country_id) VALUES ('Stockholm', 109859, 3);
INSERT INTO public.cities(name, population, country_id) VALUES ('Gothenburg', 99508, 3);
INSERT INTO public.cities(name, population, country_id) VALUES ('Karlstad', 66912, 3);
INSERT INTO public.cities(name, population, country_id) VALUES ('Uppsala', 46983, 3);


--Functions:
-- GET CITY BY COUNTRY ID
CREATE FUNCTION get_cities_by_country(_country TEXT) 
RETURNS SETOF cities
AS $$
BEGIN

RETURN query SELECT * FROM cities WHERE country_id = 
(SELECT id from countries WHERE countries.name = _country);
IF NOT FOUND THEN
RETURN query SELECT * FROM cities;
END IF;

END
$$
LANGUAGE plpgsql;

-- GET CITIES AND COUNTRIES BY PREDEFINED POPULATION
CREATE FUNCTION get_cities_and_countries_with_greater_population_then(_population int) 
RETURNS TABLE (name TEXT, population bigint) 
AS $$
BEGIN

RETURN query (
SELECT cities.name, cities.population FROM cities
WHERE cities.population > _population
UNION ALL
SELECT * FROM
(
SELECT countries.name,
SUM(cities.population) AS countries_population
FROM cities, countries
WHERE cities.country_id = countries.id  
GROUP BY countries.name
ORDER BY countries.name
) AS inner_query
WHERE countries_population > _population );


END
$$
LANGUAGE plpgsql;


--Test functions:
\echo '\nFunction returns all cities by predefined country Id: Denmark\n'
SELECT * FROM get_cities_by_country('Denmark');

\echo '\nFunction returns all cities and countries that have population over: 80000\n'
SELECT * FROM get_cities_and_countries_with_greater_population_then(80000);







