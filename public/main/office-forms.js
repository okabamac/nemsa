const routineTest = document.getElementById('routine-test');
const typeTest = document.getElementById('type-test');
const reCert = document.getElementById('re-certification');
const docker1 = document.getElementById('docker-1');
const docker2 = document.getElementById('docker-2');
const docker3 = document.getElementById('docker-3');


function toggleForm1() {
  routineTest.style.backgroundColor = 'green';
  typeTest.style.backgroundColor = 'dodgerblue';
  reCert.style.backgroundColor = 'dodgerblue';
  docker1.style.display = 'block';
  docker2.style.display = 'none';
  docker3.style.display = 'none';
}

function toggleForm2() {
  typeTest.style.backgroundColor = 'green';
  routineTest.style.backgroundColor = 'dodgerblue';
  reCert.style.backgroundColor = 'dodgerblue';
  docker2.style.display = 'block';
  docker1.style.display = 'none';
  docker3.style.display = 'none';
}

function toggleForm3() {
  reCert.style.backgroundColor = 'green';
  routineTest.style.backgroundColor = 'dodgerblue';
  typeTest.style.backgroundColor = 'dodgerblue';
  docker3.style.display = 'block';
  docker1.style.display = 'none';
  docker2.style.display = 'none';
}

routineTest.addEventListener('click', toggleForm1);

typeTest.addEventListener('click', toggleForm2);

reCert.addEventListener('click', toggleForm3);

window.onscroll = function (ev) {
  const header = document.getElementById('header');
  if (window.scrollY >= 60) {
    if (header) {
      header.style.display = 'none';
    }
  } else if (header) {
    header.style.display = 'block';
  }
};

const addYearsToDate = (input, addYears, id) => {
  const yearAdded = input.setFullYear(input.getFullYear() + addYears);
  const expDate = document.getElementById(`${id}`);
  const monthFunc = (m) => {
    const newMonth = m + 1;
    if (newMonth < 10) {
      return (`0${newMonth}`);
    }
    return newMonth;
  };
  const dayFunc = (d) => {
    let newDay;
    if (d < 10) {
      newDay = `0${d}`;
    }
    if (d === '00') {
      newDay = '01';
    }
    return newDay;
  };
  const year = new Date(yearAdded).getFullYear();
  const month = new Date(yearAdded).getMonth();
  const day = new Date(yearAdded).getDay();
  expDate.value = `${year}-${monthFunc(month)}-${dayFunc(day)}`;
};
const dateRoutineTest1 = document.getElementById('dateRoutineTest1');
if (dateRoutineTest1) {
  dateRoutineTest1.addEventListener('input', (e) => {
    addYearsToDate(new Date(e.target.value), 3, 'expDate1');
  });
}

const dateRoutineTest2 = document.getElementById('dateRoutineTest2');
if (dateRoutineTest2) {
  dateRoutineTest2.addEventListener('input', (e) => {
    addYearsToDate(new Date(e.target.value), 3, 'expDate2');
  });
}
const addRoutine = document.getElementById('add-routine');
if (addRoutine) {
  addRoutine.addEventListener('submit', (e) => {
    e.preventDefault();
    const messages1 = document.getElementById('messages-1');
    messages1.innerHTML = '';
    const loader = document.getElementsByClassName('loader');
    loader[0].style.display = 'block';
    const form = document.getElementById('add-routine');
    const formData = new URLSearchParams(new FormData(form));
    fetch('/routineTest', {
      method: 'POST',
      body: formData,
    })
      .then(r => r.json().then(data => ({
        status: r.status,
        body: data,
      })))
      .then((obj) => {
        if (obj.status === 200) {
          loader[0].style.display = 'none';
          messages1.innerHTML = obj.body.message;
        } else {
          console.log(obj);
          loader[0].style.display = 'none';
          messages1.innerHTML = obj.body.message;
        }
      })
      .catch(() => {
        loader[0].style.display = 'none';
        messages1.innerHTML = 'Please try again later';
      });
  });
}
const addType = document.getElementById('add-type');
if (addType) {
  addType.addEventListener('submit', (e) => {
    e.preventDefault();
    const messages2 = document.getElementById('messages-2');
    messages2.innerHTML = '';
    const loader = document.getElementsByClassName('loader');
    loader[1].style.display = 'block';
    const form = document.getElementById('add-type');
    const formData = new URLSearchParams(new FormData(form));
    fetch('/typeTest', {
      method: 'POST',
      body: formData,
    })
      .then(r => r.json().then(data => ({
        status: r.status,
        body: data,
      })))
      .then((obj) => {
        if (obj.status === 200) {
          loader[1].style.display = 'none';
          messages2.innerHTML = obj.body.message;
        } else {
          loader[1].style.display = 'none';
          messages2.innerHTML = obj.body.message;
        }
      })
      .catch(() => {
        loader[1].style.display = 'none';
        messages2.innerHTML = 'Please try again later';
      });
  });
}

const addReCertification = document.getElementById('add-reCertification');
if (addReCertification) {
  addReCertification.addEventListener('submit', (e) => {
    e.preventDefault();
    const messages3 = document.getElementById('messages-3');
    messages3.innerHTML = '';
    const loader = document.getElementsByClassName('loader');
    loader[2].style.display = 'block';
    const form = document.getElementById('add-reCertification');
    const formData = new URLSearchParams(new FormData(form));
    fetch('/reCertification', {
      method: 'POST',
      body: formData,
    })
      .then(r => r.json().then(data => ({
        status: r.status,
        body: data,
      })))
      .then((obj) => {
        if (obj.status === 200) {
          loader[2].style.display = 'none';
          messages3.innerHTML = obj.body.message;
        } else {
          loader[2].style.display = 'none';
          messages3.innerHTML = obj.body.message;
        }
      })
      .catch(() => {
        loader[2].style.display = 'none';
        messages3.innerHTML = 'Please try again later';
      });
  });
}
