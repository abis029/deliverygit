const express=require("express")


const Manager = require("../models/managermodel");

const router = express.Router();

router.post("/add_manager", async (req, res) => {
  const { username, dili_address, dili_date, dili_status, dili_method, dili_cost, assignes_personal, notes } = req.body;

  try {
      // Create a new Manager object from the request body
      const newManager = new Manager({
          username,
          dili_address,
          dili_date,
          dili_status,
          dili_method,
          dili_cost,
          assignes_personal,
          notes
      });

      // Save the manager to the database
      const savedManager = await newManager.save();

      // Respond with the saved data
      res.status(201).json({ success: true, message: "Manager added successfully", data: savedManager });
  } catch (error) {
      // Handle any errors that occur during the save process
      console.error("Error adding manager:", error);
      res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
});

// GET all managers
router.get("/managers", async (req, res) => {
  try {
    const managers = await Manager.find(); // Fetch all managers from the database
    res.status(200).json({ success: true, message: "Managers fetched successfully", data: managers });
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
});




  ////MANAGER Login 
router.post("/signin",async (req, res) => {
    console.log('in-------------------------------');
    const { email, password } = req.body;
  
    try {
        console.log(email);  
      const user = await Manager.findOne({ email});
      
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
    
     // const isPasswordValid = await bcrypt.compare(password, user.password);
     const isPasswordValid1 = user.password===password;
  
      console.log('Input password:', password);
      console.log('Stored hashed password:', user.password);
      console.log('isPasswordValid:', isPasswordValid1);
      
      if (isPasswordValid1===false) { // Fixed condition
        console.log('Request body:', req.body);
        return res.status(401).json({ success: false, message: "Incorrect password" });
      
  
      }
  
      // If password is valid, send success message and user data
      res.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (error) {
        console.log('Retrieved user:', user);
  
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: error });
    }
  });

router.delete("/manager_delete/:id",async(req,res)=>{
  const id=req.params.id
  const data=await Manager.deleteOne({_id:id})
  res.send({success:true,message:"deleted successfully",data:data})
  })

  router.get("/manager_item_order/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await Manager.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
router.put("/manager_item_update",async(req,res)=>{
  const {id,...rest}=req.body
  const data=await Manager.updateOne({_id:id},rest)
  res.send({success:true,message:"updated successfuly",data:data})
})
  module.exports = router;