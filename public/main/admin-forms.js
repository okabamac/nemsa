const docker1 = document.getElementById('docker-1');
const docker2 = document.getElementById('docker-2');
const addUser = document.getElementById('add');
const remove_user = document.getElementById('remove');

addUser.addEventListener('click', toggleAddUserForm);

remove_user.addEventListener('click', toggleRemoveUserForm);

function toggleAddUserForm() {
  docker1.style.display = 'block';
  docker2.style.display = 'none';
  addUser.style.backgroundColor = 'green';
  remove_user.style.backgroundColor = 'dodgerblue';
}

function toggleRemoveUserForm() {
  docker2.style.display = 'block';
  docker1.style.display = 'none';
  remove_user.style.backgroundColor = 'green';
  addUser.style.backgroundColor = 'dodgerblue';

}

window.onscroll = function (ev) {
  let header = document.getElementById('header');
  if (window.scrollY >= 60) {
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
          message1.innerHTML = obj.body[0].msg;
          form.reset();
        } else {
          loader[0].style.display = 'none';
          message1.innerHTML = obj.body[0].msg;
        }
      })
      .catch(err => console.log(err));
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
            firstName,
            lastName,
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
              <td data-label='First Name' contenteditable='true'>${firstName}</td>
              <td data-label='Last Name' contenteditable='true'>${lastName}</td>
              <td data-label='Email' contenteditable='true'>${staffEmail}</td>
              <td data-label='ID' contenteditable='true'>${staffID}</td>
              <td data-label='Administrator' contenteditable='true'>${admin}</td>
              <td data-label='Modify'><button class='btn-save'>Save</button></td>
            </tr>
            </tbody>
            </table>`;
          result += `<button class='delete'>Delete</button>`;
          loader[1].style.display = 'none';
          message2.style.color = '#333';
          message2.innerHTML = result;
        } else {
          message2.style.color = 'red';
          loader[1].style.display = 'none';
          message2.innerHTML = obj.body.message;
        }
      })
      .catch(err => console.log(err));
  });
}