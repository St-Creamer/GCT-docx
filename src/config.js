const fs = require("fs")
const path = require("path")
//creating folders for app resources
module.exports = setDir = ()=>{
    if (!fs.existsSync(path.join(process.env.AppData, `.docx Documents`))){
        fs.mkdirSync(path.join(process.env.AppData, `.docx Documents`));
    }
    if (!fs.existsSync(path.join(process.env.AppData, `.docx Template`))){
        fs.mkdirSync(path.join(process.env.AppData, `.docx Template`));
    }
}
