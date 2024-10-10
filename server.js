const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const knex = require("knex");
const sigin = require("./controllers/singin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const postgres = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "jbz306681",
    database: "smart-brain",
  },
});

app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {

});
app.post("/signin", sigin.handleSigin(postgres, bcrypt));
app.post("/register", register.handleRegister(postgres, bcrypt));
app.get("/profile/:id", profile.handleProfile(postgres));
app.put("/image", image.handleImage(postgres));
app.listen(3000, () => {
  console.log("yo pal");
});
