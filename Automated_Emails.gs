function checkConditions() {
  var dateTime = new Date();
  var today = dateTime.getDay();
  var spreadSheet = SpreadsheetApp.getActiveSheet();
  var range = spreadSheet.getRange('A1:B1');
  // Fetch values for each row in the Range. Extract data and assign to variables
  var data = range.getValues();  
  var dayRange = spreadSheet.getRange('C2');
  var yesterday = parseInt(dayRange.getValue());
  var columnRange = spreadSheet.getRange(2,4);
  var columnNum = parseInt(columnRange.getValue());
  var textRange = spreadSheet.getRange(columnNum, 2);
  var text = textRange.getValue(); 
  var salutationRange = spreadSheet.getRange(columnNum, 1);
  var salutation = salutationRange.getValue();
  var recipientRange = spreadSheet.getRange('E2');
  var recipient = recipientRange.getValue();
  var subjectRange = spreadSheet.getRange('F2');
  var subject = subjectRange.getValue();
  var emailRange = spreadSheet.getRange('G2');
  var email = emailRange.getValue();
  var message = "Dear " + recipient + ", \n\n" + text + "\n\n" + salutation;
  if (today != yesterday){
    if (columnNum < 12) {
      // This logic (increment before functionality) has to be like this, probably due to the delay in updating
      columnNum ++
      columnRange.setValue(columnNum);
      sendMessage(email, subject, message, today, dayRange);
    }
    else {
      columnNum = 2
      columnRange.setValue(columnNum);
      sendMessage(email, subject, message, today,dayRange);
    }
  }
}

function sendMessage(email, subject, message, today, dayRange) {
  MailApp.sendEmail(email, subject, message);
  dayRange.setValue(today);
}
