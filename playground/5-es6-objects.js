const name = "Paulo"
const userAge = 32
const user = {
    name,
    userAge,
    location: 'Leicester'
}

user.test = 'test'

const testObject = {
    name: "Leo",
    orientation: 'Esquerdinha'
}

const {name: leoName, orientation} = testObject

console.log(user)
console.log(leoName)
console.log(orientation)

const transaction = (type, {name, userAge: age}) => {
    console.log(type, name, age)
}

transaction('test', user)