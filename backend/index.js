const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/itemroutes");
const managerroutes = require("./routes/managerroutes");
const deliveryPersonRoutes = require('./routes/deliveryperson');



const app = express();

app.use(cors());
app.use(express.json());

// Assign unique paths to each router
app.use("/api/items", itemRoutes);
app.use("/api/managers", managerroutes);
app.use('/api/delivery-person', deliveryPersonRoutes);


const PORT = process.env.PORT || 8020;

mongoose
  .connect("mongodb+srv://Thanu:Thanu23@cluster3.hdavn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3")
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
 
