
const routineTest = document.getElementById("routine-test");
const typeTest = document.getElementById("type-test");
const reCert = document.getElementById("re-certification");
const docker1 = document.getElementById("docker-1");
const docker2 = document.getElementById("docker-2");
const docker3 = document.getElementById("docker-3");

  routineTest.addEventListener("click", toggleForm1);

  typeTest.addEventListener("click", toggleForm2);

  reCert.addEventListener("click", toggleForm3);


function toggleForm1 () {
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

window.onscroll = function(ev) {
  let header = document.getElementById("header");
  if (window.scrollY >= 60) { 
    if(header) {header.style.backgroundColor = "#7CC68D"; }
    
  } else {
    if(header) {  header.style.backgroundColor = "white"; }
   
  }
};

