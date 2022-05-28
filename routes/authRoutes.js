const express = require('express')
const app = express()
const bp = require('body-parser')
const cp = require('cookie-parser')
const axios = require('axios').default

app.use(bp.urlencoded({extended: true}))
app.use(cp())

app.post('/login', async(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    await axios.post('http://localhost:8080/auth/login',{
        username: username,
        password: password
    }).then(
        (response)=>{
            if(Number(response.status) == 200){
                res.redirect('dashboard')
            }
        }
    )
})

module.exports = app

