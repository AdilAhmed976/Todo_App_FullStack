const {Router, application} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {TodoModel} = require("../model/Todo.model")
const todoController = Router() 

todoController.get("/", async (req,res) => {
    const {page=1,limit} = req.query
    const todo = await TodoModel.find({userId :req.body.userId}).limit(limit).skip((page-1)*limit)
    res.send(todo)
})
 
todoController.post("/create", async (req,res) => {
    const {Heading,Todo,Status,userId} = req.body
    const todo = new TodoModel({
        Heading,
        Todo,
        Status,
        userId
    }) 
    try {
        await todo.save()
        res.send("Todo Created Successfully")
    } catch (error) {
        res.send("Error while creating TODO, Please try again")
    }
})

todoController.delete("/delete/:noteId", async (req, res) => {
    const {noteId} = req.params
    const deletedNote = await TodoModel.findOneAndDelete({_id : noteId, userId : req.body.userId})
    if(deletedNote){
        res.status(200).send("Deleted")
    }
    else{
        res.send("couldn't delete")
    }
})
// {_id : noteId, userId : req.body.userId}
todoController.patch("/edit/:noteId", async (req, res) => {
    const {noteId} = req.params
    const deletedNote = await TodoModel.findByIdAndUpdate(noteId,req.body)
    if(deletedNote){
        res.json({msg:"success"})
    }
    else{
        res.json({msg:"failure"})
    }
})
 

module.exports ={
    todoController
}
