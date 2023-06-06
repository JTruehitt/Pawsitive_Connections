const router = require("express").Router();
const { User, Post, Comment, Pet } = require("../../models");
const withAuth = require('../../utils/auth');

// @desc get homepage
// route GET /
// @access public
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ["user_name"] },
        { model: Comment },
        { model: Pet },
      ],
    });
    if (!postData) {
      res.status(400).json({ message: `No posts to display.` });
    }

    const posts = postData.map((post) => {
      return post.get({ plain: true });
    });

    res.status(200).render("home", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Server encountered an error while attempting to render the page.`,
      err,
    });
  }
});

// @desc get login/signup page
// route GET /login
// @access public
router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/dashboard");
      return;
    }
    res.status(200).render("login", { layout: "login-layout" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: `Error loading login page. Please try again soon.` });
  }
});

// @desc get user dashboard
// route GET /dashboard
// @access private
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["user_name"],
          include: [
            {
              model: Pet,
              attributes: ["name", "image"],
            },
          ],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["user_name"],
              include: [
                {
                  model: Pet,
                  attributes: ["name", "image"],
                },
              ],
            },
          ],
          order: [["createdAt", "DESC"]],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const userData = await User.findByPk(req.session.user_id, { include: Pet });
    const user = userData.get({ plain: true });

    if (!postData) {
      res.status(404).json({ message: `You haven't made any posts yet!` });
      return;
    }

    const posts = postData.map((post) => {
      return post.get({ plain: true });
    });

    res.status(200).render("dashboard", {
      layout: "dashboard-layout",
      posts,
      user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error pulling user posts from db.` });
  }
});

// @desc get single post
// route GET /community-post/:id
// @access private
router.get("/community-post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name"],
          include: { model: Pet, attributes: ["name", "image"] },
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["user_name"],
              include: { model: Pet, attributes: ["name", "image"] },
            },
          ],
          order: [["createdAt", "DESC"]]
        },
      ],
    });

    if (!postData) {
      res.status(404).render("404");
      return;
    }

    const post = postData.get({ plain: true });

    const usersPost = post.user_id === req.session.user_id;
    
    res.status(200).render("view-community-post", {
      layout: "dashboard-layout",
      post,
      loggedIn: req.session.loggedIn,
      usersPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Error loading comment with id ${req.params.id} from database.`,
      err,
    });
  }
});

// @desc get new post view
// route GET /new-community-post
// @access private
router.get("/new-community-post", withAuth, async (req, res) => {
  try {
    res
      .status(200)
      .render("newcommunitypost", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Error loading new post form. Please try again later.`,
    });
  }
});

// @desc get edit post homepage
// route GET /edit-community-post/:id
// @access private, single user
router.get("/edit-community-post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(400).json({
        message: `Error loading post with id ${req.params.id}. Please try again later.`,
      });
      return;
    }

    const post = postData.get({ plain: true });

    res
      .status(200)
      .render("editcommunitypost", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Error loading edit post form. Please try again later.`,
    });
  }
});

router.get("/aboutus", async (req, res) => {
  try {
    res
      .status(200)
      .render("aboutus", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Error loading new post form. Please try again later.`,
    });
  }
});

module.exports = router;
