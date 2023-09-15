const pupp = require("puppeteer");
const hbs = require("handlebars");
const path = require("path");
const fs = require("fs-extra");
const fss = require("fs");

const compile = async function (templateName, data) {
  const templateFilePath = path.join(
    process.cwd(),
    "template",
    `${templateName}.hbs`
  );
  const html = await fs.readFile(templateFilePath, "utf-8");
  return hbs.compile(html)(data);
};

exports.reportGenerate = async (fileName, data) => {
  try {
    const browser = await pupp.launch({
      args: ["--no-sandbox"],
      headless: "new"
    });
    const page = await browser.newPage();

    const content = await compile("page", data);

    await page.setContent(content);
    await page.emulateMediaType("screen");

    const downloadPath = path.join(
      process.cwd(),
      "generatedFile",
      `${fileName}-${Date.now()}.pdf`
    );

    let buffer = await page.pdf({
      path: downloadPath,
      format: "A4",
      margin: { top: 20 },
      printBackground: true,
    });

    //if you don't want to save the file on disk you can uncomment this code
    // fss.unlink(downloadPath, (err => {
    //   if (err) console.log(err);
    //   else {
    //     console.log("Temporary report pdf deleted");
    //   }
    // }));

    await browser.close();

    return Promise.resolve(buffer);
  } catch (error) {
    return Promise.reject("error ", error);
  }
};
