#!/bin/bash
su -c 'psql --command "DROP TABLE students"' postgres
su -c 'psql --command "CREATE TABLE students (
	first_name VARCHAR ( 25 ) NOT NULL,
	last_name VARCHAR ( 25 ) NOT NULL,
	id INT UNIQUE NOT NULL
);"' postgres
su -c 'psql postgres < outfile' postgres
