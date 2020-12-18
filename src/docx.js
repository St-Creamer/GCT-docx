const fs = require("fs");
const { Document, Packer, Paragraph, TextRun } = require("docx");

module.exports = function writeDocx(sampletext) {
  const doc = new Document();
  const dir = "./documents/"+sampletext+".docx";

  doc.addSection({
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun("bababoui \n \r"),
          new TextRun({
            text: sampletext,
            bold: true,
          }),
        ],
      }),
    ],
  });
  if (!fs.existsSync("./documents")){
    fs.mkdirSync("./documents");
  }
  Packer.toBuffer(doc).
    then((buffer) => {
      fs.writeFileSync(dir, buffer);
    })
    .catch((err)=>{
      console.log("issue with creating docx"+err)
      return false;
    });
};
