const { ipcRenderer } = require("electron");

document.getElementById("btn").addEventListener("click", () => {
  window.location.href = "pages/AddItem/AddItem.html";
});

document.getElementById("getitems").addEventListener("click", () => {
  // //get all itmes and display them
  // ipcRenderer.invoke("List-Items").then((list) => {
  //   if (list != null) {
  //     console.log(list);
  //     let element = document.getElementById("items");
  //     element.innerText = ""
  //     list.forEach((item) => {
  //       element.innerText += "item" + item.dataValues.id + ": " + item.dataValues.Title + "\n";
  //     });
  //   } else {
  //     alert("something went wrong cant fetch data");
  //   }
  // });
  window.location.href = "pages/DataGrid/DataGrid.html";
});
