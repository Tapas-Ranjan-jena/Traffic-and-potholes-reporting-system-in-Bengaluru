const express = require("express");
const router = express.Router();
const { testAPI } = require("../controllers/testControllers");

router.get("/", testAPI);

module.exports = router;
