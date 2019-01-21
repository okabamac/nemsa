const search = document.getElementById("search");
if (search) {
    search.addEventListener("submit", e => {
        e.preventDefault();
        const form = document.getElementById("search");
        const formData = new FormData(form);
        const searchParam = formData.getAll('serialNumber');
        fetch(`/verify/${searchParam}`, {}).then((response) => response.json()).then(function (data) {
            let result = `<h2> Meter Details </h2>`;
                const {
                    id,
                    name,
                    email
                } = data;
                result +=
                    `<table>
                    <th>lorem</th>
                    <th>Ipsum</th>
                    <th>Dolor</th>
                    <th>Methaop</th>
                    <th>Noojdj</th>
                    <th>Hjiakd</th>
                    <tr>
                    <td>${id}</td>
                    <td>${email}</td>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${name}</td>
                    <td>${email}</td>
                    </tr>
                    </table>`;

                document.getElementById('messages').innerHTML = result;
        }).catch(function (err) {
            console.log(err);
        });
    });
}