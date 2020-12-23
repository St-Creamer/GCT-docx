const { ipcRenderer } = require("electron");

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title"); 
  const abstract = document.getElementById("abstract"); 
  const dp = document.getElementById("dp"); 
  //making args object to send multiple vars as arguments
  const args = {
    Title: title.value,
    Abstract: abstract.value,
    Dp: dp.value,
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
  title.value = "";
  abstract.value = "";
  dp.value = false;
});

document.getElementById("homepage").addEventListener("click", () => {
  window.location.href = "../../index.html";
});
