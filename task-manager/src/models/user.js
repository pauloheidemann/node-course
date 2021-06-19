const validator = require('validator')
const mongoose = require('mongoose')

const User = mongoose.model('user', {
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
    }
})

module.exports = User