  function typeChange(qno,fl)
  {
    localStorage.setItem("yha","aaya"+fl)
    if (fl==0)
    {
      if(localStorage.getItem("qT"+qno) != null)
      {
        localStorage.removeItem("qT"+qno)
      }
    }
    else
    {
      localStorage.setItem("yha aaya","yay")
      let temp = localStorage.getItem("q"+qno)
      let obj = JSON.parse(temp)
      obj.ono=1
      localStorage.setItem("q"+qno,JSON.stringify(obj))
      localStorage.setItem('qT'+qno,"Text Area")
    }
  }
  function save()
  {
    let quest=parseInt(localStorage.getItem("quest"))

    
    for(let i=0;i<quest;i++)
    {
        let temp = localStorage.getItem("q"+i)
        let obj = JSON.parse(temp)
        obj.title=document.getElementsByName('ques'+i)[0].value
        let opt=obj.ono
        for(let j=0;j<opt;j++)
        {
            obj.option[j]=document.getElementsByName("ques"+i+"opt"+j)[0].value
        }
        localStorage.setItem("q"+i,JSON.stringify(obj))
    }
  }
  function addOpt(qno,ono)
  {
    if (localStorage.getItem("qT"+qno) === null)
    {
      let temp=localStorage.getItem("q"+qno)
      let obj=JSON.parse(temp)
      obj.ono++
      obj.option.push("")
      localStorage.setItem('q'+qno,JSON.stringify(obj))
      save()
    }
  }
  function removeOpt(qno,ono)
  {
    if(localStorage.getItem("qT"+qno) === null)
    {
      let temp=localStorage.getItem("q"+qno)
      let obj=JSON.parse(temp)
      obj.ono--
      obj.option.pop()
      localStorage.setItem('q'+qno,JSON.stringify(obj));
      save()
    }
  }
function removeQues(qno)
{

    let quest=parseInt(localStorage.getItem("quest"))
    save()
    for(let i=qno+1;i<quest;i++)
    {
        let k =i-1
        let temp=localStorage.getItem("q"+i)
        localStorage.setItem('q'+k,temp)
        if(localStorage.getItem("qT"+qno) != null)
        {
         localStorage.setItem("qT"+k,"Text Area")
         localStorage.removeItem("qT"+i)
        }
    }
    if (quest!=0)
    {
        quest--;
        localStorage.removeItem("q"+quest)
        localStorage.setItem("quest",quest)
        localStorage.removeItem("qT"+quest)
    }
  
  
    /*
    quest -> Question Count
    q0  {
        "title": "ABCD",
        "type": "text",

    }
    ques0 = JSON.parse(localStorage.getItem("q0"));
    ele.value = ques0.title;
    
    */   
}
function addQues()
{
    let quest=parseInt(localStorage.getItem("quest"));
    let temp = {title:'',ono:1,option:['']}
    localStorage.setItem("q"+quest,JSON.stringify(temp))
    quest++;
    localStorage.setItem("quest",quest)
    save()
}
function clearLocal()
{
    localStorage.clear();
}
if (localStorage.getItem("quest") === null)
{
    localStorage.setItem("quest",1);
    let q0={title:'', ono:1 ,option:['']}
    localStorage.setItem('q0',JSON.stringify(q0))
}
  //typeChange();
let q=parseInt(localStorage.getItem("quest"));
for(let i=0;i<q;i++)
{
    let temp = localStorage.getItem("q"+i)
    let obj = JSON.parse(temp)
    console.log(obj)
    document.getElementsByName('ques'+i)[0].value=obj.title
    for(let j=0;j<obj.ono;j++)
    {
        document.getElementsByName("ques"+i+"opt"+j)[0].value=obj.option[j]
        console.log(j+"for"+i)
    }
}
  //document.getElementById('option_type').addEventListener('change', typeChange);
