# home-service

## Setup
* `git clone https://github.com/mangostein/home-service.git`
* Install MySQL v5.6+
* Create a database ex. `CREATE DATABASE home CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
* `USE home;`
* Create a db user for running migrations with all privileges
`CREATE USER 'migrate'@'localhost' IDENTIFIED BY 'password';`
`GRANT ALL PRIVILEGES ON *.* TO 'migrate'@'localhost';`
* Create a db user for the application with SELECT, INSERT, UPDATE, DELETE privileges
`CREATE USER 'app'@'localhost' IDENTIFIED BY 'password';`
`GRANT SELECT,INSERT,UPDATE,DELETE ON *.* TO 'app'@'localhost';`
* This repo contains a db-migrate.json.example which should be used to create a db-migrate.json config file which contains db connection info for the database migrator (you will need to run `npm install db-migrate-mysql`, `npm install -g db-migrate` and `npm install -g db-migrate-mysql` before the db-migrate postinstall will work)
* The repo also contains a development.json.exampele file which should be used to create a real development.json config file
* `npm i` will run all db migrations and install all node packages
* `node src/server.js`
