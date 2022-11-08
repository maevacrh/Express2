
const database = require("./database")

const getUsers = (req, res) => {
    database.query("SELECT * FROM users")
    .then(i => {
        res.status(200).json(i[0])
    })
}

const postUsers = (req, res) => {
  const body = req.body;
  database
    .query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?,?,?,?,?)", [
      body.firstname,
      body.lastname,
      body.email,
      body.city,
      body.language
    ])
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const putUsers = (req, res) => {
  database
    .query("UPDATE users SET ? WHERE id= ?", [
      req.body,
      req.params.id
    ])
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("SELECT * FROM users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };
module.exports = {getUsers,getUserById, postUsers, putUsers};