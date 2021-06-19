const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send()
    // }).catch((error) => {
    //     console.log(error)
    //     res.status(400)
    //     res.send(error)
    // })
})

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.get('/users/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // User.findById(req.params.id).then((user) => {
    //     if (!user) {
    //         res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.patch('/users/:id', async(req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    console.log(isValidOperation)

    if (!isValidOperation) {
        return res.status(400).send('Invalid update')
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router