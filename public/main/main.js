
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

document.getElementById('add_user').addEventListener('submit', e => {
        e.preventDefault();
        let error = document.getElementById('messages');
        const form = document.getElementById('add_user');
        const formData = new URLSearchParams(new FormData(form));
        fetch('/addUser', {
                method: "POST",
                body: formData,
            }).then(r => r.json().then(data => ({
                status: r.status,
                body: data
            })))
            .then(obj => {
                if (obj.status === 200) {
                    error.innerHTML = obj.body[0].msg;
                    form.reset();
                } else {
                    error.innerHTML = obj.body[0].msg;
                }
            })
            .catch(err => (console.log(err)));
    });

