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
    //Grid setup
    //changing object format to suit ag-grid setup
    let rowdata = data.map(element=>{
      let x;
      if(element.Dp == 1){
        x = true;
      }else{
        x = false
      }
      return {id:element.id ,Title : element.Title , Abstract : element.Abstract , Dp : x}
    });
    //column definitions
    var columnDefs = [
      {headerName:"id", field:'id'},
      { headerName: 'Title', field: 'Title' },
      { headerName: 'Abstract', field: 'Abstract' },
      { headerName: 'Dp', field: 'Dp' }
    ];
    //setting grid options
    var gridOptions = {
      columnDefs: columnDefs,
      rowData: rowdata,
      rowSelection : 'single',
      //dynamic grid size
      onGridReady:(params)=>{
        params.api.sizeColumnsToFit();
        window.addEventListener('resize' , ()=>{
          setTimeout(()=>{
            params.api.sizeColumnsToFit();
          })
        })
      }
      
    };
    //instantiating grid object and assigning the corresponding data and grid options
    var eGridDiv = document.querySelector('#myGrid');
    new Grid(eGridDiv, gridOptions);
    gridOptions.api.sizeColumnsToFit();
  })
  .catch(er=>{
    console.log(er)
  });

  //homepage function
document.getElementById("homepage").addEventListener("click", () => {
  window.location.href = "../Index/index.html";
});

//reveal in explorer function
document.getElementById("opendir").addEventListener('click',()=>{
  const path = require("path");
  const fs = require('fs')
  const {exec ,spawn} = require("child_process");
  console.log(process.env.AppData)
  spawn(`explorer`, [`"${path.join(process.env.AppData, `.docx Documents`)}"`], { windowsVerbatimArguments: true });
})
