const { ipcRenderer } = require("electron");
const writeDocx = require("../docx");

document.getElementById("xd").addEventListener("click", () => {
  const args = {
    Abstract: document.getElementById("abstract").value,
    Dp: document.getElementById("dp").value,
  };
  if (ipcRenderer.invoke("create-item", args)) {
    alert("item created");
    writeDocx(args.Abstract);
  } else {
    alert("item not created something went wrong");
  }
});

document.getElementById("homepage").addEventListener("click", () => {
  window.location.href = "../index.html";
});
