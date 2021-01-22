const { createWorker } = require('tesseract.js')
const worker = createWorker()

async function getTextFromImage() {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('./img/oko.png');
    await worker.terminate();

  }
  
getTextFromImage()
    .then(console.log);
