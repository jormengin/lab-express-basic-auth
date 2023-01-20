const router = require("express").Router();
const isLoggedIn = require("../middlewares");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET private page */
router.get("/private", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  res.render("private", {user});
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  res.render("profile", {user});
});

module.exports = router;
