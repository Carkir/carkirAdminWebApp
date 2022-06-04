const express = require('express')
const app = express()
const axios = require('axios').default
const cp = require('cookie-parser')
const fileupload = require('express-fileupload')
const bp = require('body-parser')

app.use(cp())
app.use(bp.urlencoded({extended: true}))
app.use(fileupload())

app.get('/:id', async(req, res) => {
  const name = req.params.id
  console.log(name)

  await axios.get(`http://localhost:8080/read/${name}`, { headers : { Authorization : `Bearer ${req.cookies.auth}`}})
  .then((response)=>{
    if(Number(response.status) == 200){
      res.render('editDataForm',{data : response.data})
    }
  }).catch(err=>{
    res.redirect('/dashboard')
  })
  })

  app.post('/update/:id',async(req,res)=>{
    const id = req.params.id 
    const open = new Date()
    const close = new Date()
    const name = req.body.name
    var image = await req.files.image.data.toString('base64')
    if(!req.files.image){
      image = req.body.imagebackup
    }
    console.log(`gambar ${image}`)
    const alamat = req.body.alamat
    const priceHigh = req.body.priceHigh
    const priceLow = req.body.priceLow

    open.setFullYear(2022,5,24)
    close.setFullYear(2022,5,24)
    open.setHours(Number(req.body.timeOpen),0)
    close.setHours(Number(req.body.timeClose),0)

    await axios.post(`http://localhost:8080/input/update/${id}`,{
      name : name,
      timeOpen : open.getTime(),
      timeClose : close.getTime(),
      image : image,
      alamat : alamat,
      priceHigh: priceHigh,
      priceLow: priceLow,
    },{headers:{
      Authorization : `Bearer ${req.cookies.auth}`
    }}).then(async(response)=>{
      if(Number(response.data) < 300){
        res.redirect('/dashboard')
      }else{
        console.log('wew')
        console.log(response.status)
        res.redirect(`/editTempatParkir/${id}`)
      }
    }).catch(err=>{
      res.redirect(`/editTempatParkir/${id}`)
    })
  })

module.exports = app