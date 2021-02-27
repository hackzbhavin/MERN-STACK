const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { updateStock } = require('../controllers/product');

const {getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus} = require('../controllers/order')

//params
router.param('userId', getUserById)
router.param('orderId', getOrderById);


//actual routes
// Create order isSigned user, isAuth not isAdmin && pushorder in list, update stock
router.post('/order/create/:userId', isSignedIn, isAuthenticated, pushOrderInPurchaseList,updateStock,createOrder)

//retrive
router.get('/order/all/:userId', isSignedIn, isAuthenticated, isAdmin, getAllOrders)


//status of order for Admin
router.put('/order/:oderId/status/:userId', isSignedIn, isAuthenticated, isAdmin,updateStatus)
router.get('/order/status/:userId', isSignedIn, isAuthenticated, isAdmin, getOrderStatus)

module.exports = router;