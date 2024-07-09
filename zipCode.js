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
