const dateConvert = (date) => {
date = new Date(date).toUTCString();
date = date.split(' ').slice(0, 4).join(' ');
return date;
};


const search = document.getElementById("search");
if (search) {
    search.addEventListener("submit", e => {
        e.preventDefault();
        let messages = document.getElementById("messages");
        messages.innerHTML = "";
        const loader = document.getElementById('loader');
        loader.style.display = 'block';
        const form = document.getElementById("search");
        const formData = new FormData(form);
        const searchParam = formData.getAll('serialNumber');
        fetch(`/verify/${searchParam}`, {}).then(r =>
                r.json().then(data => ({
                    status: r.status,
                    body: data
                }))
            )
            .then(obj => {
                if (obj.status === 200) {
                    loader.style.display = 'none';
                    let result = ``;
                    const {
                       meterSerialNumber, meterClass, vendorName, dateRoutineTest, expDate
                    } = obj.body.meter;
                    const routineTestDate = dateConvert(dateRoutineTest);
                    const expiryDate = dateConvert(expDate);
                    result +=
                        `<table>
                    <caption>Meter Details</caption>
                    <thead>
                      <tr>
                        <th scope="col">Meter Number</th>
                        <th scope="col">Meter Class</th>
                        <th scope="col">Vendor Name</th>
                        <th scope="col">Date of Routine Test</th>
                        <th scope="col">Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="Meter Number">${meterSerialNumber}</td>
                        <td data-label="Meter Class">${meterClass}</td>
                        <td data-label="Vendor Name">${vendorName}</td>
                        <td data-label="Date of Routine Test">${routineTestDate}</td>
                        <td data-label="Expiry Date">${expiryDate}</td>
                      </tr>
                      </tbody>
                      </table>`;
                    loader.style.display = 'none';
                    messages.style.color = '#333';
                    messages.innerHTML = result;
                } else {
                    loader.style.display = 'none';
                    messages.style.color = 'red';
                    messages.innerHTML = obj.body.message;
                }
            })
            .catch(err => console.log(err));
    });
}