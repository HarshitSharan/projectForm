function typeChange() {

    var inputBox = document.getElementById('type');
    if (this.value==='checkbox')
    {
        inputBox.type='checkbox'
        console.log("checkbox")
    }
    else if(this.value==='radio')
    {
        inputBox.type='radio'
        console.log("radio")
    }
    else
    {
        inputBox.type='text'
        console.log("text")
    }
  }
  //typeChange();
  document.getElementById('option_type').addEventListener('change', typeChange);