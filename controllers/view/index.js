const router = require("express").Router();
const homeRoutes = require("./home-routes");
const petRoutes = require("./pet-routes");
const marketRoutes = require("./marketplace-routes");

router.use("/", homeRoutes);
router.use("/pets", petRoutes);
router.use("/marketplace", marketRoutes);

module.exports = router;
