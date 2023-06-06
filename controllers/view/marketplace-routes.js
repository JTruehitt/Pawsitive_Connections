const router = require("express").Router();
const { User, Post, Comment, Pet, Bid, Lot } = require("../../models");
const withAuth = require("../../utils/auth");

// @desc get main marketplace
// route GET /marketplace
// @access private
router.get("/", withAuth, async (req, res) => {
  try {
    const lotData = await Lot.findAll({
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
        {
          model: Bid,
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

    if (!lotData) {
      res.status(404).json({ message: `You haven't made any lots yet!` });
      return;
    }

    const lots = lotData.map((lot) => {
      return lot.get({ plain: true });
    });

    res.status(200).render("marketplace", {
      layout: "dashboard-layout",
      lots,
      user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("Error getting to the marketplace. Please try again later. ");
  }
});

// @desc get one lot
// route GET /marketplace/lot/:id
// @access private
router.get("/lot/:id", withAuth, async (req, res) => {
  try {
    const lotData = await Lot.findByPk(req.params.id, {
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
          order: [["createdAt", "DESC"]],
        },
        {
          model: Bid,
          include: [
            {
              model: User,
              attributes: ["user_name"],
              include: { model: Pet, attributes: ["name", "image"] },
            },
          ],
          order: [["bidAmount", "DESC"]],
        },
      ],
    });

    if (!lotData) {
      // res.status(404).render("404", { layout: "404errorpage" });
      res.status(404).json(lotData)
      return;
    }
    console.log(lotData[0])
    const lot = lotData.get({ plain: true });

    lot.deletable = lot.user_id === req.session.user_id;
    lot.comments.forEach((comment) => {
      comment.deletable = comment.user_id === req.session.user_id;
    });
    lot.bids.forEach((bid) => {
      bid.deletable = bid.user_id === req.session.user_id;
    });
    console.log(lot.bids)

    res.status(200).render("view-lot", {
      layout: "dashboard-layout",
      lot,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("Error getting to the marketplace. Please try again later. ");
  }
});

// @desc get new lot view
// route GET marketplace/new-lot
// @access private
router.get("/new-lot", withAuth, async (req, res) => {
    try {
      res
        .status(200)
        .render("new-lot", { layout: 'dashboard-layout', loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Error loading new post form. Please try again later.`,
      });
    }
  });

module.exports = router;
