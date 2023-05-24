const router = require("express").Router();

// @desc get homepage
// route GET /
// @access public
router.get("/", async (req, res) => {
  try {
    res.status(200).render("home");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Server encountered an error while attempting to render the page.`,
      err,
    });
  }
});


module.exports = router;