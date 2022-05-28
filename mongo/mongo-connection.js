const mongoose = require('mongoose')
require('dotenv').config()

async function connectDb(uri){
    mongoose.connect(`${process.env.CONNECTION_STRING}`,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    const db = mongoose.connection

    db.on('error',console.error.bind(console, 'connection error'))
    db.once('open',()=>{
        console.log('successfully connect to DB')
    })
}

module.exports = {connectDb}