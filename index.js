const express = require('express');
const Sequelize = require("Sequelize");
const sqlite3 = require('sqlite3').verbose();
const handlebars = require("express-handlebars").create({ defaultLayout: 'main' });

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: "./Chinook_Sqlite_AutoIncrementPKs.sqlite"
});

const app = express();

const db = new sqlite3.Database("./Chinook_Sqlite_AutoIncrementPKs.sqlite");

app.use(require("body-parser")());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



app.get('/view', (req, res) => {
    const query = `SELECT Artist.Name as Artist, Album.Title as Album FROM Artist JOIN Album WHERE Artist.ArtistId=Album.ArtistId LIMIT 1000`;
    let resultsArray = [];
    db.each(query, (err, row) => {
        if (err) throw err;
        // console.log(row);
        resultsArray.push(row);
      });
    res.render('view', {results: resultsArray});
});



const Artist = sequelize.define(
  "Artist",
  {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);



app.listen( process.env.PORT || 3000, ()=>{
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
