require("dotenv").config();
const express = require("express");
const cors = require("cors");
const parserCookie = require("cookie-parser");

const connectDatabase = require("./db/conn");

const AuthRoute = require("./routes/auth.route");
const UsersRoute = require("./routes/user.route");

const app = express();

const port = process.env.API_APP_PORT || 5000;

connectDatabase();
app.use(parserCookie());
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRoute);
app.use("/users", UsersRoute);

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
