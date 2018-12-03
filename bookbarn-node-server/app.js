const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pgp = require("pg-promise")();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const books = require("./routes/books");

const app = express();
const connectionString = "postgresql://localhost:5432/bookbarn";
const db = pgp(connectionString);

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/books", authorizationMiddleware, books);

app.post("/api/user/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  bcrypt.hash(password, 10, (err, hash) => {
    if (hash) {
      console.log(hash);
      let sql =
        "INSERT INTO users (username, password) values ($1, $2) RETURNING userid";
      db.one(sql, [username, hash])
        .then(data => {
          res.json({ userid: data.userid });
        })
        .catch(error => {
          res.json({ message: "Register user failed: ", error });
        });
    }
  });
});

app.post("/api/user/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  // Find if username exists in db.  If not then catch user does not exists
  let sql =
    "SELECT userid, username, password FROM users where username = ($1)";
  db.one(sql, [username])
    .then(data => {
      // console.log(data);

      // If user exists
      if (data) {
        let persistedUser = data;

        // check for the password
        bcrypt.compare(password, persistedUser.password, (error, result) => {
          // password match
          if (result) {
            // create a token
            const token = jwt.sign(
              { username: persistedUser.username },
              "well well well"
            );

            // send back the token to the user
            res.json({ token: token });
          } else {
            // password dont match
            res.json({
              success: false,
              message: "Password incorrect"
            });
          }
        });
      }
    })
    .catch(error => {
      res.json({
        message: `Login user failed for username ${username}`,
        error
      });
    });
});

app.listen(PORT, () => {
  console.log("Server started");
});

// only for routes that will need to add/modify the db
// app.use((req, res, next) => {
function authorizationMiddleware(req, res, next) {
  console.log("Authorized", req.body);

  // authorization should be lower case
  let authorizationHeader = req.headers["authorization"];

  // Bearer eyJhbGciOiJIUzI1NiI...
  console.log(authorizationHeader.split(" ")[1]);

  if (authorizationHeader.split(" ")[1] === "undefined") {
    res.status(400).json({ error: "Authorization failed! Token undefined" });
    return;
  }

  // Bearer token
  const token = authorizationHeader.split(" ")[1]; // token
  // console.log("after bearer:", token);
  // console.log(typeof token);

  try {
    const decoded = jwt.verify(token, "well well well");

    if (decoded) {
      let username = decoded.username;
      console.log("decoded:", username);

      // This may be where we need to check if user exists
      // and have some type of role that authorize them to access certain routes (my notes)

      // Find if username exists in db.  If not then catch user does not exists
      // Removed password
      let sql = "SELECT userid, username FROM users where username = ($1)";
      db.one(sql, [username])
        .then(data => {
          // console.log(data);

          // If user exists
          if (data) {
            let persistedUser = data;
            console.log("persitedUser:", data);

            if (persistedUser) {
              console.log(
                "---Give user access to route(s) - ie add/modify books -----"
              );
              next(); // next middleware if token and user exits
            }
          }
        })
        .catch(error => {
          res.status(400).json({
            message: "User does not exists in db",
            error
          });
        });
    }
  } catch (error) {
    res.status(400).json({ error: "Authorization failed!  Token not valid" });
  }
}
