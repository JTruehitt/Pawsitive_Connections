const router = require("express").Router();
const { Lot } = require("../../models");

// @desc new lot
// route POST api/lot/
// @access private
router.post("/", async (req, res) => {
  try {
    const userInfo = {
      type: req.body.type,
      image: req.body.image,
      title: req.body.title,
      askingPrice: req.body.askingPrice,
      body: req.body.body,
      user_id: req.session.user_id,
    };

    const newLot = await Lot.create(userInfo);

    if (!newLot) {
      req
        .status(400)
        .json({ message: `Error with data passed to create Lot.` });
      return;
    }

    res
      .status(200)
      .json({ message: `New Lot created successfully.`, newLot });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error adding new lot to the db.`, err });
  }
});

// @desc delete lot
// route DELETE api/lot/:id
// @access private
router.delete("/:id", async (req, res) => {
  try {
    const lot = await Lot.findByPk(req.params.id);

    if (!lot) {
      res
        .status(400)
        .json({ message: `No lot with id ${req.params.id} was found.` });
      return;
    }

    await lot.destroy();

    res.status(200).json({ message: `Lot successfully deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error deleting post from the db.`, err });
  }
});
module.exports = router;