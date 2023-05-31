const router = require("express").Router();
const { Pet } = require("../../models");

// @desc new pet
// route POST api/pets/
// @access private
router.post("/", async (req, res) => {
  try {
    const newPet = await Pet.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    if (!newPet) {
      res.status(400).json({
        message: `Error adding pet data with info provided. Please try again.`,
      });
      return;
    }

    res
      .status(200)
      .json({ message: `New pet data successfully added.`, newPet });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: `Error adding pet data to the database.`, err });
  }
});

// @desc edit pet
// route PUT api/pets/:id
// @access private
router.put("/:id", async (req, res) => {
  try {
    const editedPet = await Pet.update(req.body, {
      returning: true,
      where: { id: req.params.id },
    });

    if (!editedPet) {
      res
        .status(400)
        .json({ message: `Error updating pet data with the info provided.` });
      return;
    }

    res
      .status(200)
      .json({ message: `Successfully updated pet data.`, editedPet });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error updaing pet data on db.`, err });
  }
});

// @desc delete pet
// route DELETE api/pets/:id
// @access private
router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      res
        .status(400)
        .json({ message: `No pet with id ${req.params.id} was found.` });
      return;
    }

    await pet.destroy();

    res.status(200).json({ message: `Pet data successfully deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error deleting pet data on db.`, err });
  }
});

module.exports = router;