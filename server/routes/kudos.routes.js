const express = require("express");
const {
  handlePostKudos,
  getKudos,
  getTopKudosPerson,
  getTopBadges,
  handleLikeKudos,
} = require("../controllers/kudos.controller");
const router = express.Router();

router.post("/", handlePostKudos);
router.get("/", getKudos);
router.post("/liked", handleLikeKudos);
router.get("/topkudoperson", getTopKudosPerson);
router.get("/topbadges", getTopBadges);

module.exports = router;
