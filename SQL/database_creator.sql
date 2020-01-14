-- \c postgres;

-- Resetiranje baze na pocetno stanje
DELETE FROM gradovi;
DELETE FROM drzave;

ALTER SEQUENCE "Drzave_Id_seq" RESTART WITH 1;
ALTER SEQUENCE "Gradovi_Id_seq" RESTART WITH 1;

DROP FUNCTION vrati_gradove_po_drzavi(TEXT);
DROP FUNCTION vrati_gradove_i_drzave_vece_od(INT);


-- Popunjavanje baze
INSERT INTO public.drzave (ime) VALUES ('Danska');
INSERT INTO public.drzave (ime) VALUES ('Njemacka');
INSERT INTO public.drzave (ime) VALUES ('Svedska');

INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Copenhagen', 100250, 1);
INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Odense', 67327, 1);

INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Berlin', 88220, 2);
INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Bonn', 76548, 2);
INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Aalen', 79324, 2);

INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Stockholm', 109859, 3);
INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Gothenburg', 99508, 3);
INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Karlstad', 66912, 3);
INSERT INTO public.gradovi(ime, populacija, drzava_id) VALUES ('Uppsala', 46983, 3);


--Funkcije:
-- VRACANJE GRADOVA PO DEFINIRANOJ DRZAVI
CREATE FUNCTION vrati_gradove_po_drzavi(_drzava TEXT) 
RETURNS SETOF gradovi
AS $$
BEGIN

RETURN query SELECT * FROM gradovi WHERE drzava_id = 
(SELECT id from drzave WHERE drzave.ime = _drzava);
IF NOT FOUND THEN
RETURN query SELECT * FROM gradovi;
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
SELECT gradovi.ime, gradovi.populacija FROM gradovi
WHERE gradovi.populacija > _populacija
UNION ALL
SELECT * FROM
(
SELECT drzave.ime,
SUM(gradovi.populacija) AS drzave_populacija
FROM gradovi, drzave
WHERE gradovi.drzava_id = drzave.id  
GROUP BY drzave.ime
ORDER BY drzave.ime
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







