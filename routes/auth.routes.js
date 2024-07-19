const router =require("express").Router()
const authController =require("./../controller/auth.controller")

router.post("/register-admin",authController.registerAdmin);
// .post("/login-admin",authController.loginAdmin)
router.post('/login', authController.loginAdmin);


module.exports=router