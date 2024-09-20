const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/itemroutes");
const managerroutes = require("./routes/managerroutes");

const app = express();

app.use(cors());
app.use(express.json());

// Assign unique paths to each router
app.use("/api/items", itemRoutes);
app.use("/api/managers", managerroutes);

const PORT = process.env.PORT || 8020;

mongoose
  .connect("mongodb+srv://shehan:Shehan99@cluster0.t3v3psz.mongodb.net/test3?retryWrites=true&w=majority")
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
 
