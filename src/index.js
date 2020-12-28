document.getElementById("btn").addEventListener("click", () => {
  window.location.href = "pages/AddItem/AddItem.html";
});

document.getElementById("getitems").addEventListener("click", () => {

  window.location.href = "pages/DataGrid/DataGrid.html";
});



document.getElementById("config").addEventListener("click",()=>{
  const { dialog } = require('electron').remote
  const fs = require('fs')
  const filters =  [
      { name: 'Word Document', extensions: ['docx'] },
    ];
  dialog.showOpenDialog({ properties: ['openFile'] , filters })
    .then(s=>{
      if(s.filePaths.length !=0){
          if (!fs.existsSync("./Template")){
            fs.mkdirSync("./Template");
            console.log("created dir")
          }
        fs.copyFile(s.filePaths[0],`./Template/Template.docx`,(err)=>{
          if(err) throw err;
          alert('template set')
        })
      }
    })
})