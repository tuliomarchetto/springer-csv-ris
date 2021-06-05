import csv from 'csv-parser';
import fs from 'fs';
import axios from 'axios';

fs.closeSync(fs.openSync('SearchResults.ris', 'w'));

fs.createReadStream('SearchResults.csv').pipe(csv()).on('data', async (row: any) => {
  const url = `https://citation-needed.springer.com/v2/references/${row['Item DOI']}?format=refman&flavour=citation`;
  const response: any = await axios.get(url);
  fs.appendFileSync('SearchResults.ris', response.data + '\n');
});

