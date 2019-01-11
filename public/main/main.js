function generateSerial  () {
    const serial = Math.floor(Math.random() * 900000000000) + 100000000000;
   document.getElementById('serialInput').value = serial;
   }
   
   const generateButton = document.getElementById('generateButton');
   generateButton.addEventListener('click', generateSerial);
   
   window.onscroll = function(ev) {
       let header = document.getElementById('header');
       if (window.scrollY >= 60 ) {
         header.style.backgroundColor = '#7CC68D';
       } else {
          header.style.backgroundColor = 'white';
       }
   };