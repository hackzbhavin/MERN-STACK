const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs')


//========================================================
// retrive product by id
exports.getProductId = (req,res,next,id)=>{
Product.findById(id).exec((err, product) =>{
    if(err){
        return res.status(400).json({
            error:'Product not found'
        })
    }
    req.product = product;
    next();
})
}

//========================================================
// create product
exports.createProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,file) =>{
        if(err){
            return res.status(400).json({
                error:'Problem with Image'
            })
        }
//destructure the fields
const {name, description, price, category, stock } = fields;

if(!name || !description || !price || !category || !stock){
    return res.status(400).json({
        error:'Please include all fields'
    })
}


        let product = new Product(fields)

        //handling files
        if(file.photo){
            if(file.photo.size > 4000000){
                //3000000 is 3mb
                return res.status(400).json({
                    error:'File size to big must be less than 4mb'
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
            
        }
//save to the DB
product.save((err, product)=>{
    if(err){
        res.status(400).json({
            error:'saving tshirt is DB failed'
        })
    }
    res.json(product)
})
    })
}


//========================================================
// retrive data
exports.getProduct = (req,res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}
exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
};

//========================================================
//delete product

exports.deleteProduct = (req,res)=>{
let product = req.product;
product.remove((err, deletedProduct )=>{
    if(err){
        return res.status(400).json({
            error: 'Failed to delete product'
        })
    }
    res.json({
        message: 'Deletion was Successfull',deletedProduct
    });
});
};


//========================================================
// update product

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,file) =>{
        if(err){
            return res.status(400).json({
                error:'Problem with Image'
            })
        }

        // updation code
        let product = req.product;
        // _.extend takes the existing value and store means updates it
        poduct = _.extend(product, fields)


        //handling files
        if(file.photo){
            if(file.photo.size > 4000000){
                //3000000 is 3mb
                return res.status(400).json({
                    error:'File size to big must be less than 4mb'
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
            
        }
//save to the DB
product.save((err, product)=>{
    if(err){
        res.status(400).json({
            error:'Updation of Product failed '
        })
    }
    res.json(product)
});
    });

};

//========================================================
// product listing
exports.getAllProducts = (req, res)=>{
  // setting limit= 8 for limting the products
   let limit = req.query.limit ? parseInt(req.query.limit) : 8
   let sortBy = req.query.sortBy ? req.query.sortBy : '_id' 
    Product.find()
     // select(-photo) to unselect it neglect it
    .select('-photo')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error: 'No Product found'
            })
        }
        res.json(products)
    })
}

//========================================================
//inventory
exports.updateStock  = (req,res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne:{
                filter: {_id: prod._id},
                update : {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })
Product.bulkWrite(myOperations,{}, (err,products)=>{
    if(err){
        return res.status(400).json({
            error:'Bulk operation failed '
        })
    }
    next();
})
}



//========================================================
//========================================================
// category
exports.getAllUniqueCategory = (req, res) => {
    Product.distinct('category', {}, (err, category)=>{
        if(err){
            return res.status(400).json({
                error:'No category found'
            })
        }
        res.json(category)
    })
}