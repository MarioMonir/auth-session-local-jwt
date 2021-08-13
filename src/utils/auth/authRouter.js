const { Router } = require("express");
const router = Router();

const authController = require("./authController.js")

// serve static views
router.route("/signup").get(authController.signupGet);
router.route("/login").get(authController.loginGet);
router.route("/logout").get(authController.logoutGet);

// authenticate from database
router.route("/signup").post(authController.signupPost);
router.route("/login").post(authController.loginPost);



module.exports = router;
