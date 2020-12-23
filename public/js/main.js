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
  shareLinkBtn.addEventListener("click", getLink);
}

function getLink() {
  console.log("Get Link");
  axios
    .get(`${BASE_URL}getlink`, { withCredentials: true })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}
