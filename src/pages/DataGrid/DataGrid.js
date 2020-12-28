const { Grid }  = require('ag-grid-community');
const {ipcRenderer} = require('electron');

let data = [];

ipcRenderer.invoke("List-Items").then((list) => {
    if (list != null) {
      data = list.map((element)=>{
        return element.dataValues
      })
    } else {
      alert("something went wrong cant fetch data");
    }
  })
  .then(()=>{  
    // let the grid know which columns and what data to use
    let rowdata = data.map(element=>{
      let x;
      if(element.Dp == 1){
        x = true;
      }else{
        x = false
      }
      return {Title : element.Title , Abstract : element.Abstract , Dp : x}
    });
    
    var columnDefs = [
      { headerName: 'Title', field: 'Title' },
      { headerName: 'Abstract', field: 'Abstract' },
      { headerName: 'Dp', field: 'Dp' }
    ];

    var gridOptions = {
      columnDefs: columnDefs,
      rowData: rowdata,
      onGridReady:(params)=>{
        params.api.sizeColumnsToFit();
        window.addEventListener('resize' , ()=>{
          setTimeout(()=>{
            params.api.sizeColumnsToFit();
          })
        })
      }
      
    };

    var eGridDiv = document.querySelector('#myGrid');
    new Grid(eGridDiv, gridOptions);
    gridOptions.api.sizeColumnsToFit();
  })
  .catch(er=>{
    console.log(er)
  });

// specify the data



document.getElementById("homepage").addEventListener("click", () => {
  window.location.href = "../../index.html";
});

document.getElementById("opendir").addEventListener('click',()=>{
  const path = require("path");
  const {exec ,spawn} = require("child_process");
  const {PROJECT_DIR} = require("../../../settings");
  console.log(path.join("../",PROJECT_DIR, `docx files`))
  spawn(`explorer`, [`"${path.join(PROJECT_DIR, `docx files`)}"`], { windowsVerbatimArguments: true });
})
