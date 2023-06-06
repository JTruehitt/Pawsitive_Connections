const router = require("express").Router();
const { Comment } = require("../../models");

// @desc new comment
// route POST api/comment/
// @access private
router.post("/", async (req, res) => {
  try {
    const userInfo = {
      body: req.body.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    };

    const newComment = await Comment.create(userInfo);

    if (!newComment) {
      res.status(400).json({
        message: `Error posting comment with info provided. Please try again soon.`,
      });
      return;
    }

    res
      .status(200)
      .json({ message: `New comment successfully posted.`, newComment });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: `Error adding post to the database.`, err });
  }
});

// @desc edit comment
// route PUT api/comment/:id
// @access private
router.put("/:id", async (req, res) => {
  try {
    const editedComment = await Comment.update(
      { body: req.body.body },
      { returning: true, where: { id: req.params.id } }
    );

    if (!editedComment) {
      res
        .status(400)
        .json({ message: `Error updating comment with the info provided.` });
      return;
    }

    res
      .status(200)
      .json({ message: `Successfully updated comment.`, editedComment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error updaing comment on db.`, err });
  }
});

// @desc delete lot comment
// route DELETE api/comment/marketplace/:id
// @access private
router.delete("/marketplace/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      res
        .status(400)
        .json({ message: `No comment with id ${req.params.id} was found.` });
      return;
    }

    await comment.destroy();

    res.status(200).json({ message: `Comment successfully deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error deleting comment on db.`, err });
  }
});
// @desc delete comment
// route DELETE api/comment/:id
// @access private
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      res
        .status(400)
        .json({ message: `No comment with id ${req.params.id} was found.` });
      return;
    }

    await comment.destroy();

    res.status(200).json({ message: `Comment successfully deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error deleting comment on db.`, err });
  }
});

// MARKETPLACE
// @desc new comment on lot
// route POST api/comment/marketplace
// @access private
router.post("/marketplace", async (req, res) => {
  try {
    const userInfo = {
      body: req.body.body,
      user_id: req.session.user_id,
      lot_id: req.body.lot_id,
    };

    const newComment = await Comment.create(userInfo);

    if (!newComment) {
      res.status(400).json({
        message: `Error posting comment with info provided. Please try again soon.`,
      });
      return;
    }

    res
      .status(200)
      .json({ message: `New comment successfully posted.`, newComment });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: `Error adding post to the database.`, err });
  }
});

module.exports = router;
