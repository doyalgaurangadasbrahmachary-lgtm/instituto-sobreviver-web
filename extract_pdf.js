const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

async function extract() {
    try {
        const dir = 'web site';
        // Try the smaller file first
        const pdfFile = 'INSTITUTO.pdf';

        console.log(`Reading file: ${pdfFile}`);
        let dataBuffer = fs.readFileSync(path.join(dir, pdfFile));

        const data = await pdf(dataBuffer);
        console.log('--- START TEXT ---');
        console.log(data.text);
        console.log('--- END TEXT ---');
    } catch (e) {
        console.error('Error extracting PDF:', e);
    }
}

extract();
