const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const knex = require("knex");

// Import controllers
const sigin = require("./controllers/singin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// Setup knex connection to PostgreSQL database hosted on Render
const postgres = knex({
  client: "pg",
  connection: {
    host: "dpg-cs3vd2bv2p9s73em51h0-a.oregon-postgres.render.com",
    port: 5432,
    user: "smart_brain_db_syv4_user",
    password: "pjCqEdSF9P2PhDD5qjrB6hvQYhFjkHUF",
    database: "smart_brain_db_syv4",
  },
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Basic endpoint to test server
app.get("/", async (req, res) => {
  try {
    const result = await postgres.raw("SELECT NOW()");
    res.json({ message: "Database connected successfully", time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ message: "Database connection failed", error: err });
  }
});

// Routes
app.post("/signin", sigin.handleSigin(postgres, bcrypt));
app.post("/register", register.handleRegister(postgres, bcrypt));
app.get("/profile/:id", profile.handleProfile(postgres));
app.put("/image", image.handleImage(postgres));

// Server listener
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
