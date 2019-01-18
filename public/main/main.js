window.onscroll = function (ev) {
   let header = document.getElementById('header');
   if (window.scrollY >= 60) {
      header.style.backgroundColor = '#7CC68D';
   } else {
      header.style.backgroundColor = 'white';
   }
};