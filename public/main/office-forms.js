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
      header.style.display = "none";
    }

  } else {
    if (header) {
      header.style.display = "block";
    }

  }
};

const capitalize = (string) => {
  string.value = string.value.split(' ').map(eachWord =>
    eachWord.charAt(0).toUpperCase() + eachWord.slice(1).toLowerCase()
  ).join(' ');
};

const addYearsToDate = (input, addYears) => {
 const yearAdded = input.setFullYear(input.getFullYear() + addYears);
  const expDate = document.getElementById('expDate');
  const monthFunc = (m) => {
    let newMonth = m + 1;
    if (newMonth<10){
      return ('0' + newMonth);
    }
    return newMonth;
  };
  const dayFunc = (d) => {
    if(d<10) {
      return '0'+ d;
    }
    return d;
  };
  const year = new Date(yearAdded).getFullYear();
  const month =  new Date(yearAdded).getMonth();
  const day =  new Date(yearAdded).getDay();
  expDate.value = `${year}-${monthFunc(month)}-${dayFunc(day)}`;
};
const dateRoutineTest = document.getElementById('dateRoutineTest');
if (dateRoutineTest) {
  dateRoutineTest.addEventListener('input', e => {
    addYearsToDate(new Date(e.target.value), 10);
  });
}
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
        } else {
          loader[0].style.display = 'none';
          messages1.innerHTML = obj.body.msg;
        }
      })
      .catch(err => {
        messages1.innerHTML = 'Please try again';
      });
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
        } else {
          loader[1].style.display = 'none';
          messages2.innerHTML = obj.body.msg;
        }
      })
      .catch(err => {
        messages2.innerHTML = 'Please try again';
      });
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
        } else {
          loader[2].style.display = 'none';
          messages3.innerHTML = obj.body.msg;
        }
      })
      .catch(err => {
        messages3.innerHTML = 'Please try again';
      });
  });
}