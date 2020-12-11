if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
   
  localStorage.setItem('myFirstKey', 'myFirstValue');
  console.log(localStorage.getItem('myFirstKey'));  
var express=require('express')
var app =express()
var https=require('https')
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true})) 
app.set('view engine','ejs')
app.use(express.static('public'))
let ques=1
let opt=[1]
let question_text=['']
let option_text=[['']]
let option_type=['']
app.get('/',(req,res)=>
{
    //console.log(opt,ques)
    console.log(option_text)
    res.render('create_form',{question:ques,option:opt,question_text:question_text,option_text:option_text,option_type:option_type});
})
app.get('/AddQuestion',(req,res)=>{
    ques++;
    opt.push(1);
    question_text.push('')
    option_type.push('')
    option_text.push([''])

    console.log("add question",opt)
    res.redirect("/")
})
app.get('/addOption',(req,res)=>
{

        localStorage.setItem('detail','32');
        let temp=req.query.QuestionNumber
        opt[temp]++;
        console.log(temp,opt)
       // console.log(opt)
        res.redirect("/")
})
app.get('/RemoveQuestion',(req,res)=>
{
       //console.log(req.body,parseInt(req.body.AddForQuestion))
       let temp=req.query.QuestionNumber
        ques--;
        console.log("Splice",temp,opt)
        opt.splice(temp,1)
        console.log("after Splice",opt)
        res.redirect("/")
})
app.get('/RemoveOption',(req,res)=>
{

    let temp=req.query.QuestionNumber
    console.log(temp,opt)
    if (opt[temp]!=1)
    {
        opt[temp]--;
    
    }
    console.log(opt)
    res.redirect("/")
})
app.post("/StoreQuestion",(req,res)=>
{
    console.log(req.body)
    for (let i=0;i<ques;i++)
    {
        if (i==0)
        {
            question_text=[]
            option_text=[]
            option_type=[]
        }
        eval('question_text.push(req.body.ques'+i+')')
        eval('option_type.push(req.body.type'+i+')')
        let arr=[]
        
        for(let j=0;j<opt[i];j++)
        {
            eval('arr.push(req.body.ques'+i+'opt'+j+')')
            console.log('arr.push(req.body.ques'+i+'opt'+j+')')
        }
        option_text.push(arr)
        
        
    }
    console.log(question_text,option_text,option_type)
    res.end()
})
app.listen('3000',function(){
        console.log("Server Started")
})