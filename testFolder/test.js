const button = document.querySelector(".btn");

button.addEventListener("click", (e) => {
  outputMessage(
    (question = {
      statement: "How to make form",
      type: "Sort type",
      answer: "Don't know!!",
    })
  );
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = ` <p class="meta">${question.statement} <span>${question.type}</span></p>
      <p class="text">
          ${question.answer}
      </p> `;

  document.querySelector(".chat-messages").appendChild(div);
}
