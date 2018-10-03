isError = false;
resetInvoiceForm();

function getInvoiceData() {
  const itemName = document.getElementById('itemNameInput').value;
  const itemCategory = document.getElementById('itemCategoryInput').value;
  const itemPrice = document.getElementById('itemPriceInput').value;

  return { itemName, itemCategory, itemPrice };
}

function validateInvoiceData() {
  const itemInvoiceData = getInvoiceData();

  if (itemInvoiceData.itemName === '') {
    document.getElementById('validateItemName').style.visibility = 'visible';
    isError = true;
  }
  if (itemInvoiceData.itemPrice === '') {
    document.getElementById('validateItemPrice').style.visibility = 'visible';
    isError = true;
  }

  if (isError) {
    return false;
  }
  return true;
}

function calculateGst() {
  const item = getInvoiceData();
  if (item.itemPrice !== '') {
    let percentage;
    switch(item.itemCategory){
      case 'Clothes':
        percentage = 12;
        break;
      case 'Snacks':
        percentage = 5;
        break;
      case 'Vegetables':
        percentage = 2;
        break;
      case 'Fruits':
        percentage = 10;
        break;
      default:
        percentage = 1;
    }
    const price = parseInt(item.itemPrice);
    const gstValue = (price * percentage) / 100;

    const total = price + gstValue;

    document.getElementById('itemGstInput').value = gstValue;
    document.getElementById('itemTotalPriceInput').value = total;
  } else {
    document.getElementById('itemGstInput').value = '';
    document.getElementById('itemTotalPriceInput').value = '';
  }

  
}

function resetInvoiceForm() {
  document.getElementById('validateItemName').style.visibility = 'hidden';
  document.getElementById('validateItemPrice').style.visibility = 'hidden';
}
