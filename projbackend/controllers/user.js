const User = require('../models/user');
const Order = require('../models/order');


//===============================================================
// with id
exports.getUserById = (req , res, next, id) =>{
    User.findById(id).exec((err, user)=>{
        if(err || !user ){
            return res.status(400).json({
                error: 'No User Found in DB'
            });
        }
        req.profile = user;
        next();
    });
};

//===============================================================
// for user details

exports.getUser = (req, res) => {
    //To get rid of some details
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    
    return res.json(req.profile);
    }


//===============================================================
// To export all users data 
// exports.getUsersAll = (req , res) =>{
//    User.find().exec((err,users)=>{
//        if(err || !users){
//            return res.status(400).json({
//                error:'No Users found??? '
//            })
//        }
//        res.json(users);
//    })
// };


//===============================================================  
// export the update to routes/user.js

exports.updateUser = (req, res)=> {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user)=>{
            if(err){
                return res.status(400).json({
                    error: 'You are not Authorized to Update or Update Unsuccessfull'
                });
            }
            //user.profile.salt = '';
            //user.profile.encry_password = '';
            //user.profile.createdAt = undefined;
            //user.profile.updatedAt = undefined;
            res.json(user)
        }
    )
}

//===============================================================  

exports.userPurchasedList = (req, res)=>{
    Order.find({user: req.profile._id})
    .populate('user', '_id name')
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: 'No Order in this Account'
            })
        }
        return res.json(order);
    })
}


//===============================================================  
exports.pushOrderInPurchaseList = (req,res,next)=>{
    let purchases = []
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category : product.category,
            quantity: product.quantity,
            amount : req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    });
    // store this in DB
User.findOneAndUpdate(
    {_id: req.profile._id},
    {$push: {purchases:purchases}},
    {new:true},
    (err, purchases) => {
        if(err){
            return res.status(400).json({
                error: 'Unable to save purchase list'
            })
        }
    }
    )


    next();
}

