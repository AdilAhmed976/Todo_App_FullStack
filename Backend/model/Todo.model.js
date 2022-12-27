const mongoose =require("mongoose")

const todoSchema = mongoose.Schema({
    Heading: {type :String ,required:true},
    Todo: {type :String ,required:true},
    Status:{ type :Boolean,required:true},
    userId:{ type :String,required:true},
    DateOf:{ type :String, required:true}
})  

const TodoModel = mongoose.model("todo" , todoSchema)

module.exports = {
    TodoModel
}