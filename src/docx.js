const fs = require("fs");
const { Document, Packer, Paragraph, TextRun } = require("docx");

module.exports = function writeDocx(sampletext) {
  const doc = new Document();

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

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("my document.docx", buffer);
  });
};
