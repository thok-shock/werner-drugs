const express = require("express");
const {
  getSideEffectByName,
  createSideEffect,
  getAllSideEffects,
} = require("./sideEffectsFunctions");

const sideEffectsRouter = express.Router();

sideEffectsRouter.get("/", (req, res, next) => {
  getAllSideEffects()
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      next(err);
    });
});

sideEffectsRouter.get("/:name", (req, res, next) => {
  getSideEffectByName(req.params.name)
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      next(err);
    });
});

sideEffectsRouter.post("/:name", (req, res, next) => {
  if (!req.params.name || !req.body || !req.body.description) {
    res.sendStatus(400);
  } else {
    createSideEffect(req.params.name, req.body.description)
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        next(err);
      });
  }
});

module.exports = { sideEffectsRouter };
