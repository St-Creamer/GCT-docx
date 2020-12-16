const { ipcRenderer } = require("electron");

document.getElementById("btn").addEventListener("click", () => {
  window.location.href = "pages/Home.html";
});

document.getElementById("getitems").addEventListener("click", () => {
  console.log("ayyyy")
  ipcRenderer.invoke("List-Items").then((list) => {
    if (list != null) {
      console.log(list);
      const element = document.getElementById("items");
      list.forEach((item) => {
        element.innerText +=
          "item" + item.dataValues.id + ": " + item.dataValues.Abstract + "\n";
      });
    } else {
      alert("something went wrong cant fetch data");
    }
  });
});
