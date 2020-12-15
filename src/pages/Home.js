const { ipcRenderer } = require("electron");

document.getElementById("xd").addEventListener("click", () => {
  const args = {
    Abstract: document.getElementById("abstract").value,
    Dp: document.getElementById("dp").value,
  };
  if (ipcRenderer.invoke("create-item", args)) {
    alert("item created");
  } else {
    alert("item not created something went wrong");
  }
});

document.getElementById("getitems").addEventListener("click", () => {
  ipcRenderer.invoke("List-Items").then((list) => {
    if (list != null) {
      console.log(list);
      const element = document.getElementById("items");
      list.forEach(item => {
          element.innerText +="item"+ item.dataValues.id+ ": "+ item.dataValues.Abstract + "\n"
      });
    } else {
      alert("something went wrong cant fetch data");
    }
  });
});
