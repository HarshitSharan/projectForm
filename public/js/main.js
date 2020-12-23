const BASE_URL = 'http://localhost:5500'
const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})


const shareLinkBtn = document.querySelector('#share-link');

shareLinkBtn.addEventListener('click', (e) => {
    axios.get(`${BASE_URL}/get-link`).then((res) => {
        alert("Copied");
    }).catch(err => console.log(err));
})