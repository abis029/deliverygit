const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const itemRoutes = require("./routes/itemroutes");
const managerroutes = require("./routes/managerroutes");

const app=express()

app.use(cors())
app.use(express.json())

app.use("/", itemRoutes);
app.use("/", managerroutes);

const PORT=process.env.PORT||8020







mongoose.connect("mongodb+srv://shehan:Shehan99@cluster0.t3v3psz.mongodb.net/test3?retryWrites=true&w=majority")
.then(()=>{
  
    console.log(`port number => ${PORT}`)
    app.listen(PORT,()=>console.log("server connection successful"))
}).catch((err)=>{
    console.log(err)
})

