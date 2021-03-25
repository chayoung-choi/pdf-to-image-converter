const { Poppler } = require('node-poppler');
const fs = require('fs');
const path = require('path');
const IN_DIR = './in';
const OUT_DIR = './out';
const END_DIR = './completed';

async function main(){
  await fs.readdir(IN_DIR, async (err, files) => {
    await files.forEach(async file => {
      console.log('[START Conversion]', file);
      await convert(file);
      console.log('[FINISH Conversion]', file);
    });
  });
}

async function convert(file){
  try {
    var info = path.parse(file);
    if ('.pdf' != info.ext){
      return;
    }
    const poppler = new Poppler();
    const options = {
    	firstPageToConvert: 1,
      resolutionXYAxis : 144,
    	pngFile: true,
    };
    const inFile = IN_DIR+"/"+file;
    const outFile = OUT_DIR+"/"+info.name;
    const res = await poppler.pdfToCairo(inFile, outFile, options);
    fs.rename(inFile, END_DIR+"/"+file, function(err) {
      if (err) throw err
    });
  } catch (e) {
    console.log(e);
  }
}

main();
