const {MongoClient, ObjectID} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

MongoClient.connect(connectionUrl, { useNewUrlParser:true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Connection error', error)
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Paulo',
    //     age: 32
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Error inserting document')
    //     }

    //     console.log(result.ops)
        
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Leo',
    //         age: 31
    //     }, 
    //     {
    //         name: 'Gabi',
    //         age: 28
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Error inserting document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Task 1',
    //         completed: true
    //     },
    //     {
    //         description: 'Task 2',
    //         completed: true
    //     },
    //     {
    //         description: 'Task 3',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Error inserting document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({_id:new ObjectID("60b4fbb1dea2eb583f2063e8")}, (error, user) => {
    //     if (error) {
    //         console.log('Error', error)
    //     }

    //     console.log(user)
    // }) 

    // db.collection('users').find({age:32}).forEach(user => {
    //     console.log(user._id.getTimestamp())
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("60b4f835d0e92f57951c0cf3")
    // }, {
    //     $set: {
    //         name: 'Paulo Henrique Heidemann'
    //     }
    // }).then(result => {
    //     console.log("Succes", result)
    // }).catch(error => {
    //     console.log("Error", error)
    // })

    db.collection('users').deleteOne({_id: new ObjectID("60b4f6fbfcdd4b5746894472")})
        .then(result => {
            console.log("Success", result)
        }).catch(error => {
            console.log("Error", error)
        })

})