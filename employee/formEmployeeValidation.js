let errorMessage = '';
let Employees = [];
let employeeIndex = -1;
let countryCodes = [
  { country: 'India', code: '+91' },
  { country: 'UK', code: '+44' },
  { country: 'US', code: '+1' },
  { country: 'Canada', code: '+1' }
];

resetEmployeeForm();
countryCodesSelection();

function validateEmployee(fName, lName, designation, age, country, mobileNo, emailAddress) {
  let isError = false;
  if (fName === '') {
    document.getElementById('fNameValidation').style.visibility = 'visible';
    isError = true;
  }

  if (lName === '') {
    document.getElementById('lNameValidation').style.visibility = 'visible';
    isError = true;
  }

  if (designation === '') {
    document.getElementById('designationValidation').style.visibility = 'visible';
    isError = true;
  }

  if (age === '' || age < 18 || age > 60) {
    document.getElementById('ageValidation').style.visibility = 'visible';
    isError = true;
  }

  // if (country === '') {
  //   errorMessage += 'Please enter country \n';
  //   isError = true;
  // }

  if (mobileNo === '') {
    document.getElementById('mobileNoValidation').style.visibility = 'visible';
    document.getElementById('mobileNoValidation').innerHTML = 'Please enter mobile no';
    isError = true;
  } else {
    const ptn = /^\d{10}/g;
    if (ptn.test(mobileNo) === false) {
      document.getElementById('mobileNoValidation').style.visibility = 'visible';
      document.getElementById('mobileNoValidation').innerHTML = 'Mobile number must be of atleast 10 digits';
      isError = true;
    }
  }

  // if (emailAddress !== '') {
  //   const ptn = /^[A-z0-9_.-]+@[A-z]+\.[A-z]+/g;
  //   if (ptn.test(emailAddress) === false) {
  //     errorMessage += 'Email must be of the type abc@xyz.def\n';
  //     isError = true;
  //   }
  // }

  const ptn = /^[A-z0-9_.-]+@[A-z]+\.[A-z]+/g;
  if (!ptn.test(emailAddress) && emailAddress !== '') {
    document.getElementById('emailAddressValidation').style.visibility = 'visible';
    isError = true;
  }

  if (isError) {
    return false;
  }
  return true;
}

function countryCodesSelection() {
  let country = document.getElementById('country').value;
  console.log(country);

  const countryValues = countryCodes.filter(function(value) {
    return value.country === country;
  });
  console.log(Array.isArray(countryValues));
  document.getElementById('countryCodeLabel').innerHTML = countryValues[0].code;
}

function allowNumbers(event) {
  console.log(event.key);
  if (event.which > 31 && (event.which < 48 || event.which > 57)) {
    return false;
  }
  return true;
}

function refreshEmployeeTable() {
  const table = document.getElementById('employeeTable');

  const headers = table.rows[0].cells;

  const x = document.getElementById('employeeTable').rows.length;
  if (x > 1) {
    for (i = 1; i < x; i++) {
      table.deleteRow(1);
    }
  }

  Employees.forEach(function(item, index) {
    const row = table.insertRow(index + 1);

    for (i = 0; i < headers.length; i++) {
      const cell = row.insertCell(i);
      if (headers[i].id === 'name') {
        cell.innerHTML = item.title + ' ' + item.fName + ' ' + item.lName;
      } else if (headers[i].id === 'del') {
        cell.innerHTML = "<button onclick='deleteEmployee(this)'>Delete</button>";
      } else if (headers[i].id === 'edit') {
        cell.innerHTML = "<button onclick='editEmployee(this)'>Edit</button>";
      } else {
        cell.innerHTML = item[headers[i].id];
      }
    }
  });
}

function deleteEmployee(index) {
  const table = document.getElementById('employeeTable');
  const rowIndexValue = index.parentNode.parentNode.rowIndex;
  table.deleteRow(rowIndexValue);
  Employees.splice(rowIndexValue - 1, 1);
  console.log(Employees);
}

function editEmployee(index) {
  const rowIndexValue = index.parentNode.parentNode.rowIndex;

  const abcd = Employees[rowIndexValue - 1]; // -1 bcz header is at 0

  document.getElementById('title').value = abcd.title;
  document.getElementById('fName').value = abcd.fName;
  document.getElementById('lName').value = abcd.lName;
  document.getElementById('designation').value = abcd.designation;
  document.getElementById('age').value = abcd.age;
  document.getElementById('country').value = abcd.country;
  document.getElementById('mobileNo').value = abcd.mobile;
  document.getElementById('emailAddress').value = abcd.email;

  employeeIndex = rowIndexValue - 1; // update

  document.getElementById('updateEmployee').style.visibility = 'visible';
  document.getElementById('submitEmployee').style.visibility = 'hidden';
}

function updateEmployee() {
  const title = document.getElementById('title').value;
  const fName = document.getElementById('fName').value;
  const lName = document.getElementById('lName').value;
  const designation = document.getElementById('designation').value;
  const age = document.getElementById('age').value;
  const country = document.getElementById('country').value;
  const mobileNo = document.getElementById('mobileNo').value;
  const emailAddress = document.getElementById('emailAddress').value;

  if (validateEmployee(fName, lName, designation, age, country, mobileNo, emailAddress)) {
    const employee = Employees[employeeIndex];

    Employees[employeeIndex].title = title;
    Employees[employeeIndex].fName = fName;
    Employees[employeeIndex].lName = lName;
    Employees[employeeIndex].designation = designation;
    Employees[employeeIndex].age = age;
    Employees[employeeIndex].country = country;
    Employees[employeeIndex].mobile = mobileNo;
    Employees[employeeIndex].email = emailAddress;

    refreshEmployeeTable();

    resetEmployeeForm();
  }
}

function submitEmployee() {
  // console.log('hi');
  const title = document.getElementById('title').value;
  const fName = document.getElementById('fName').value;
  const lName = document.getElementById('lName').value;
  const designation = document.getElementById('designation').value;
  const age = document.getElementById('age').value;
  const country = document.getElementById('country').value;
  const mobileNo = document.getElementById('mobileNo').value;
  const emailAddress = document.getElementById('emailAddress').value;

  // let errorMessage='';

  if (validateEmployee(fName, lName, designation, age, country, mobileNo, emailAddress)) {
    const employee = {
      title,
      fName,
      lName,
      designation,
      age,
      country,
      mobile: mobileNo,
      email: emailAddress
    };
    // console.log(employee);

    Employees.push(employee);

    // console.log(Employees);

    resetEmployeeForm();

    refreshEmployeeTable(Employees);
  }
}

function resetEmployeeForm() {
  document.getElementById('employeeForm').reset();

  document.getElementById('updateEmployee').style.visibility = 'hidden';
  document.getElementById('submitEmployee').style.visibility = 'visible';

  document.getElementById('fNameValidation').style.visibility = 'hidden';
  document.getElementById('lNameValidation').style.visibility = 'hidden';
  document.getElementById('designationValidation').style.visibility = 'hidden';
  document.getElementById('ageValidation').style.visibility = 'hidden';
  document.getElementById('mobileNoValidation').style.visibility = 'hidden';
  document.getElementById('emailAddressValidation').style.visibility = 'hidden';
}

String.prototype.toTitleCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
