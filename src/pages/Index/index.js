const path = require('path')

document.getElementById("btn").addEventListener("click", () => {
  window.location.href = "../AddItem/AddItem.html";
});

document.getElementById("getitems").addEventListener("click", () => {
  window.location.href = "../DataGrid/DataGrid.html";
});

//setting template document
document.getElementById("config").addEventListener("click",()=>{
  const { dialog } = require('electron').remote
  const fs = require('fs')
  const filters =  [
      { name: 'Word Document', extensions: ['docx'] },
    ];
  dialog.showOpenDialog({ properties: ['openFile'] , filters })
    .then(s=>{
      if(s.filePaths.length !=0){
        fs.copyFile(s.filePaths[0],`${path.join(process.env.AppData,`.docx Template`)}/Template.docx`,(err)=>{
          if(err) throw err;
          alert('Template set!')
        })
      }
    })
})