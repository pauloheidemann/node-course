const express = require('express')
const User = require('../models/user')

const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', auth, async(req, res) => {
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

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    } 
})

router.post('/users/logout', auth, async (req, res) => {
    try { 
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()

        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try { 
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.get('/users/:id', auth, async(req, res) => {
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

router.patch('/users/:id', auth, async(req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send('Invalid update')
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true}) bypasses mongoose middleware, god knows why

        const user = await User.findById(req.params.id)
        
        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', auth, async(req, res) => {
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