const mongoose=require("mongoose")
const itemchema=mongoose.Schema({
   
    emaill:String,
    fnamee:String,
    lnamee:String,
    habitual_residence: {
        type: [String], // Array of strings
        required: true,
      },
    address:String,
    p_nbb:String,
    zipcode:String,

},{
    timestamps:true

})

const itemmodel=mongoose.model("Users",itemchema)
module.exports = itemmodel;