//dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
//add new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

//update username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //update name via chatroom class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);

  //reset the form
  newNameForm.reset();
  //shou the update message for a moment
  updateMssg.innerText = `Your username was updated to ${newName}`;
  setTimeout(() => (updateMssg.innerText = ""), 2000);
});
// update the chat room
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});
//check local storage for aname
const username = localStorage.username ? localStorage.username : "anon";
//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);
// get the chats and render
chatroom.getChats((data) => {
  chatUI.render(data);
});
