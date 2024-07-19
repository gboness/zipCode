const fs = require('fs');
const Papa = require('papaparse');

const inputFile = 'Cust_Sample.csv';
const outputFile = 'output.csv';

// Read the CSV file
fs.readFile(inputFile, 'utf8', (err, csvData) => {
    if (err) {
        console.error('Error reading the CSV file', err);
        return;
    }

    // Parse the CSV data
    Papa.parse(csvData, {
      header: true,
      complete: function(results) {
          // Modify the specific column
          const columnName = 'ZIPCODE ';
          const modifiedData = results.data.map(row => {
              if (row[columnName]) {
                  row[columnName] = modifyValue(row[columnName]);
              }
              return row;

          });
          

            // Convert back to CSV
            const csv = Papa.unparse(modifiedData);

            // Write the modified CSV back to a file
            fs.writeFile(outputFile, csv, 'utf8', err => {
                if (err) {
                    console.error('Error writing the CSV file', err);
                } else {
                    console.log('CSV file has been modified and saved as', outputFile);
                }
            });
        }
    });
});

function modifyValue(value) {
  // Example modification: Append a string to the existing value
  let strippedZip = value.trim();

  // checking if first number in zip code starts with 0
  if (strippedZip.startsWith('0')) {
    strippedZip = strippedZip.substring(1) + 0;
  }
  return strippedZip;
}