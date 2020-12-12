var express=require('express')
var app =express()
var https=require('https')
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true})) 
app.set('view engine','ejs')
app.use(express.static('public'))
let ques=1
let opt=3
app.get('/',(req,res)=>
{
    console.log(opt,ques)

    res.render('create_form',{question:ques,option:opt});
})
app.post('/',(req,res)=>{
    ques++;
    res.redirect("/")
})
app.post('/addOption',(req,res)=>
{
    opt++;
    console.log(opt)
    res.redirect("/")
    res.send(opt);
})
app.listen('3000',function(){
        console.log("Server Started")
})