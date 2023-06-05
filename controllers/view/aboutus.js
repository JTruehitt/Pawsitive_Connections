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