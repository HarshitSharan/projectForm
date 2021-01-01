const BASE_URL = "http://localhost:5500/";
const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

const shareLinkBtn = document.getElementById("share-link");
if (shareLinkBtn) {
  shareLinkBtn.addEventListener("click", () => {
    axios
      .get(`${BASE_URL}getlink`, { withCredentials: true })
      .then((res) => {
        var copyTextarea = document.createElement("textarea");
        copyTextarea.style.position = "fixed";
        copyTextarea.style.opacity = "0";
        copyTextarea.textContent = `${BASE_URL}` + `public/${res.data}`;
        document.body.appendChild(copyTextarea);
        copyTextarea.select();
        document.execCommand("copy");
        alert("Code Copied: " + copyTextarea.textContent);
        document.body.removeChild(copyTextarea);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function typeChange(qno, fl) {
  localStorage.setItem("yha", "aaya" + fl);
  if (fl == 0) {
    if (localStorage.getItem("qT" + qno) != null) {
      localStorage.removeItem("qT" + qno);
    }
  } else {
    localStorage.setItem("yha aaya", "yay");
    let temp = localStorage.getItem("q" + qno);
    let obj = JSON.parse(temp);
    obj.ono = 1;
    localStorage.setItem("q" + qno, JSON.stringify(obj));
    localStorage.setItem("qT" + qno, "Text Area");
  }
  localStorage.setItem("scroll", window.scrollY);
}
function save() {
  let quest = parseInt(localStorage.getItem("quest"));

  for (let i = 0; i < quest; i++) {
    let temp = localStorage.getItem("q" + i);
    let obj = JSON.parse(temp);
    obj.title = document.getElementsByName("ques" + i)[0].value;
    let opt = obj.ono;
    for (let j = 0; j < opt; j++) {
      obj.option[j] = document.getElementsByName(
        "ques" + i + "opt" + j
      )[0].value;
    }
    localStorage.setItem("q" + i, JSON.stringify(obj));
  }
}
function addOpt(qno, ono) {
  save();
  if (localStorage.getItem("qT" + qno) === null) {
    let temp = localStorage.getItem("q" + qno);
    let obj = JSON.parse(temp);
    obj.ono++;
    obj.option.push("");
    localStorage.setItem("q" + qno, JSON.stringify(obj));
  }
  localStorage.setItem("scroll", window.scrollY);
}
function removeOpt(qno, ono) {
  save();
  if (localStorage.getItem("qT" + qno) === null) {
    let temp = localStorage.getItem("q" + qno);
    let obj = JSON.parse(temp);
    obj.ono--;
    obj.option.pop();
    localStorage.setItem("q" + qno, JSON.stringify(obj));
  }
  localStorage.setItem("scroll", window.scrollY);
}
function removeQues(qno) {
  let quest = parseInt(localStorage.getItem("quest"));
  save();
  localStorage.setItem("scroll", window.scrollY);
  for (let i = qno + 1; i < quest; i++) {
    let k = i - 1;
    let temp = localStorage.getItem("q" + i);
    localStorage.setItem("q" + k, temp);
    if (localStorage.getItem("qT" + qno) != null) {
      localStorage.setItem("qT" + k, "Text Area");
      localStorage.removeItem("qT" + i);
    }
  }
  if (quest != 0) {
    quest--;
    localStorage.removeItem("q" + quest);
    localStorage.setItem("quest", quest);
    localStorage.removeItem("qT" + quest);
  }
}
function addQues() {
  save();
  let quest = parseInt(localStorage.getItem("quest"));
  let temp = { title: "", ono: 1, option: [""] };
  localStorage.setItem("q" + quest, JSON.stringify(temp));
  quest++;
  localStorage.setItem("quest", quest);
  localStorage.setItem("scroll", window.scrollY);
}
function clearLocal() {
  localStorage.clear();
}
if (localStorage.getItem("quest") === null) {
  localStorage.setItem("quest", 1);
  let q0 = { title: "", ono: 1, option: [""] };
  localStorage.setItem("q0", JSON.stringify(q0));
}
if (localStorage.getItem("scroll") != null) {
  window.scrollTo(0, localStorage.getItem("scroll"));
}
//typeChange();
let q = parseInt(localStorage.getItem("quest"));
for (let i = 0; i < q; i++) {
  let temp = localStorage.getItem("q" + i);
  let obj = JSON.parse(temp);
  document.getElementsByName("ques" + i)[0].value = obj.title;
  for (let j = 0; j < obj.ono; j++) {
    document.getElementsByName("ques" + i + "opt" + j)[0].value = obj.option[j];
  }
}

//document.getElementById('option_type').addEventListener('change', typeChange);
