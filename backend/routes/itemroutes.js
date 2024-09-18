const express=require("express")


const itemmodel = require("../models/itemmodel");

const router = express.Router();

router.get("/item",async(req,res)=>{
    const data= await itemmodel.find({})
  
    res.json({success:true,data:data})
})


router.post("/item_create",async(req,res)=>{
    const data=new itemmodel(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


router.put("/item_update",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await itemmodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




router.delete("/item_delete/:id",async(req,res)=>{
const id=req.params.id
const data=await itemmodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




router.get("/item_count",async(req,res)=>{
    try{
        const users=await itemmodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

router.get("/item_order/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await itemmodel.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
module.exports = router;

