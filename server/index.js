require("dotenv").config();
const express = require("express");
const { webpack } = require("webpack");
const path = require("path");
const { findOrCreate } = require("./auth/authFunctions");
const passport = require("passport");
const authRouter = require("./auth/authRouter");
const apiRouter = require("./api/apiRouter");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
require('./auth/boot')()
app.use(express.json())
app.use(express.urlencoded())
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


if (process.env.NODE_ENV === "development") {
  console.log("Compiling for development environment");

  const middleware = require("webpack-dev-middleware");
  const compiler = webpack(require("../webpack.config"));
  app.use(middleware(compiler));
  app.use(require("webpack-hot-middleware")(compiler));
}

app.use('/login', authRouter)
app.get('/logout', (req, res) => {
    //console.log(req.session)
    req.logout()
    res.redirect('/')
})

app.use('/api', apiRouter)

//for all else, resend html document
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../src/index.html"));
});
app.listen(3000);
