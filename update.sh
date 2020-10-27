#!/bin/bash
psql --command "DROP TABLE students"
psql --command "CREATE TABLE students (
	first_name VARCHAR ( 25 ) NOT NULL,
	last_name VARCHAR ( 25 ) NOT NULL,
	id INT UNIQUE NOT NULL
);"
psql --command "INSERT INTO 
	students (first_name, last_name, id)
	VALUES
	('Leslie',	'Knope',	'43102'),
	('Tom',	'Haverford',	'73210'),
	('Ron',	'Swanson',	'24758');"
