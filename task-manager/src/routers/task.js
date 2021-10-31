const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body, 
        owner: req.user._id
    })
    
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        console.log(e)
        res.status(400)
        res.send(e)
    }
})

router.get('/tasks', auth, async(req, res) => {
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === "true" ? true : false
    }
    try {
        // const tasks = await Task.find({})
        await req.user.populate({
            path: 'tasks', 
            match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async(req, res) => {

    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router