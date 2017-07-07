const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird")
mongoose.connect("mongodb://localhost:27017/todolist");

const todoSchema = new Schema({
  todoid: {type: Number , required: true, unique: true},
  title: String,
  order:Number,
  completed:Boolean
});




const todos = mongoose.model("todos" , todoSchema);

router.get("/api/todos", function (req, res) {
  todos.find({}).then(function (todos) {
    if (todos) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(todos);
    } else {
      res.send("no todos found");
    }
  })
});


router.get("/api/todos/:id", function (req, res) {
todos.findOne({todoid:req.params.id}).then(function (todo) {
  if (todo) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(todo);
  }else {
    res.status(404).send("no todo");
  }
})
});

router.post("/api/todos", function (req, res) {
let todo = new todos({
  todoid: req.body.todoid,
  title: req.body.title,
  order: req.body.order,
  completed: req.body.completed
})
todos.create(todo).then(function (todo) {
  if (todo) {
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(todo)
  } else {
    res.status(403).send("invalid todo");
  }
});

});


router.put("/api/todos/:id", function (req, res) {
  let updatedTodo = ({
    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  })
  todos.update({todoid: req.params.id}, updatedTodo).then(function (todo) {
    if (todo) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(todo);
    }else {
      res.status(403).send("no todo found")
    }
  })

});


router.patch("/api/todos/:id", function (req, res) {
  let updatedTodo = ({
    title: req.body.title,
    order: req.body.order,
    completed: req.body.completed
  })
  todos.update({todoid: req.params.id}, updatedTodo).then(function (newtodo) {
    if (newtodo) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(newtodo);
    }else {
      res.status(403).send("no todo found")
    }
  })

});

router.delete("/api/todos/:id", function (req, res) {
  todos.deleteOne({todoid: req.params.id}).then(function (gonetodo) {
    if (gonetodo) {
      res.status(200).send("deleted");
    }else {
      res.status(404).send("no todo found")
    }
  })

});







module.exports = router;
