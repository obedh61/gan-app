const express = require('express')
// import controller
const { signup, accountActivation, signin, forgotPassword, resetPassword, googleLogin } = require('../controllers/auth')
// import validators
const { userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth')
const { runValidation } = require('../validators')
const router = express.Router()

router.post('/signup', userSignupValidator, runValidation ,signup)
router.post('/account-activation', accountActivation)
router.post('/signin', userSigninValidator, runValidation ,signin)

// forgot reset password
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword )
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)
// google and facebook
router.post('/google-login', googleLogin)

module.exports = router