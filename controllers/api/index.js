const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const petRoutes = require("./pet-routes");
const lotRoutes = require("./lot-routes");
const bidRoutes = require("./bid-routes");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/pets", petRoutes);
router.use("/lot", lotRoutes);
router.use("/bid", bidRoutes);

module.exports = router;
