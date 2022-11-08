require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json())


const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { getUsers, getUserById, postUsers, putUsers, deleteUsers} = require("./userHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.post("/api/users",postUsers);
app.put("/api/users/:id", putUsers);
app.delete("/api/users/:id", deleteUsers);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
