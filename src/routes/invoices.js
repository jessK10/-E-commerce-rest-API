const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Invoices Page");
});

module.exports = router;
