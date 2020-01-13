-- \c postgres;

-- Resetiranje baze na pocetno stanje
DELETE FROM "Gradovi";
DELETE FROM "Drzave";

ALTER SEQUENCE "Drzave_Id_seq" RESTART WITH 1;
ALTER SEQUENCE "Gradovi_Id_seq" RESTART WITH 1;

DROP FUNCTION vrati_gradove_po_drzavi(TEXT);
DROP FUNCTION vrati_gradove_i_drzave_vece_od(INT);


-- Popunjavanje baze
INSERT INTO public."Drzave" ("Ime") VALUES ('Danska');
INSERT INTO public."Drzave" ("Ime") VALUES ('Njemacka');
INSERT INTO public."Drzave" ("Ime") VALUES ('Svedska');

INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Copenhagen', 100250, 1);
INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Odense', 67327, 1);

INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Berlin', 88220, 2);
INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Bonn', 76548, 2);
INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Aalen', 79324, 2);

INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Stockholm', 109859, 3);
INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Gothenburg', 99508, 3);
INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Karlstad', 66912, 3);
INSERT INTO public."Gradovi"("Ime", "Populacija", "DrzavaId") VALUES ('Uppsala', 46983, 3);


--Funkcije:
-- VRACANJE GRADOVA PO DEFINIRANOJ DRZAVI
CREATE FUNCTION vrati_gradove_po_drzavi(_drzava TEXT) 
RETURNS SETOF "Gradovi"
AS $$
BEGIN

RETURN query SELECT * FROM "Gradovi" WHERE "DrzavaId" = 
(SELECT "Id" from "Drzave" WHERE "Drzave"."Ime" = _drzava);
IF NOT FOUND THEN
RETURN query SELECT * FROM "Gradovi";
END IF;

END
$$
LANGUAGE plpgsql;

-- VRACANJE GRADOVA I DRZAVA PO DEFINIRANOJ POPULACIJI
CREATE FUNCTION vrati_gradove_i_drzave_vece_od(_populacija int) 
RETURNS TABLE (Ime TEXT, Populacija bigint) 
AS $$
BEGIN

RETURN query (
SELECT "Gradovi"."Ime", "Gradovi"."Populacija" FROM "Gradovi"
WHERE "Gradovi"."Populacija" > _populacija
UNION ALL
SELECT * FROM
(
SELECT "Drzave"."Ime",
SUM("Gradovi"."Populacija") AS drzave_populacija
FROM "Gradovi", "Drzave"
WHERE "Gradovi"."DrzavaId" = "Drzave"."Id"  
GROUP BY "Drzave"."Ime"
ORDER BY "Drzave"."Ime"
) AS inner_query
WHERE drzave_populacija > _populacija );


END
$$
LANGUAGE plpgsql;


-- Testovi funkcija:
\echo '\nFunkcija vraca sve gradove prema unaprijed definiranoj drzavi: Danska\n'
SELECT * FROM vrati_gradove_po_drzavi('Danska');

\echo '\nFunkcija vraca sve gradove i drzave koji imaju populaciju vecu od: 80000\n'
SELECT * FROM vrati_gradove_i_drzave_vece_od(80000);







