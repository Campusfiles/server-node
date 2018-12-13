const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", (req, res) => {
  User.find({ email: req.body.email }).exec().then(user => {
      if (user.length >= 1) {
        return res.send({ status: 409, message: "Email already exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.send({ status: 500, error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user.save().then(data => {
              res.send({
                status: 200,
                data,
                message: "Success"
              });
            }).catch(err => {
              res.send({ status: 500, error: err });
            });
          }
        });
      }
    });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email }).exec().then(user => {
    if (user.length < 1) {
      return res.send({ status: 401, message: "Auth failed" });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.send({ status: 401, message: "Auth failed" });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {
              expiresIn: "1h"
          }
        );
        return res.send({
          status: 200,
          message: "Successfully Authenticated",
          token: token,
          data: user[0]
        });
      }
      res.send({ message: "Authentication failed", status: 401 });
    });
  }).catch(err => {
    console.log(err);
    res.send({ error: err, status: 500 });
  });
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId }).exec().then(result => {
    res.send({
      status: 200,
      message: "User deleted"
    });
  }).catch(err => {
    console.log(err);
    res.send({ error: err, status: 500 });
  });
});

module.exports = router;
