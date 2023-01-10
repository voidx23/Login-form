var express = require("express");
var router = express.Router();
var errormsg = null;

router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user, name: req.session.name });
  } else {
    res.redirect("/login");
  }
});

const credential =
  {
    email: "nihalmb23@gmail.com",
    password: "nihal@123",
    name: "Nihal Mohamed Bashir",
  }
  




router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("index", { title: "Login", err_msg: errormsg });
    errormsg = null;
  }
});


router.post("/login", (req, res) => {
 
    if (
      req.body.email == credential.email &&
      req.body.password == credential.password
    ) {
      flag = 0;
      req.session.user = req.body.email;
      req.session.name = credential.name;
      res.redirect("/login");
      
    } else {
    errormsg = "Invalid Email or Password";
    res.redirect("/login");
    }
});


router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send("Error");
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;