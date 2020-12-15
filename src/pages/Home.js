const {ipcRenderer} = require('electron');

document.getElementById("xd").addEventListener('click',()=>{
    const args = {Abstract : document.getElementById("abstract").value , Dp : document.getElementById("dp").value}
    if(ipcRenderer.invoke('create-item',args)){
        alert("item created")
    }else{
        alert("item not created something went wrong")
    }
})

document.getElementById("getitems").addEventListener('click',()=>{
    ipcRenderer.on('List-Items')
        .then((res)=>{
            console.log(res)
            // if(list!= null){
            //     console.log(list)
            //     document.getElementById("items").innerText = list
            // }else{
            //     alert("something went wrong cant fetch data")
            // }
        });
});