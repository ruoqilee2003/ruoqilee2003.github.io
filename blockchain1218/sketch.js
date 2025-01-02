function fetchJoke() {
  const url = "https://v2.jokeapi.dev/joke/Any?type=single"; // Single-line jokes API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.joke) {
        addJokeToChat(data.joke);
      } else {
        addJokeToChat("Sorry, couldn't fetch a joke!");
      }
    })
    .catch(() => addJokeToChat("An error occurred, please try again later!"));
}

function addJokeToChat(joke) {
  const chatBox = document.getElementById("chatBox");

  // Add user message
  const userBubble = document.createElement("div");
  userBubble.classList.add("chat-bubble", "user");
  userBubble.textContent = "Get me a joke!";
  chatBox.appendChild(userBubble);

  // Add bot response
  const botBubble = document.createElement("div");
  botBubble.classList.add("chat-bubble", "bot");
  botBubble.textContent = joke;
  chatBox.appendChild(botBubble);

  // Auto-scroll to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}
