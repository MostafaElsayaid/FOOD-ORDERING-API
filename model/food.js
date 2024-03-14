const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    comment:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})


const foodSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     price:{
        type:Number,
        required:true,
     },
     description:{
        type:String,
        required:true
     },
     category:{
        type:String,
        required:true
     },
    
     reviwes:[reviewSchema],
     foodImage:{
        type:String,
        required:true
     },
todaySelction: {
           type: Boolean,
           default: false
     }
     
        

  
}
,{
    timestamps:true
});




module.exports = mongoose.model("food", foodSchema);
