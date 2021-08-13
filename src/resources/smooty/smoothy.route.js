const { Router } = require("express");
const router = Router();

router.route("/").get((req, res, next) => {
    try {
        res.render("smoothies");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
