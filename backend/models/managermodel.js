const mongoose=require("mongoose")


const adminchema=mongoose.Schema({
    username:String,
    dili_address:String,
    dili_date:String,
    dili_status:String,
    dili_method:String,
    dili_cost:String,
    assignes_personal:String,
    notes:String,
  
   

},{
    timestamps:true

})

const Manager=mongoose.model("Admin",adminchema)
module.exports = Manager;