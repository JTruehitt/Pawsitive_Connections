const router = require("express").Router();

const view = require("./view");
const api = require("./api");

router.use("/", view);
router.use("/api", api);

module.exports = router;
