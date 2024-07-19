// admin register
// admin login
// admin verify otp
// admin logout

// user register
// user verify otp
// user login
// user logout

const asyncHandler = require("express-async-handler");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { checkEmpty } = require("../utils/checkEmpty");
const Admin = require("../models/Admin");
const sendEmail = require("../utils/email");
exports.registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { isError, error } = checkEmpty({ name, email, password });
  if (isError) {
    return res.status(400).json({ message: "admin register success", error });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "invalid email" });
  }
  //    if (!validator.isStrongPassword(password)) {
  //     return res.status(400).json({message:"provide strong password"})
  //    }
  const isFound = await Admin.findOne({ email });
  if (isFound) {
    return res.status(400).json({ message: "email aleready register with us" });
  }
  const hash = await bcrypt.hash(password, 10);
  await Admin.create({ name, email, password: hash });
  res.json({ message: "register succes" });
});

// exports.loginAdmin = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const { isError, error } = checkEmpty({ email, password });
//   if (isError) {
//     return res.status(401).json({ message: "All feilds requiredd", error });
//   }
//   if (!validator.isEmail(email)) {
//     return res
//       .status(401)
//       .json({
//         message:
//           process.env.NODE_ENV === "development"
//             ? "invalid email"
//             : "Invalid Credentials",
//       });
//   }
//   const result = await Admin.findOne({ email });
//   if (!result) {
//     return res
//       .status(401)
//       .json({
//         message:
//           process.env.NODE_ENV === "development"
//             ? "email not found"
//             : "Invalid Credentials",
//       });
//   }
//   const isVerify = await bcrypt.compare(password, result.password);
//   if (!isVerify) {
//     return res
//       .status(401)
//       .json({
//         message:
//           process.env.NODE_ENV === "development"
//             ? "Invalid Password"
//             : "Invalid Credentials",
//       });
//   }
//   const otp = Math.floor(10000 + Math.random() * 900000);
//   await Admin.findByIdAndUpdate(result._id, { otp });
//   await sendEmail({
//     to: email,
//     subject: "login otp",
//     message: `<h1>Do not Share your accout Otp</h1> <p>your login otp ${otp}`,
//   });
//   res.json({
//     message: "Credential verify success. OTP send to your registered email",
//   });
// });

exports.loginAdmin = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   const { isError, error } = checkEmpty({ email, password })
   if (isError) {
       return res.status(401).json({ message: "All Feild Require", error })
   }
   if (!validator.isEmail(email)) {
       return res.status(401).json({ message: "Invalid Email" })
   }
   const result = await Admin.findOne({ email })
   if (!result) {
       console.log(req.body);
       console.log(result);
       return res.status(401).json({
           message: process.env.NODE_ENV === "devolopment" ?
               "Invalid Email" : "Invalid Credientials"
       })
   }
   const isVerify = await bcrypt.compare(password, result.password)
   if (!isVerify) {
       return res.status(401).json({
           message: process.env.NODE_ENV === "devolopment" ?
               "Invalid Password" : "Invalid Credientials"
       })
   }
   // send OTP
   const otp = Math.floor(10000 + Math.random() * 900000)   //pakage:nanoid

   await Admin.findByIdAndUpdate(result._id, { otp })
   await sendEmail({
          to: email,
          subject: "login otp",
          message: `<h1>Do not Share your accout Otp</h1> <p>your login otp ${otp}`,
        });
   res.json({ message: "Creditials Verify Success.OTP Send to Your Register email " })

})