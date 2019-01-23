const routineTest = document.getElementById("routine-test");
const typeTest = document.getElementById("type-test");
const reCert = document.getElementById("re-certification");
const docker1 = document.getElementById("docker-1");
const docker2 = document.getElementById("docker-2");
const docker3 = document.getElementById("docker-3");

routineTest.addEventListener("click", toggleForm1);

typeTest.addEventListener("click", toggleForm2);

reCert.addEventListener("click", toggleForm3);


function toggleForm1() {
  routineTest.style.backgroundColor = "green";
  typeTest.style.backgroundColor = "dodgerblue";
  reCert.style.backgroundColor = "dodgerblue";
  docker1.style.display = "block";
  docker2.style.display = "none";
  docker3.style.display = "none"
};

function toggleForm2() {
  typeTest.style.backgroundColor = "green";
  routineTest.style.backgroundColor = "dodgerblue";
  reCert.style.backgroundColor = "dodgerblue";
  docker2.style.display = "block";
  docker1.style.display = "none";
  docker3.style.display = "none";
}

function toggleForm3() {
  reCert.style.backgroundColor = "green";
  routineTest.style.backgroundColor = "dodgerblue";
  typeTest.style.backgroundColor = "dodgerblue";
  docker3.style.display = "block";
  docker1.style.display = "none";
  docker2.style.display = "none";
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

const addRoutine = document.getElementById("add-routine");
if (addRoutine) {
  addRoutine.addEventListener("submit", e => {
    e.preventDefault();
    let messages1 = document.getElementById("messages-1");
    messages1.innerHTML = "";
    const loader = document.getElementsByClassName("loader");
    loader[0].style.display = 'block';
    const form = document.getElementById("add-routine");
    const formData = new URLSearchParams(new FormData(form));
    fetch("/routineTest", {
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
          messages1.innerHTML = obj.body.msg;
          form.reset();
        } else {
          loader[0].style.display = 'none';
          messages1.innerHTML = obj.body.msg;
        }
      })
      .catch(err => console.log(err));
  });
}
const addType = document.getElementById("add-type");
if (addType) {
  addType.addEventListener("submit", e => {
    e.preventDefault();
    let messages2 = document.getElementById("messages-2");
    messages2.innerHTML = "";
    const loader = document.getElementsByClassName("loader");
    loader[1].style.display = 'block';
    const form = document.getElementById("add-type");
    const formData = new URLSearchParams(new FormData(form));
    fetch("/typeTest", {
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
          loader[1].style.display = 'none';
          messages2.innerHTML = obj.body.msg;
          form.reset();
        } else {
          loader[1].style.display = 'none';
          messages2.innerHTML = obj.body.msg;
        }
      })
      .catch(err => console.log(err));
  });
}

const addReCertification = document.getElementById("add-reCertification");
if (addReCertification) {
  addReCertification.addEventListener("submit", e => {
    e.preventDefault();
    let messages3 = document.getElementById("messages-3");
    messages3.innerHTML = "";
    const loader = document.getElementsByClassName("loader");
    loader[2].style.display = 'block';
    const form = document.getElementById("add-reCertification");
    const formData = new URLSearchParams(new FormData(form));
    fetch("/reCertification", {
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
          loader[2].style.display = 'none';
          messages3.innerHTML = obj.body.msg;
          form.reset();
        } else {
          loader[2].style.display = 'none';
          messages3.innerHTML = obj.body.msg;
        }
      })
      .catch(err => console.log(err));
  });
}