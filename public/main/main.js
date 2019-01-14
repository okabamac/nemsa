// function generateSerial  () {
//     const serial = Math.floor(Math.random() * 900000000000) + 100000000000;
//    document.getElementById('serialInput').value = serial;
//    }
   
//    const generateButton = document.getElementById('generateButton');
//    generateButton.addEventListener('click', generateSerial);
const routineTest = document.getElementById('routine-test');
const typeTest = document.getElementById('type-test');
const docker1 = document.getElementById('docker-1');
const docker2 = document.getElementById('docker-2');

routineTest.addEventListener('click', toggleForm1);
typeTest.addEventListener('click', toggleForm2);


function toggleForm1 () {
 routineTest.style.backgroundColor = 'green';
 typeTest.style.backgroundColor = 'dodgerblue';
 docker1.style.display = 'block';
 docker2.style.display = 'none';
}

function toggleForm2 () {
    routineTest.style.backgroundColor = 'dodgerblue';
    typeTest.style.backgroundColor = 'green';
    docker1.style.display = 'none';
    docker2.style.display = 'block';
   }


   window.onscroll = function(ev) {
       let header = document.getElementById('header');
       if (window.scrollY >= 60 ) {
         header.style.backgroundColor = '#7CC68D';
       } else {
          header.style.backgroundColor = 'white';
       }
   };
