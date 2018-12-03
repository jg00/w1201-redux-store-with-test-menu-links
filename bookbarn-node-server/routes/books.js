const express = require("express");
const pgp = require("pg-promise")();
const connectionString = "postgresql://localhost:5432/bookbarn";
const db = pgp(connectionString);
// const dbObj = require("../app");
// const db = dbObj.db;
const router = express.Router();

// "/api/books"  --      FIX DB CONNECTION NEEDS TO BE PASSED
router.post("/add", (req, res) => {
  //   console.log(req.body);
  //   res.send("test");
  //   res.send(req.body);

  let title = req.body.title;
  let genre = req.body.genre;

  let sql = "INSERT INTO books (title, genre) values ($1, $2) RETURNING bookid";
  db.one(sql, [title, genre])
    .then(data => {
      res.json({ bookid: data.bookid });
    })
    .catch(error => {
      res.json({ message: "Insert book failed: ", error });
    });
});

module.exports = router;
