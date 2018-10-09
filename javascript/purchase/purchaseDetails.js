const purchaseDetails = [];
let purchaseDetailsIndex = -1;
const countryCodes = [{ country: 'India', code: '+91' }, { country: 'UK', code: '+44' }];

resetPurchaseDetailsForm();

selectedCountryCode();

function getPurchaseDetailsValues() {
  const firstName = document.getElementById('firstNameInput').value;
  const lastName = document.getElementById('lastNameInput').value;
  const purchaseCountry = document.getElementById('countryInput').value;
  const purchaseMobileNo = document.getElementById('mobileNoInput').value;
  const purchasePrice = document.getElementById('itemPriceInput').value;
  const purchaseCountryCodeLabel = document.getElementById('countryCodeLabel').innerHTML;

  return { firstName, lastName, purchaseCountry, purchaseMobileNo, purchasePrice, purchaseCountryCodeLabel };
}

function validatePurchaseDetails(purchaseItem) {
  let isError = false;

  if (purchaseItem.firstName === '') {
    document.getElementById('firstNameValidate').style.visibility = 'visible';
    document.getElementById('firstNameValidate').innerHTML = 'Please enter first name';

    isError = true;
  }

  if (purchaseItem.lastName === '') {
    document.getElementById('lastNameValidate').style.visibility = 'visible';
    document.getElementById('lastNameValidate').innerHTML = 'Please enter last name';

    isError = true;
  }

  if (purchaseItem.purchaseMobileNo === '') {
    document.getElementById('mobileNoValidate').style.visibility = 'visible';
    document.getElementById('mobileNoValidate').innerHTML = 'Please enter mobile number';

    isError = true;
  } else {
    const ptn = /^\d{10}/g;
    if (ptn.test(purchaseItem.purchaseMobileNo) === false) {
      document.getElementById('mobileNoValidate').style.visibility = 'visible';
      document.getElementById('mobileNoValidate').innerHTML = 'Mobile number must be of 10 digits';

      isError = true;
    }
  }

  if (purchaseItem.purchasePrice === '') {
    document.getElementById('itemPriceValidate').style.visibility = 'visible';
    document.getElementById('itemPriceValidate').innerHTML = 'Please enter item purchase price';

    isError = true;
  }

  if (isError) {
    return false;
  }
  return true;
}

function isNumber(event, type) {
  if (type == 'mobileNo') {
    if (event.which > 31 && (event.which < 48 || event.which > 57)) {
      return false;
    }
    return true;
  } else if (type == 'purchasePrice') {
    if (event.which > 31 && event.which != 46 && (event.which < 48 || event.which > 57)) {
      return false;
    }
    return true;
  }
}

// function selectedCountryCode() {
//   const selectedCountryData = getPurchaseDetailsValues();

//   const selectedCountryCodeValue = countryCodes.find(function(index) {
//     return index.country === selectedCountryData.purchaseCountry;
//   });
//   // console.log(selectedCountryCodeValue);
//   documnet.getElementById('countryCodeLabel').innerHTML = selectedCountryCodeValue.code;
// }

function selectedCountryCode() {
  let selectedCountryData = document.getElementById('countryInput').value;

  const selectedCountryCodeValue = countryCodes.find(function(index) {
    return index.country === selectedCountryData;
  });

  document.getElementById('countryCodeLabel').innerHTML = selectedCountryCodeValue.code;
}

function addPurchaseDetails() {
  const purchaseDetail = getPurchaseDetailsValues();
  if (validatePurchaseDetails(purchaseDetail)) {
    purchaseDetails.push(purchaseDetail);

    addPurchaseDetailsRows(purchaseDetail);
  }
}

