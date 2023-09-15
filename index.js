const { reportGenerate } = require("./helper/ReportGenerate");
async function generatePdf() {
  let ReportDeta = {
    name: "Shakib al hasan",
    address: "Bangladesh",
    payling_role: "Allrounder",
    list: [
      {
        format: "Test",
        match: "66",
        runs: "4454",
        hs: "217",
        avs: "39.07",
      },
      {
        format: "ODI",
        match: "239",
        runs: "7304",
        hs: "134",
        avs: "37.27",
      },
      {
        format: "T20I",
        match: "117",
        runs: "2382",
        hs: "84",
        avs: "23.82",
      },
    ],
  };

  const fileName = "shakib_al_hasan_statistics";
  let buffer = await reportGenerate(fileName, ReportDeta);

  //you can use this buffer if you want to upload this file to any storage (like: AWS S3)
}
generatePdf();
