CREATE USER 'compelec'@'localhost' identified by 'compelec';
GRANT SELECT ON `Direcciones`.* TO 'compelec'@'localhost';
GRANT INSERT ON Personal.COMPELECPERIODOSOPCIONES TO 'compelec'@'localhost';
GRANT SELECT ON Personal.* TO 'compelec'@'localhost';
GRANT SELECT ON Personas.* TO 'compelec'@'localhost';

GRANT INSERT,UPDATE ON Personal.COMPELECPERIODOS TO 'compelec'@'localhost';

GRANT INSERT,UPDATE ON Personal.INASLICHABER TO 'compelec'@'localhost';
GRANT INSERT,UPDATE ON Personal.NUMERADOR TO 'compelec'@'localhost';

