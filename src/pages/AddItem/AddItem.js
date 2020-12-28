const { ipcRenderer } = require("electron");
const fs  = require('fs');


document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  if (!fs.existsSync("./Template")){
    alert("please set template");
    return;
  }
  const title = document.getElementById("title"); 
  const abstract = document.getElementById("abstract"); 
  let dp;
  document.getElementById("dp").checked ? dp=1 : dp = 0;
  console.log(dp)
  //making args object to send multiple vars as arguments
  const args = {
    Title: title.value,
    Abstract: abstract.value,
    Dp: dp
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
