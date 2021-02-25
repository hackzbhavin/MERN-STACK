//const User = require('../models/user');
const express = require('express');
const router = express.Router();
const {getUserById, getUser, updateUser, userPurchasedList } = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');

// To get all users
//const {getUserById, getUser, getUsersAll} = require('../controllers/user');


//==================================================================

router.param('userId', getUserById);

//retrive data
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

//Update
router.put('/user/:userId',isSignedIn, isAuthenticated, updateUser)

//retrive purchased details
router.get('/orders/user/:userId',isSignedIn, isAuthenticated, userPurchasedList)



//To show all users without middlewares
//router.get('/users', getUsersAll);
// always remember to export to user the router in another file of js



//==================================================================
// exporting router to app.js
module.exports = router; 