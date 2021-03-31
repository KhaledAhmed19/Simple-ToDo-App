const router = require("express").Router();
const Todo = require("../models/todoModel");
const auth = require("../middleware/auth");



router.post("/insert", auth, async(req, res) => {
    
    try{
        let {todoName} = req.body;
        if(!todoName){
            return res.status(400).json({ msg: "Not all fields have been entered." });
        } 
       const newTodo =  new Todo({todoName, userId: req.user})
        const savedTodo =  await newTodo.save();
        res.json(savedTodo)
    } catch(err){
        res.status(500).json({ error: err.message });

    }
})

router.get("/all", auth,  async(req, res) => {
    const todos = await Todo.find({userId: req.user});
    res.json(todos);

});

router.delete("/delete/:id", auth,  async(req, res) => {
    const todo = await Todo.findOne({userId: req.user, _id: req.params.id});
    if(!todo){
        return res.status(400).json({
            msg: 'No todo found with this id'
        });
    }
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo)
    

});

router.put("/update/", auth,  async(req, res) => {
    const id = req.body.id
    const todoName = req.body.newName
    await Todo.findById(id, (err, updatedTodo)=> {
        updatedTodo.todoName = todoName
        updatedTodo.save()
        res.json(updatedTodo)
        
    })
    

});

module.exports = router;