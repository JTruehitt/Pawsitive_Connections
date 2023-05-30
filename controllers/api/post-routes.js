const router = require("express").Router();
const { Post } = require("../../models");

// @desc new post
// route POST api/post/
// @access private
router.post("/", async (req, res) => {
  try {
    const userInfo = {
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    };

    const newPost = await Post.create(userInfo);

    if (!newPost) {
      req
        .status(400)
        .json({ message: `Error with data passed to create post.` });
      return;
    }

    res
      .status(200)
      .json({ message: `New post created successfully.`, newPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesasge: `Error adding new post to the db.`, err });
  }
});

// @desc edit post
// route PUT api/post/:id
// @access private
router.put("/:id", async (req, res) => {
  try {
    const editedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!editedPost) {
      res.status(400).json({
        message: `Error editing post with info provided. Please check entries and try again.`,
      });
      return;
    }

    res.status(200).json({ message: `Post updated successfully.`, editedPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error updatiing post on db.`, err });
  }
});

// @desc delete post
// route DELETE api/post/:id
// @access private
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      res
        .status(400)
        .json({ message: `No post with id ${req.params.id} was found.` });
      return;
    }

    await post.destroy();

    res.status(200).json({ message: `Post successfully deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error deleting post from the db.`, err });
  }
});

module.exports = router;
