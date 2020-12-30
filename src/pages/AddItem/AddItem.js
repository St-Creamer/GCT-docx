const { ipcRenderer } = require("electron");
const fs = require('fs')
const path = require('path')

const title = document.getElementById("title"); 
const abstract = document.getElementById("abstract"); 
let dp;
//using 1 or 0 instead of true or false because Sqlite doesnt support boolean
document.getElementById("dp").checked ? dp=1 : dp = 0;

//submitting logic
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  //checking if template is set
  fs.readdir(path.join(process.env.AppData, `.docx Template`),(err,files)=>{
    if(err){
      console.error(err)
    }
    if(files.length>0){
      //making args object to send multiple vars as arguments
      const args = {
        Title: title.value,
        Abstract: abstract.value,
        Dp: dp
      };
      if(args.Title == ""|| args.Abstract ==""){
        alert("Must fill all fields")
      }else{
        //if fields filled sending data to main to save in db
        if (ipcRenderer.invoke("create-item", args)) {
          alert("Item created!");
        } else {
          alert("item not created something went wrong");
        }
      }
    }else{
      alert("Please set Template first");
    }
    title.value = "";
    abstract.value = "";
  })
});

document.getElementById("homepage").addEventListener("click", () => {
  window.location.href = "../Index/index.html";
});
