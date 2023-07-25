const mongoose = require('mongoose');

const csvSchema = new mongoose.Schema({
    name:{
        type:String,
        default:'',
        required:true
    },
    headers:{
        type:Array
    },
    result:{
        type:Array
    },
    path:{
        type:String,
        default:'',
        required:true
    }
})

const CSV = mongoose.model('csv',csvSchema)
module.exports = CSV