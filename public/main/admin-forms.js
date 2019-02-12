const docker1 = document.getElementById('docker-1');
const docker2 = document.getElementById('docker-2');
const docker3 = document.getElementById('docker-3');
const addUser = document.getElementById('add');
const modify = document.getElementById('modify');
const report = document.getElementById('report');


const miniDocker1 = document.getElementById('mini-docker-1');
const miniDocker2 = document.getElementById('mini-docker-2');
const byState = document.querySelector('#byState');
const byDate = document.querySelector('#byDate');


addUser.addEventListener('click', toggleAddUserForm);

modify.addEventListener('click', toggleRemoveUserForm);

report.addEventListener('click', toggleReportForm);


byState.addEventListener('click', toggleByStateForm);
byDate.addEventListener('click', toggleByDateForm);

const dateConvert = (date) => {
  date = new Date(date).toUTCString();
  date = date.split(' ').slice(0, 4).join(' ');
  return date;
};

function toggleAddUserForm() {
  docker1.style.display = 'block';
  docker2.style.display = 'none';
  docker3.style.display = 'none';
  addUser.style.backgroundColor = 'green';
  modify.style.backgroundColor = 'dodgerblue';
  report.style.backgroundColor = 'dodgerblue';
}

function toggleRemoveUserForm() {
  docker2.style.display = 'block';
  docker1.style.display = 'none';
  docker3.style.display = 'none';
  modify.style.backgroundColor = 'green';
  addUser.style.backgroundColor = 'dodgerblue';
  report.style.backgroundColor = 'dodgerblue';

}

function toggleReportForm() {
  docker3.style.display = 'block';
  docker1.style.display = 'none';
  docker2.style.display = 'none';
  modify.style.backgroundColor = 'dodgerblue';
  addUser.style.backgroundColor = 'dodgerblue';
  report.style.backgroundColor = 'green';

}

function toggleByStateForm() {
  miniDocker1.style.display = 'block';
  miniDocker2.style.display = 'none';
  byState.style.backgroundColor = 'green';
  byDate.style.backgroundColor = 'dodgerblue';
}

function toggleByDateForm() {
  miniDocker1.style.display = 'none';
  miniDocker2.style.display = 'block';
  byState.style.backgroundColor = 'dodgerblue';
  byDate.style.backgroundColor = 'green';
}
window.onscroll = function (ev) {
  let header = document.getElementById('header');
  if (window.scrollY >= 30) {
    if (header) {
      header.style.display = 'none';
    }

  } else {
    if (header) {
      header.style.display = 'block';
    }

  }
};


const capitalize = (string) => {
  string.value = string.value.split(' ').map(eachWord =>
    eachWord.charAt(0).toUpperCase() + eachWord.slice(1).toLowerCase()
  ).join(' ');
};
const add_user = document.getElementById('add_user');
if (add_user) {
  add_user.addEventListener('submit', e => {
    e.preventDefault();
    let message1 = document.getElementById('messages-1');
    message1.innerHTML = '';
    const loader = document.getElementsByClassName('loader');
    loader[0].style.display = 'block';
    const form = document.getElementById('add_user');
    const formData = new FormData(form);
    fetch('/addUser', {
        method: 'POST',
        body: formData
      })
      .then(r =>
        r.json().then(data => ({
          status: r.status,
          body: data
        }))
      )
      .then(obj => {
        if (obj.status === 200) {
          loader[0].style.display = 'none';
          message1.innerHTML = obj.body.message;
          form.reset();
        } else {
          loader[0].style.display = 'none';
          message1.innerHTML = obj.body.message;
        }
      })
      .catch(err => {
        console.log(err);
        message1.style.color = 'red';
        loader[0].style.display = 'none';
        message1.innerHTML = 'Please try again later';
      });
  });
}

const edit_user = document.getElementById('edit_user');
if (edit_user) {
  edit_user.addEventListener('submit', e => {
    e.preventDefault();
    let message2 = document.getElementById('messages-2');
    message2.innerHTML = '';
    const loader = document.getElementsByClassName('loader');
    loader[1].style.display = 'block';
    const form = document.getElementById('edit_user');
    const formData = new URLSearchParams(new FormData(form));

    fetch('/editUser', {
        method: 'POST',
        body: formData
      })
      .then(r =>
        r.json().then(data => ({
          status: r.status,
          body: data
        }))
      )
      .then(obj => {
        if (obj.status === 200) {
          loader[1].style.display = 'block';
          let result = ``;
          const {
            name,
            staffEmail,
            staffID,
            admin
          } = obj.body.staff;
          result +=
            `<table>
          <caption>Staff Details</caption>
          <thead>
            <tr>
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>ID</th>
              <th scope='col'>Administrator</th>
              <th scope='col'>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label='First Name' contenteditable='true'>${name.first}</td>
              <td data-label='Last Name' contenteditable='true'>${name.last}</td>
              <td data-label='Email' contenteditable='true'>${staffEmail}</td>
              <td data-label='ID' contenteditable='true'>${staffID}</td>
              <td data-label='Administrator' contenteditable='true'>${admin}</td>
              <td data-label='Modify'><button class='btn-save'>Save</button></td>
            </tr>
            </tbody>
            </table>`;
          result += `<button class='btn-delete'>Delete</button>`;
          loader[1].style.display = 'none';
          message2.style.color = '#333';
          message2.innerHTML = result;
        } else {
          message2.style.color = 'red';
          loader[1].style.display = 'none';
          message2.innerHTML = obj.body.message;
        }
      })
      .catch(err => {
        message2.style.color = 'red';
        loader[1].style.display = 'none';
        message2.innerHTML = 'Please try again later';
      });
  });
}

