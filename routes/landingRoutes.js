const express = require('express')
const app = express()
const cp = require('cookie-parser')
const axios = require('axios').default

app.use(cp())

app.get('/',(req,res)=>{
    console.log(req.cookies.auth)
    res.render('landing')
})

app.get('/dashboard',async(req,res)=>{
    console.log(req.cookies.auth)
    const config = {
        headers:{
            'Authorization' : `Bearer ${req.cookies.auth}`
        }
    }
    await axios.get('http://localhost:8080/read/all',config)
    .then(async (response)=>{
        res.render('dataTable', {datas : response.data})
})

})


module.exports = app