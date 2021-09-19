const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const tokenSecret = 'secret'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    age: {
        type: Number, 
        default: 0, 
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        validate (value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email with invalid format')
            }
        }
    },
    password: {
        type: String, 
        required: true,
        minLenght: 7,
        trim: true
    }, 
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//Not stored on the database
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//Mongoose middleware
userSchema.pre('save', async function(next) {
    const user = this

    console.log(user)

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(pass, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, tokenSecret)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

const User = mongoose.model('user', userSchema)

module.exports = User