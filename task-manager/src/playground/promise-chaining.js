require('../db/mongoose')
const User = require('../models/user')

//Usage with promise chaining
// User.findByIdAndUpdate('60c4def2b8a76a1842afb855', {age: 33}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 33})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })


//Usage with async await
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})

    return count
}

updateAgeAndCount('60c4def2b8a76a1842afb855', 12).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})