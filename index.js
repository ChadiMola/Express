const express = require('express');
const app = express();
const path = require('path');
app.set('view engine','pug')
app.set('views','./views')

function verifyTime(req, res, next) {
    const currentTime = new Date();
    const day = currentTime.getDay();
    const hour = currentTime.getHours();
  
    if (day === 0 || day === 6) {
      return res.status(403).send('The web application is not available on weekends');
    } else if (hour < 9 || hour >= 17) {
      return res.status(403).send('The web application is only available during working hours (9am to 5pm)');
    } else {
      next();
    }
  }
  
  app.use(verifyTime);

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')

})
app.use(express.static(path.join(__dirname)))
const port = 5000

app.listen(port,(err)=>err?console.log(err):console.log("server is running !!"))