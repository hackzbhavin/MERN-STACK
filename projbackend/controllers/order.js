const {Order, ProductCart} =require('../models/order')


//=============================================

exports.getOrderById =  (req, res, next, id) => {
    Order.findById(id)
    // do not put comma after name and before price
    .populate('product.product', 'name price')
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error: 'No order found in DB'
            })
        }
        req.order = order;
        next()
    })
}

//=============================================
// create

exports.createOrder =  (req, res) => {
req.body.order.user = req.profile;
const order = new Order(req.body.order)
order.save((err, order)=>{
    if(err){
        return res.status(400).json({
            error:'Failed to save your order in DB'
        })
    }
    res.json(order);
})

}

//=============================================
// retrive orders

exports.getAllOrders =  (req, res)=>{
    Order.find()
    .populate('user', '_id name')
    .exec((err, order)=>{
        if(err){
            return res.status(400).json({
                error: 'No Orders Found in DB'
            })
        }
        res.json(order);
    })
}

//=============================================
// get the status
exports.getOrderStatus = (req, res)=> {
    res.json(Order.schema.path('status').enumValues)
}


//=============================================
// Update status
exports.updateStatus  = (req, res)=> {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status:req.body.status}},
        (err, order)=>{
            if(err){
                return res.status(400).json({
                    error: 'Updating Status failed'
                })
            }
            res.json(order)
        })
}


