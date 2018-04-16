const express = require('express');
const Sequelize = require("Sequelize");
const sqlite3 = require('sqlite3').verbose();
const handlebars = require("express-handlebars").create({
  defaultLayout: 'main'
});

const sequelize = new Sequelize('database', 'username', null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: "./Chinook_Sqlite_AutoIncrementPKs.sqlite"
});

const app = express();

const db = new sqlite3.Database("./Chinook_Sqlite_AutoIncrementPKs.sqlite");

app.use(require("body-parser")());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



const Artist = sequelize.define(
  "Artist", {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });

const Album = sequelize.define(
  "Album", {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Title: Sequelize.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });

// app.get('/view', (req, res) => {
//   const query = `SELECT Artist.Name as Artist, Album.Title as Album FROM Artist JOIN Album WHERE Artist.ArtistId=Album.ArtistId LIMIT 1000`;
//   let resultsArray = [];


Artist.hasMany(Album, {foreignKey: 'ArtistId'});
Album.belongsTo(Artist, {foreignKey: 'ArtistId'});
  app.get('/', (req, res) => {
    Album.findAll({
        include: [
            {
                model: Artist
            }
        ]
    }).then(albums => {
        res.render('view', {results: albums})
    });
});
//   db.each(query, (err, row) => {
//     if (err) throw err;
//     // console.log(row);
//     resultsArray.push(row);
//   });
//   res.render('view', {
//     results: resultsArray
//   });
// });


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
