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
          const columnName = 'ZIPCODE'; // Replace with your column name
          const modifiedData = results.data.map(row => {
              if (row[columnName]) {
                  row[columnName] = modifyValue(row[columnName]); // Modify the column value
              }
              return row;
             
          });
          console.log(modifiedData[columnName]);

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





/*
let testObject = {
  "zipCodes" : ["06255","80124", "06266","06277"]
}

for (let key in testObject) {
  // New array for zipcodes after moving 0 to the back
  const newZip = [];

  //Checking if key has an array
  if (Array.isArray(testObject[key])) {
    for (let i = 0; i < testObject[key].length; i++) {

      // getting each zipcode
       const zip = testObject[key][i];
       
      // Checking if first number is 0
       if(zip[0] == 0) {
        const zipCode = zip.substring(1)
        const zipCodes = zipCode + '0';
        newZip.push(zipCodes);
       }
       else {
        newZip.push(zip);
       }
    }
  }
  console.log(newZip);
}
*/