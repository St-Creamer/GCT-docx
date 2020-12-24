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
      return {Title : element.Title , Abstract : element.Abstract , Dp : element.Dp}
    });
    
    var columnDefs = [
      { headerName: 'Title', field: 'Title' },
      { headerName: 'Abstract', field: 'Abstract' },
      { headerName: 'Dp', field: 'Dp' }
    ];

    var gridOptions = {
      columnDefs: columnDefs,
      rowData: rowdata
    };

    var eGridDiv = document.querySelector('#myGrid');
    new Grid(eGridDiv, gridOptions);
  })
  .catch(er=>{
    console.log(er)
  });

// specify the data



document.getElementById("homepage").addEventListener("click", () => {
    window.location.href = "../../index.html";
  });
  