const router = require("express").Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User.model');

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', async function (req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      res.render('auth/signup', { error: 'All fields are necessary.' });
      return;
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res.render('auth/signup', { error: 'Password needs to contain at least 6 characters, one number, one lowercase and one uppercase letter.' });
      return;
    }
    // const regexEmail = /^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    // if (!regexEmail.test(email)) {
    //   res.render('auth/signup', { error: 'Please add a valid email' });
    //   return;
    // }
    try {
      const userInDB = await User.findOne({ username: username });
      if (userInDB) {
        res.render('auth/signup', { error: `There already is a user with username ${username}` });
        return;
      } else {
        const salt = await bcrypt.genSalt(saltRounds);
        // const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ username, hashedPassword });
        // res.render('auth/profile', user);
      }
    } catch (error) {
      next(error)
    }
  });

  



module.exports = router;
