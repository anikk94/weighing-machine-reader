// get a list of all the spreadsheets that the user has
function listDriveFiles() {
  // alert("listDriveFiles()");

  gapi.client.drive.files.list({
    q: "mimeType='application/vnd.google-apps.spreadsheet'",
    fields:"files(id, name)"
  })
  .then(response=>{
    const files=response.result.files;
    if(files && files.length>0){
      const pDriveFiles = document.getElementById("drive-files");
      pDriveFiles.innerHTML = " ";
      files.forEach(file=>{
        console.log(`Spreadsheet Name: ${file.name}, ID: ${file.id}`);
        pDriveFiles.innerHTML += `Spreadsheet Name: ${file.name}<br>\n`;
      });
    } else {
      console.log('No spreadsheets found.');
    }
  })
  .catch(error=>{
    if(error.status == 401){
      google.accounts.id.prompt();
    }
  });
}


// find the id of the spreadsheet with name 'body weight tracker'
function getBodyWeightTrackerSpreadsheetId() {
  let spreadsheetId;
  gapi.client.drive.files.list({
    q: "mimeType='application/vnd.google-apps.spreadsheet'",
    fields:"files(id, name)"
  })
  .then(response=>{
    const files=response.result.files;
    if(files && files.length>0){
      const pDriveFiles = document.getElementById("drive-files");
      pDriveFiles.innerHTML = " ";
      files.forEach(file=>{
        if(file.name === "body weight tracker") {
          spreadsheetId = file.id;
          pDriveFiles.innerHTML = `file found, spreadsheet id: ${spreadsheetId}.`;
        }
      });
    } else {
      console.log('spreadsheet not found.');
    }
  })
  .catch(error=>{
    if(error.status == 401){
      google.accounts.id.prompt();
    }
  });  
}
