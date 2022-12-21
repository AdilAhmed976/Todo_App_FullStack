const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express();
const PORT = 8080 || process.env.PORT
app.use(express.json())
app.use(cors())

const {connection} = require("./config/db")

const {userController} = require("./routes/user.routes")
const {todoController} = require("./routes/todos.routes");
const { authentication } = require("./middlewares/authentication");

app.get("/",(req,res) => {
     res.send("HOMEPAGE")
}) 
 
app.use("/user",userController)
app.use(authentication)
app.use("/todo",todoController)



app.listen(PORT,async ()=>{
console.log(`Listening to PORT ${PORT}`)
     try{
          await connection
          console.log("Connected to DB")
     }
     catch(err){
          console.log(err)
     }
})