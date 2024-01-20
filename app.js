const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var QRCode = require('qrcode')


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

let imageUrl = "";
let Download = "";
app.get('/',(req,res)=>{
    res.render('index',{image : imageUrl, down: Download});
});

app.post('/',(req,res)=>{
    console.log(req.body.url);
    QRCode.toDataURL(req.body.url, function (err, url) {
        imageUrl = url;
        Download = 'Download';
        res.redirect('/');
      })
});

app.listen(3000,()=>{
    console.log('Server is running at port 3000.');
});