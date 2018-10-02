let errorMessage = '';
const itemDetails = [];
let itemDetailsIndex = -1;

resetItemDetailsForm();

function getItemDetailsValues() {
  const itemName = document.getElementById('itemNameInput').value;
  const itemCategory = document.getElementById('itemCategoryInput').value;
  const itemRetailPrice = document.getElementById('itemRetailPriceInput').value;
  const itemWholesalePrice = document.getElementById('itemWholesalePriceInput').value;

  return { itemName, itemCategory, itemRetailPrice, itemWholesalePrice };
}

function validateItemDetails(item) {
  isError = false;

  if (item.itemName === '') {
    // errorMessage += 'Item Name cannot be empty \n';
    document.getElementById('itemNameValidation').style.visibility = 'visible';
    isError = true;
  }

  if (item.itemRetailPrice === '') {
    // errorMessage += 'Retail Price cannot be empty \n';
    document.getElementById('itemRetialPriceValidation').style.visibility = 'visible';
    isError = true;
  }

  if (item.itemWholesalePrice === '') {
    // errorMessage += 'Wholesale Price cannot be empty \n';
    document.getElementById('itemWholesalePriceValidation').style.visibility = 'visible';
    isError = true;
  }

  if (isError) {
    return false;
  }
  return true;
}

function isNumber(event) {
  if (event.which > 31 && event.which != 46 && (event.which < 48 || event.which > 57)) {
    return false;
  }
  return true;
}

function calculateItemWholesalePrice() {
  const item = getItemDetailsValues();

  if (item.itemRetailPrice !== '') {
    const itemWholesalePrice = item.itemRetailPrice / 2;
    document.getElementById('itemWholesalePriceInput').value = itemWholesalePrice;
  }
}

function addItemDetails() {
  const item = getItemDetailsValues();
  if (validateItemDetails(item)) {
    itemDetail = item;

    itemDetails.push(itemDetail);

    addItemDetailsRow(itemDetail);
  }
}

function addItemDetailsRow(item) {
  const itemTable = document.getElementById('itemDetailsTable');

  const itemTableHeaders = itemTable.rows[0].cells;

  const newRow = itemTable.insertRow(itemTable.rows.length);

  for (i = 0; i < itemTableHeaders.length; i++) {
    const newCell = newRow.insertCell(i);
    if (itemTableHeaders[i].id === 'editItem') {
      newCell.innerHTML = '<button onclick="editItemDetails(this)">Edit</button';
    } else if (itemTableHeaders[i].id === 'deleteItem') {
      newCell.innerHTML = '<button onclick="deleteItemDetails(this)">Delete</button';
    } else {
      newCell.innerHTML = item[itemTableHeaders[i].id];
    }
  }

  resetItemDetailsForm();
}

function editItemDetails(button) {
  const rowIndexValue = button.parentNode.parentNode.rowIndex;

  const item = itemDetails[rowIndexValue - 1];    // in array it at one less position so -1 and we will get the whole value of the array

  document.getElementById('itemNameInput').value = item.itemName;
  document.getElementById('itemCategoryInput').value = item.itemCategory;
  document.getElementById('itemRetailPriceInput').value = item.itemRetailPrice;
  document.getElementById('itemWholesalePriceInput').value = item.itemWholesalePrice;

  itemDetailsIndex = rowIndexValue - 1;     // same as above just we are saving the index for the update functionality here we will get the index only pointing to array only

  document.getElementById('updateItemBtn').style.visibility = 'visible';
  document.getElementById('addItemBtn').style.visibility = 'hidden';
}

function updateItemDetails() {
  const item = getItemDetailsValues();

  if (validateItemDetails(item)) {
    itemDetails[itemDetailsIndex].itemName = item.itemName;
    itemDetails[itemDetailsIndex].itemCategory = item.itemCategory;
    itemDetails[itemDetailsIndex].itemRetailPrice = item.itemRetailPrice;
    itemDetails[itemDetailsIndex].itemWholesalePrice = item.itemWholesalePrice;

    updateItemDetailsRow(item);

    resetItemDetailsForm();
  }
}

function updateItemDetailsRow(item) {
  const itemTable = document.getElementById('itemDetailsTable');

  const itemTableHeaders = itemTable.rows[0].cells;

  for (i = 0; i < itemTableHeaders.length; i++) {
    if (itemTableHeaders[i].id !== 'deleteItem' && itemTableHeaders[i].id !== 'editItem') {
      itemTable.rows[itemDetailsIndex + 1].cells[i].innerHTML = item[itemTableHeaders[i].id];
    }
  }
}

function deleteItemDetails(index) {
  const itemTable = document.getElementById('itemDetailsTable');
  const rowIndexValue = index.parentNode.parentNode.rowIndex;

  itemTable.deleteRow(rowIndexValue);

  itemDetails.splice(rowIndexValue - 1, 1);
}

function resetItemDetailsForm() {
  document.getElementById('itemDetailsForm').reset();
  
  document.getElementById('updateItemBtn').style.visibility = 'hidden';
  document.getElementById('addItemBtn').style.visibility = 'visible';

  document.getElementById('itemNameValidation').style.visibility = 'hidden';
  document.getElementById('itemRetialPriceValidation').style.visibility = 'hidden';
  document.getElementById('itemWholesalePriceValidation').style.visibility = 'hidden';
}

String.prototype.toTitleCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
