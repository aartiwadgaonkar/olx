const router = require("express").Router();
const authController = require("./../controller/auth.controller");

router
  .post("/register-admin", authController.registerAdmin)
  .post("/login-admin", authController.loginAdmin)
  .post("/verify-admin-otp", authController.verifyOtp)
  .post("/logout-admin", authController.logoutAdmin);

module.exports = router;