function addPurchaseDetailsRows(purchaseDetailsRowData) {
  const purchaseDetailsTable = document.getElementById('purchaseDetailsTable');

  const purchaseDetailsTableHeaders = purchaseDetailsTable.rows[0].cells;

  const purchaseDetailsTableRow = purchaseDetailsTable.insertRow(purchaseDetailsTable.rows.length);

  for (let i = 0; i < purchaseDetailsTableHeaders.length; i++) {
    const purchaseDetailTableCell = purchaseDetailsTableRow.insertCell(i);
    if (purchaseDetailsTableHeaders[i].id === 'purchaseName') {
      purchaseDetailTableCell.innerHTML = purchaseDetailsRowData.firstName + ' ' + purchaseDetailsRowData.lastName;
    } else if (purchaseDetailsTableHeaders[i].id === 'purchaseMobileNo') {
      purchaseDetailTableCell.innerHTML =
        purchaseDetailsRowData.purchaseCountryCodeLabel + ' ' + purchaseDetailsRowData.purchaseMobileNo;
    } else if (purchaseDetailsTableHeaders[i].id === 'editPurchase') {
      purchaseDetailTableCell.innerHTML = '<button onclick="getPurchaseDetailsData(this)">Edit</button>';
    } else if (purchaseDetailsTableHeaders[i].id === 'deletePurchase') {
      purchaseDetailTableCell.innerHTML = '<button onclick="deletePurchaseDetails(this)">Delete</button>';
    } else {
      purchaseDetailTableCell.innerHTML = purchaseDetailsRowData[purchaseDetailsTableHeaders[i].id];
    }
  }
  resetPurchaseDetailsForm();
}

function getPurchaseDetailsData(button) {
  const selectedRowIndex = button.parentNode.parentNode.rowIndex;

  const selectedpurchseItem = purchaseDetails[selectedRowIndex - 1];

  document.getElementById('firstNameInput').value = selectedpurchseItem.firstName;
  document.getElementById('lastNameInput').value = selectedpurchseItem.lastName;
  document.getElementById('countryInput').value = selectedpurchseItem.purchaseCountry;
  document.getElementById('mobileNoInput').value = selectedpurchseItem.purchaseMobileNo;
  document.getElementById('itemPriceInput').value = selectedpurchseItem.purchasePrice;

  document.getElementById('addPurchaseDetailsBtn').style.visibility = 'hidden';
  document.getElementById('updatePurchaseDetailsBtn').style.visibility = 'visible';

  purchaseDetailsIndex = selectedRowIndex - 1;
}

function updatePurchaseDetails() {
  const purchaseDetail = getPurchaseDetailsValues();

  if (validatePurchaseDetails(purchaseDetail)) {
    purchaseDetails[purchaseDetailsIndex].firstName = purchaseDetail.firstName;
    purchaseDetails[purchaseDetailsIndex].lastName = purchaseDetail.lastName;
    purchaseDetails[purchaseDetailsIndex].purchaseCountry = purchaseDetail.purchaseCountry;
    purchaseDetails[purchaseDetailsIndex].purchaseMobileNo = purchaseDetail.purchaseMobileNo;
    purchaseDetails[purchaseDetailsIndex].purchasePrice = purchaseDetail.purchasePrice;

    updatePurchaseDetailsRow(purchaseDetail);

    resetPurchaseDetailsForm();
  }
}

function updatePurchaseDetailsRow(purchaseDetailRowUpdatedData) {
  const purchaseDetailsTable = document.getElementById('purchaseDetailsTable');
  purchaseDetailsTable.rows[purchaseDetailsIndex + 1].cells[0].innerHTML =
    purchaseDetailRowUpdatedData.firstName + ' ' + purchaseDetailRowUpdatedData.lastName;
  purchaseDetailsTable.rows[purchaseDetailsIndex + 1].cells[1].innerHTML = purchaseDetailRowUpdatedData.purchaseCountry;
  purchaseDetailsTable.rows[purchaseDetailsIndex + 1].cells[2].innerHTML =
    purchaseDetailRowUpdatedData.purchaseCountryCodeLabel + ' ' + purchaseDetailRowUpdatedData.purchaseMobileNo;
  purchaseDetailsTable.rows[purchaseDetailsIndex + 1].cells[3].innerHTML = purchaseDetailRowUpdatedData.purchasePrice;
}

function deletePurchaseDetails(button) {
  const purchaseDetailsTable = document.getElementById('purchaseDetailsTable');

  const selectedRowIndex = button.parentNode.parentNode.rowIndex;

  purchaseDetailsTable.deleteRow(selectedRowIndex);

  purchaseDetails.slice(selectedRowIndex - 1, 1);
}

function resetPurchaseDetailsForm() {
  document.getElementById('purchaseDetailsForm').reset();

  document.getElementById('addPurchaseDetailsBtn').style.visibility = 'visible';
  document.getElementById('updatePurchaseDetailsBtn').style.visibility = 'hidden';

  document.getElementById('firstNameValidate').style.visibility = 'hidden';
  document.getElementById('lastNameValidate').style.visibility = 'hidden';
  document.getElementById('mobileNoValidate').style.visibility = 'hidden';
  document.getElementById('itemPriceValidate').style.visibility = 'hidden';
}
