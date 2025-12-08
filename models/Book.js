const mongoose = require('mongoose')

const bookschema = new mongoose.Schema({
    uploaderID:{type:String,required:true},
    uploaderusername:{type:String,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    gener:{type:String,required:true},
    coverpath:{type:String,required:true},
    pdfpath:{type:String,required:true}
})
module.exports = mongoose.model('book',bookschema);