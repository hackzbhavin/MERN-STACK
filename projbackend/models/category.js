const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        trim: true,
        required:true,
        maxlength:50,
        unique:true
    }
}, {timestamps:true});


module.exports = mongoose.model('Category',categorySchema);