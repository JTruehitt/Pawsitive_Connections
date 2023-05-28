const router = require("express").Router();
const { User, Post, Comment, Pet } = require("../../models");

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

    res.status(200).render("home", { posts });
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
      res.redirect("/dashbaord");
      return;
    }
    req.render("login");
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
router.get("/dashboard", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });

    if (!postData) {
      res.status(404).json({ message: `You haven't made any posts yet!` });
      return;
    }

    const posts = postData.map((post) => {
      return post.get({ plain: true });
    });

    res
      .status(200)
      .render("dashboard", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error pulling user posts from db.` });
  }
});

// @desc get single post
// route GET /community-post/:id
// @access private
router.get("/community-post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).render("404");
      return;
    }

    const post = postData.get({ plain: true });

    let usersPost;
    post.user_id === req.session.user_id
      ? (usersPost = true)
      : (usersPost = false);

    res.status(200).render("viewcommunitypost", {
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
router.get("/new-community-post", async (req, res) => {
  try {
    res.status(200).render("newcommunitypost");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        message: `Error loading new post form. Please try again later.`,
      });
  }
});

// @desc get edit post homepage
// route GET /edit-community-post/:id
// @access private, single user
router.get('/edit-community-post', async (req, res) => {
  try {
    res.status(200).render('editcommunitypost');
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        message: `Error loading edit post form. Please try again later.`,
      });
  }
})

module.exports = router;
