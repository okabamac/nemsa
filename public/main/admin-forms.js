const docker1 = document.getElementById("docker-1");
const docker2 = document.getElementById("docker-2");
const addUser = document.getElementById('add');
const remove_user = document.getElementById('remove');

addUser.addEventListener("click", toggleAddUserForm);

remove_user.addEventListener("click", toggleRemoveUserForm);

function toggleAddUserForm() {
  docker1.style.display = "block";
  docker2.style.display = "none";
  addUser.style.backgroundColor = "green";
  remove_user.style.backgroundColor = "dodgerblue";
}

function toggleRemoveUserForm() {
  docker2.style.display = "block";
  docker1.style.display = "none";
  remove_user.style.backgroundColor = "green";
  addUser.style.backgroundColor = "dodgerblue";

}

window.onscroll = function (ev) {
  let header = document.getElementById("header");
  if (window.scrollY >= 60) {
    if (header) {
      header.style.backgroundColor = "#7CC68D";
    }

  } else {
    if (header) {
      header.style.backgroundColor = "white";
    }

  }
};

const add_user = document.getElementById("add_user");
if (add_user) {
  add_user.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById('messages').innerHTML = "";
    const loader = document.getElementsByClassName("loader");
    loader[0].style.display = 'block';
    let error = document.getElementById("messages");
    const form = document.getElementById("add_user");
    const formData = new FormData(form);
    fetch("/addUser", {
        method: "POST",
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
          error.innerHTML = obj.body[0].msg;
          form.reset();
        } else {
          loader[0].style.display = 'none';
          error.innerHTML = obj.body[0].msg;
        }
      })
      .catch(err => console.log(err));
  });
}