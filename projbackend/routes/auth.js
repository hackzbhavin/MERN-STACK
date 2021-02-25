var express = require('express');
var router = express.Router();

//checkings
const { check, validationResult } = require('express-validator');

// from controller auth.js to routes
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')

// signup
router.post("/signup",[
    check('name').isLength({ min: 2 }).withMessage('name should be at least 3 chars long'),
    check('email').isEmail().withMessage('email is necessary'),
    check('password').isLength({min:3}).withMessage('password should be at least 4 chars '),

], signup);

//signin
router.post("/signin",[
    check('email').isEmail().withMessage('email is necessary'),
    check('password').isLength({min:3}).withMessage('password field is neccessary '),

], signin);



//signout
router.get("/signout", signout);
router.get('/test',isSignedIn, (req,res)=>{
    res.json(req.auth);
});
module.exports = router;