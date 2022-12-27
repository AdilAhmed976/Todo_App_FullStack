const {Router, application} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {TodoModel} = require("../model/Todo.model")
const todoController = Router() 

todoController.get("/", async (req,res) => {
    const {page=1,limit,filter} = req.query
    console.log(filter)
    const todo = await TodoModel.find({userId :req.body.userId}).limit(limit).skip((page-1)*limit)
    res.send(todo)
})

// api for current day 
todoController.get("/today", async (req,res) => {
    const {page=1,limit,filter,day} = req.query
    console.log(filter)
    const todo = await TodoModel.find({userId :req.body.userId, DateOf: day}).limit(limit).skip((page-1)*limit)
    res.send(todo)
})

// api for filters day 
todoController.get("/filters", async (req,res) => {
    const {page=1,limit,start,end} = req.query
    console.log(start,end)
    const todo = await TodoModel.find({userId :req.body.userId, DateOf: { $gte: start, $lte: end  }}).limit(limit).skip((page-1)*limit)
    res.send(todo)
})
 
todoController.post("/create", async (req,res) => {
    const {Heading,Todo,Status,userId} = req.body
    let dateTime = new Date().toJSON();

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;


    const todo = new TodoModel({
        Heading,
        Todo, 
        Status,
        userId,
        DateOf:currentDate
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
