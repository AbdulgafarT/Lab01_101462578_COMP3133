const fs = require('fs');
const csv = require('csv-parser');

if (fs.existsSync('canada.txt')) {
    fs.unlinkSync('canada.txt');
}
if (fs.existsSync('usa.txt')) {
    fs.unlinkSync('usa.txt');
}
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        const { country } = row;

        if (country.toLowerCase() === 'canada') {
            fs.appendFileSync('canada.txt', `${JSON.stringify(row)}\n`);
        } else if (country.toLowerCase() === 'united states') {
            fs.appendFileSync('usa.txt', `${JSON.stringify(row)}\n`);
        }
    })
    .on('end', () => {
        console.log('CSV processing completed.');
    });
