const { ipcRenderer } = require("electron");

document.getElementById("xd").addEventListener("click", (e) => {
  e.preventDefault();
  //making args object to send multiple vars as arguments
  const args = {
    Title: document.getElementById("title").value,
    Abstract: document.getElementById("abstract").value,
    Dp: document.getElementById("dp").value,
  };
  if(args.Title == ""|| args.Abstract ==""){
    alert("Must fill fields")
    return 0;
  }
  //sending data to main to save in db
  if (ipcRenderer.invoke("create-item", args)) {
    alert("item created");
  } else {
    alert("item not created something went wrong");
  }
});

document.getElementById("homepage").addEventListener("click", () => {
  window.location.href = "../../index.html";
});
