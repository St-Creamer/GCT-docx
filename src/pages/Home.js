const { ipcRenderer } = require("electron");
const writeDocx = require("../docx");

document.getElementById("xd").addEventListener("click", () => {
  //making args object to send multiple vars as arguments
  const args = {
    Title : document.getElementById("title").value,
    Abstract: document.getElementById("abstract").value,
    Dp: document.getElementById("dp").value,
  };
  //sending data to main to save in db
  if (ipcRenderer.invoke("create-item", args)) {
    alert("item created");
    writeDocx(args.Abstract);
  } else {
    alert("item not created something went wrong");
  }
});

document.getElementById("homepage").addEventListener("click", () => {
  window.location.href = "../index.html";
});
