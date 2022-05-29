const express = require('express')
const app = express()
const mongo = require('mongoose')
const bp = require('body-parser')
const landingRoutes = require('./routes/landingRoutes')
const authData = require('./routes/authRoutes')
const editDataForm = require('./routes/editDataRoutes')
const editUserForm = require('./routes/editUserRoutes')
const dataTable = require('./routes/dataTableRoutes')
const userTable = require('./routes/userTableRoutes')
const {connectDb} = require('./mongo/mongo-connection')

require('dotenv').config()

try{
    connectDb()
}catch(err){
    console.log(err)
}

app.use(express.json())
app.use(bp.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.set('view engine','ejs')

app.use('/',landingRoutes)
app.use('/auth',authData)
app.use('/editTempatParkir',editDataForm)
app.use('/editUser',editUserForm)
app.use('/tempatParkir',dataTable)
app.use('/user',userTable)



app.listen(5000,()=>{
    console.log('listen at 5000')
})



