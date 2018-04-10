const express = require('express');
const Sequelize = require("Sequelize");
const sqlite3 = require('sqlite3').verbose();
const handlebars = require("express-handlebars").create({ defaultLayout: 'main' });

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
  storage: "./Chinook_Sqlite_AutoIncrementPKs.sqlite"
});

const app = express();

const db = new sqlite3.Database("./Chinook_Sqlite_AutoIncrementPKs.sqlite");

app.use(require("body-parser")());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');







app.listen( process.env.PORT || 3000, ()=>{
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
