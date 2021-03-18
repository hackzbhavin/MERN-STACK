const express = require('express');
const router = express.Router();
const {makePayment} = require('../controllers/stripepayment');



// routes

router.post('/stripepayment', makePayment )




module.exports = router;