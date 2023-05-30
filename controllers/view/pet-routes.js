const router = require("express").Router();
const { Pet, User } = require("../../models");

// @desc get view of one pet with id of :id
// route GET /pets/view/:id
// @access public
router.get("/view/:id", async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id);

    if (!petData) {
      res
        .status(404)
        .json({ message: `No pet with an id of ${req.params.id} was found.` });
      return;
    }

    const pet = petData.get({ plain: true });

    const userPet = pet.user_id === req.session.user_id ? true : false;

    res
      .status(200)
      .render("viewpet", { pet, loggedIn: req.session.loggedIn, userPet });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: `Error getting pet info from the db.`, err });
  }
});

// @desc get view all pets of user with id of :id
// route GET /pets/view-all/:id
// @access public
router.get("/view-all/:id", async (req, res) => {
  try {
    const petData = await Pet.findAll({ where: { user_id: req.params.id } });

    if (!petData) {
      res
        .status(404)
        .json({ message: `No pets assoiciated with user ${req.params.id}` });
      return;
    }

    const pets = petData.map((pet) => {
      return pet.get({ plain: true });
    });

    const userPets = req.session.user_id == req.params.id ? true : false;

    res.status(200).render("viewallpets", { pets, userPets });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error retreiving pet info from db.` });
  }
});

// @desc get add pet page
// route GET /pets/add-pet
// @access private
router.get("/add-pet", async (req, res) => {
  try {
    res.status(200).render("addpet", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Error loading form to add pet. Please try again later.`,
    });
  }
});

// @desc get edit pet page
// route GET /pets/edit-pet
// @access private
router.get("/edit-pet/:id", async (req, res) => {
  try {
    const petInfo = await Pet.findByPk(req.params.id);
    if (!petInfo) {
      res
        .status(404)
        .json({ message: `No pet with id ${req.params.id} found.` });
    }
    const pet = petInfo.get({ plain: true });
    res.status(200).render("editpet", { pet, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Error loading form to add pet. Please try again later.`,
    });
  }
});

module.exports = router;
