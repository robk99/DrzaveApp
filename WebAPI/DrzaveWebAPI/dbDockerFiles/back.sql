--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- Name: get_cities_and_countries_with_greater_population_then(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_cities_and_countries_with_greater_population_then(_population integer) RETURNS TABLE(name text, population bigint)
    LANGUAGE plpgsql
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
$$;


ALTER FUNCTION public.get_cities_and_countries_with_greater_population_then(_population integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    name text NOT NULL,
    population integer,
    country_id integer
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: get_cities_by_country(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_cities_by_country(_country text) RETURNS SETOF public.cities
    LANGUAGE plpgsql
    AS $$
BEGIN

RETURN query SELECT * FROM cities WHERE country_id = 
(SELECT id from countries WHERE countries.name = _country);
IF NOT FOUND THEN
RETURN query SELECT * FROM cities;
END IF;

END
$$;


ALTER FUNCTION public.get_cities_by_country(_country text) OWNER TO postgres;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cities ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.countries ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20200114092101_InitialMigration	3.1.0
20200114205033_SnakeCaseSchema	3.1.0
20200121080659_NapravitiCascadeDelete	3.1.0
20200205195541_Prevesti modele na engleski i dodati LoginUser tablicu	3.1.0
20200206134740_Change LoginUser model to User	3.1.0
20200226194320_Dodati Id na Users	3.1.0
\.


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (id, name, population, country_id) FROM stdin;
1	Copenhagen	100250	1
2	Odense	67327	1
3	Berlin	88220	2
4	Bonn	76548	2
5	Aalen	79324	2
6	Stockholm	109859	3
7	Gothenburg	99508	3
8	Karlstad	66912	3
9	Uppsala	46983	3
10	Zagreb	100000	4
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name) FROM stdin;
1	Denmark
2	Germany
3	Sweden
4	Croatia
5	Serbia
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
1	admin	10000.ZpTmdTvKpwv+n8aOqwmbDg==.OYVnj50mjQgkqGLcVMlReWAfAWkPpCbGVKdU+oTnDKc=
\.


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_id_seq', 10, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: cities pk_cities; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT pk_cities PRIMARY KEY (id);


--
-- Name: countries pk_countries; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT pk_countries PRIMARY KEY (id);


--
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- Name: ix_cities_country_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_cities_country_id ON public.cities USING btree (country_id);


--
-- Name: cities fk_cities_countries_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT fk_cities_countries_country_id FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
