const SPREADSHEETID = "1k55sp6DwPFX82Ksf2mRzTuFpzeCVFhsJfOeftZXfQm4";
const RANGE = "A1:d100";

const sheetContent = document.getElementById("sheet-content");

// select spreadsheet owned by user

// select sheet in spreadsheet

// select row with correct date

// add row below (check for multiple rows for same date)


function getValues(spreadsheetId=SPREADSHEETID, range=RANGE, callback=getValuesCB) {
  // spreadsheetId = SPREADSHEETID;
  // range = RANGE;
  // callback = getValuesCB;
  try {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    }).then((response) => {
      const result = response.result;
      const numRows = result.values ? result.values.length : 0;
      console.log(`${numRows} rows retrieved.`);
      if (callback) callback(response);
    });
  } catch (err) {
    // document.getElementById('content').innerText = err.message;
    document.getElementById('sheetContent').innerText = err.message;
    return;
  }
}

function getValuesCB(response){
  console.log(response);
  sheetContent.innerHTML = "";
  console.log("getValuesCB()");
  
  console.log(typeof(response.result.values[0][0]));
  
  for (let i=0; i < response.result.values.length; i++) {
    for (let j=0; j<response.result.values[i].length; j++) {
      if (j == 0){
        totalLength=20;
      }
      else{
        totalLength=15;
      }
      const paddedStr = "|" + (response.result.values[i][j]).padStart(totalLength, "_") + "|";
      console.log(paddedStr);
      sheetContent.innerHTML += paddedStr;
    }
    sheetContent.innerHTML += "<br>";
  }
}

// function getLastRow(spreadSheetId){
//   try{
//     gapi.client.sheets.spreadsheets.values.get({

//     })
//   }
// }


