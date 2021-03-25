const express = require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const cors=require('cors');
const { response } = require('express');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//app.get('/',()=>{
  //  resizeBy('welcome to my form')
//})
exports.feedback =  (req,res)=>{
//app.post('/api/form',(req,res)=>{
    let data =req.body
    let smtpTransport=nodemailer.createTransport({
        service:'gmail',
        port:465,
        auth:{
            user:'manjit7898@gmail.com',
            pass:'manjit1711'
        }
    });

    let mailOptions={
        from:data.email,
        to:'jitsukhana@gmail.com',
        subject:'message from '+data.name,
        html:'<h3>Information Of feedback</h3><ul><li>Name: '+data.name+' </li><li>Email: '+data.email+' </li></ul><h3>Message</h3><p>'+data.message+'</p>'
    };
    smtpTransport.sendMail(mailOptions,(error,response)=>{
        if(error){
            res.send(error);

        }
        else{
            res.send('success');
        }
    })
    smtpTransport.close();
};

//app.listen(3001,()=>{
  //  console.log('server starting ');
//})