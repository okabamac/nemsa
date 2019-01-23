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
        fetch(`/verify/${searchParam}`, {}).then((response) => response.json()).then(function (data) {
            let result = ``;
                const {
                    id,
                    name,
                    email
                } = data;
                result +=
                    `<table>
                    <caption>Meter Details</caption>
                    <thead>
                      <tr>
                        <th scope="col">Serial Number</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Period</th>
                        <th scope="col">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="Serial Number">3Ph- 3412</td>
                        <td data-label="Amount">$90</td>
                        <td data-label="Period">03/01/2016 - 03/31/2016</td>
                        <td data-label="Due Date">04/01/2016</td>
                      </tr>
                      </tbody>
                      </table>`;
                    loader.style.display = 'none';
                messages.innerHTML = result;
        }).catch(function (err) {
            console.log(err);
        });
    });
}