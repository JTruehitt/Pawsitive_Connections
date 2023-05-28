const router = require("express").Router();
const { User } = require("../../models");

// @desc new user sign up
// route POST api/user/signup
// @access public
router.post("/signup", async (req, res) => {
  try {
    const userInfo = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = userInfo.get({ plain: true });

    req.session.save(() => {
      (req.session.loggedIn = true), (req.session.user_id = newUser.id);
      req.session.user_name = newUser.user_name;

      req.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: `Error creating new user. Please try again later.` });
  }
});

// @desc returning user log in
// route POST api/user/login
// @access public
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_name: req.body.user_name },
    });

    if (!userData) {
      req.status(404).json({
        message: `Issue with username or password. Please correct your entry and try again.`,
      });
    }

    const passwordCheck = await userData.checkPassword(req.body.password);

    if (!passwordCheck) {
      res.status(400).json({
        message: `Issue with username or password. Please correct your entry and try again.`,
      });
    }

    const user = userData.get({ plain: true });
    req.session.save(() => {
      (req.session.loggedIn = true), (req.session.user_id = user.id);
      req.session.user_name = user.user_name;

      res
        .status(200)
        .json({ message: `User ${user.id} successfully logged in.` });
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: `Error logging in user. Please try again later.` });
  }
});

// @desc user log out
// route POST api/user/logout
// @access public
router.post("/logout", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: `Error logging out user. Please try again later.` });
  }
});

module.exports = router;
