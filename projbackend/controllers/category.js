const Category = require('../models/category')

//========================================================
// Retrive category by id
exports.getCategoryById = (req, res, next, id)=> {

Category.findById(id).exec((err, cate)=>{
if(err){
    return res.status(400).json({
        error: 'Category not found in DB'
    })
}
req.category = cate;
next();
})

  
}


//========================================================
// Create category 
exports.createCategory = (req,res)=>{
    const category = new Category(req.body)
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                error: 'NOT able to Save Category in DB'
            });
        }
        res.json({category})
    })
}


exports.getCategory = (req,res) => {
return res.json(req.category)
    
}


//========================================================
// get all category details
exports.getAllCategory = (req,res) => {
    Category.find().exec((err, categories)=>{
        if(err){
            return res.status(400).json({
                error: 'NO Category Found'
            });
        }
        res.json(categories);
    });
}; 



//========================================================
// Update Category
exports.updateCategory = (req,res)=> {
    const category = req.category;
    category.name = req.body.name

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error: 'Failed!! to Update requested Category'
            });
        }
        res.json(updatedCategory)
    });
};


//========================================================
//Delete category
exports.deleteCategory = (req, res)=>{
    //from middleware extracting from parameter
    const category = req.category;

    category.remove((err, delCategory)=>{
        if(err){
            return res.status(400).json({
                error: 'Failed to delete requested category '
            });
        }
        res.json({
            message: `Category ${delCategory} was Successfully DELETED`
        });
    });

};