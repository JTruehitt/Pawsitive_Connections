const router = require("express").Router();
const { Bid } = require("../../models");

// @desc new bid
// route POST api/bid/
// @access private
router.post("/", async (req, res) => {
  try {
    const userInfo = {
      bidAmount: req.body.bidAmount,
      user_id: req.session.user_id,
      lot_id: req.body.lot_id,
    };

    const newBid = await Bid.create(userInfo);

    if (!newBid) {
      res.status(400).json({
        message: `Error posting bid with info provided. Please try again soon.`,
      });
      return;
    }

    res.status(200).json({ message: `New bid successfully posted.`, newBid });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error adding bid to the database.`, err });
  }
});

module.exports = router;