const byStateForm = document.getElementById('byStateForm');
if (byStateForm) {
  let table;
  byStateForm.addEventListener('submit', e => {
    e.preventDefault();
    const downloadBtns = document.querySelectorAll('div#downloadBtns');
    downloadBtns[0].style.display = 'none';
    let message11 = document.getElementById('messages-11');
    message11.style.display = 'none';
    const loader = document.getElementsByClassName('loader');
    loader[2].style.display = 'block';
    const form = document.getElementById('byStateForm');
    const formData = new URLSearchParams(new FormData(form));
    fetch('/byState', {
        method: 'POST',
        body: formData
      })
      .then(r =>
        r.json().then(data => ({
          status: r.status,
          body: data
        }))
      )
      .then(obj => {
        if (obj.status === 200) {
          loader[2].style.display = 'none';
          message11.style.color = '#333';
          message11.style.display = 'block';
          downloadBtns[0].style.display = 'block';
          table = new Tabulator("#messages-11", {
            height: "311px",
            data: obj.body.data, //load row data from array
            layout: "fitDataFill", //fit columns to width of table
            pagination: "local", //paginate the data
            paginationSize: 7, //allow 7 rows per page of data
            placeholder: "No Data Available", //display message to user on empty table
            resizableRows: true, //allow row order to be changed
            columns: [ //define the table columns
              {
                title: "Meter Number",
                field: "meterSerialNumber",
                width: 200,

              },
              {
                title: "Seal Number",
                field: "seal",
                width: 200,

              },
              {
                title: "Vendor Name",
                field: "vendorName",
                width: 200,

              },
              {
                title: "Date of Test",
                field: "dateRoutineTest",
                width: 200,
                formatter: dateConvert

              },
              {
                title: "Expiry Date",
                field: "expDate",
                width: 200,
                formatter: dateConvert

              },
            ],
          });
        } else {
          loader[2].style.display = 'none';
          message11.style.color = 'red';
          message11.innerHTML = 'Please try again later';
        }
      })
      .catch(err => {
        console.log(err);
        message11.style.display = 'block';
        message11.style.color = 'red';
        loader[2].style.display = 'none';
        message11.innerHTML = 'Please try again later';
      });
  });
    pdfBtn1 = document.getElementById('pdfBtn1');
    if (pdfBtn1) {
      pdfBtn1.addEventListener('click', () => {
       table.download("pdf", "data.pdf", {
         orientation: "portrait", //set page orientation to portrait
         title: "Dynamics Quotation Report", //add title to report
         jsPDF: {
           unit: "in", //set units to inches
         },
           margin: {
             top: 60
           }
       });
      });
    }
  csvBtn1 = document.getElementById('csvBtn1');
  if (csvBtn1) {
    csvBtn1.addEventListener('click', () => {
      table.download("csv", "data.csv");
    });
  }
}

const byDateForm = document.getElementById('byDateForm');

if (byDateForm) {
  let table2;
  byDateForm.addEventListener('submit', e => {
    e.preventDefault();
    let message12 = document.getElementById('messages-12');
    message12.style.display = 'none';
    const downloadBtns = document.querySelectorAll('div#downloadBtns');
    downloadBtns[1].style.display = 'none';
    const loader = document.getElementsByClassName('loader');
    loader[3].style.display = 'block';
    const form = document.getElementById('byDateForm');
    const formData = new URLSearchParams(new FormData(form));
    message12.innerHTML = "";
    fetch('/byDate', {
        method: 'POST',
        body: formData
      })
      .then(r =>
        r.json().then(data => ({
          status: r.status,
          body: data
        }))
      )
      .then(obj => {
        if (obj.status === 200) {
          loader[3].style.display = 'none';
          message12.style.color = '#333';
          message12.style.display = 'block';
          downloadBtns[1].style.display = 'block';
          table2 = new Tabulator("#messages-12", {
            height: "311px",
            data: obj.body.data, //load row data from array
            layout: "fitDataFill", //fit columns to width of table
            pagination: "local", //paginate the data
            paginationSize: 9, //allow 7 rows per page of data
            placeholder: "No Data Available", //display message to user on empty table
            resizableRows: true, //allow row order to be changed
            columns: [ //define the table columns
              {
                title: "Meter Number",
                field: "meterSerialNumber",
                width: 200,

              },
              {
                title: "Seal Number",
                field: "_id",
                width: 200,

              },
              {
                title: "Vendor Name",
                field: "vendorName",
                width: 200,

              },
              {
                title: "Date of Test",
                field: "dateRoutineTest",
                width: 200,
                formatter: dateConvert

              },
              {
                title: "Expiry Date",
                field: "expDate",
                width: 200,
                formatter: dateConvert

              },
            ],
          });
        } else {
          loader[3].style.display = 'none';
          message12.innerHTML = obj.body.message;
        }
      })
      .catch(err => {
        console.log(err);
        message12.style.display = 'block';
        message12.style.color = 'red';
        loader[3].style.display = 'none';
        message12.innerHTML = 'Please try again later';
      });
  });
 pdfBtn2 = document.getElementById('pdfBtn2');
 if (pdfBtn2) {
   pdfBtn2.addEventListener('click', () => {
     table2.download("pdf", "data.pdf", {
       orientation: "portrait", //set page orientation to portrait
       title: "Dynamics Quotation Report", //add title to report
       jsPDF: {
         unit: "in", //set units to inches
       },
       margin: {
         top: 60
       }
     });
   });
 }
 csvBtn2 = document.getElementById('csvBtn2');
 if (csvBtn2) {
   csvBtn2.addEventListener('click', () => {
     table2.download("csv", "data.csv");
   });
 }
}