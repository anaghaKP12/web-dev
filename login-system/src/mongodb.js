const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/LoginSystem')
    console.log("mongodb connected")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
})

const collection = new mongoose.model("Logincollection",LoginSchema)
module.exports = collection