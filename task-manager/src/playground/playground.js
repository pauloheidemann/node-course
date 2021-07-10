const bcrypt = require('bcrypt')

const myFunction = async () => {
    const password = '1234'
    const hashedPass = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPass)

    const isMatch = await bcrypt.compare(password, hashedPass)
    const isNotMatch = await bcrypt.compare('123435', hashedPass)
    console.log(isMatch)
    console.log(isNotMatch)
}

myFunction()

const jwt = require('jsonwebtoken')

const myJwtFunction = async () => {
    const token = jwt.sign({ _id: '1234' }, 'secret', {expiresIn: '1 day'})
    console.log(token)

    const data = jwt.verify(token, 'secret')
    console.log(data)
}

myJwtFunction()

const pet = {
    name: 'Hal'
}

pet.toJSON = function() {
    console.log(this)
    return this
}

console.log(JSON.stringify(pet))