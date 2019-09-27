const User = require("./user");
const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
  
  if(req.session.userId){
    const users = await User.find();
    res.render("index", { users: users });
    return;
  }
  res.redirect("/login");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("new");
});

router.get("/logout", (req, res) => {
  req.session=null;
  res.redirect("/login");
});


router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.authenticate(email,password);
    if(user) {
      // Passwords match
      req.session.userId=user._id;
      return res.redirect("/");
    } else {
      // Passwords don't match
      res.render("/login",{error:"está mal"});
    } 
    
  } catch (e) {
    console.error(e);
  }
});

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  
  const data = {
    name: name,
    email: email,
    password: password
  };
  
  try {
    const user = await User.create(data);
    req.session.userId=user._id;
  } catch (e) {
    console.error(e);
  }
  res.redirect("/");
});

module.exports = router;
