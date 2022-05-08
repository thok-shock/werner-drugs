const express = require("express");
const passport = require("passport");

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", 'email'] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/google" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = authRouter