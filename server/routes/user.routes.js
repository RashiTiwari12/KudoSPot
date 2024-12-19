const express = require("express");
const { handleUserLogin } = require("../controllers/user.controller");
const router = express.Router();

router.post("/", handleUserLogin);
module.exports = router;
