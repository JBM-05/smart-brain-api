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
// const postgres = knex({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     port: 5432,
//     user: "postgres",
//     password: "jbz306681",
//     database: "smart-brain",
//   },
// });
const postgres = knex({
  client: "pg",
  connection: "postgresql://smart_brain_db_syv4_user:pjCqEdSF9P2rPhDD5qjrB6hvQYhFjkHUF@dpg-cs3vd2bv2p9s73em51h0-a/render.com:5432/smart_brain_db_syv4", 
  ssl: {
    rejectUnauthorized: false, // Required for secure connection to Render
  },
});

app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
res.json("hi")
});
app.post("/signin", sigin.handleSigin(postgres, bcrypt));
app.post("/register", register.handleRegister(postgres, bcrypt));
app.get("/profile/:id", profile.handleProfile(postgres));
app.put("/image", image.handleImage(postgres));
app.listen(process.env.PORT || 3000, () => {
  console.log(`${process.env.PORT}`);
});
