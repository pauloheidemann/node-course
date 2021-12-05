const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike', 
    email: 'test@test.com',
    password: '123456', 
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET || 'secret')
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should be able to login', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
})

test('Should not be able to login', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: '123123123'
        }).expect(400)
})

test('Should create a new user', async() => {
    const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Paulo Teste', 
            email: 'paulo.heidemann@gmail.com',
            password: '123456'
        }).expect(201)

        const user = await User.findById(response.body._id)
        expect(user).not.toBeNull()
})

test('Should not create a new user without authentication', async() => {
    await request(app)
        .post('/users')
        .send({
            name: 'Paulo Teste', 
            email: 'paulo.heidemann@gmail.com',
            password: '123456'
        }).expect(401)
})

