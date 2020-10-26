#!/bin/bash
mkdir -p /var/run/postgresql/9.6-main.pg_stat_tmp
chown postgres.postgres /var/run/postgresql/9.6-main.pg_stat_tmp -R
chown -R postgres:postgres /var/run/postgresql
su -c "nohup /usr/lib/postgresql/9.6/bin/postgres -D /var/lib/postgresql/9.6/main -c config_file=/etc/postgresql/9.6/main/postgresql.conf > /dev/null 2>&1 &" postgres
sleep 5