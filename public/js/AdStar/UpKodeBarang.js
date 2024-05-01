$("#tabel_Barang").DataTable();
$("#tabel_Barang2").DataTable();


 // // Click event handler for table rows
 $('#tabel_Barang tbody').on('click', 'tr', function() {
    // Get the data from the clicked row
    var nama = $(this).data('nama');
    var kode = $(this).data('kode');
    var idbrng = $(this).data('idbrng');

    // Populate the form fields with the data
    $('#input1').val(idbrng);
    $('#nama-barang').val(nama);
});

    // // Click event handler for table rows
    $('#tabel_Barang2 tbody').on('click', 'tr', function() {

        var rowData = $("#tbl_nmbrng").DataTable().row(this).data();
        $('#kd-barang').val(rowData[1]);
        $('#input2').val(rowData[0]);
    });

const btclistdata = document.getElementById('btclistdata')

btclistdata.addEventListener("click", function () {
    var namaBrgValue = document.getElementById('nama-barang').value;

    // Mengambil substring dari karakter 4 hingga 6 (3 karakter)
    var nama = namaBrgValue.substring(3, 6);

    // console.log(nama);
    // return;

    fetch("/AdStarUpKodeBarang/" + nama + ".datakodebarang")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Assuming the response is in JSON format
        })
        .then((data) => {
            // Handle the data retrieved from the server (data should be an object or an array)
            console.log(data);
            // Clear the existing table rows
            $("#tabel_Barang2").DataTable().clear().draw();

            // Loop through the data and create table rows
            data.forEach((item) => {
                var row = [item.NAMA_BRG, item.KD_BRG];
                $("#tabel_Barang2").DataTable().row.add(row);
            });

            // Redraw the table to show the changes
            $("#tabel_Barang2").DataTable().draw();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});


// // Sample data for demonstration purposes
// const tableData = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Alice Johnson" },
//     // Add more data here
// ];

// function openModal() {
//     document.getElementById('myModal').style.display = 'block';
//     document.getElementById('overlay').style.display = 'block';
//     populateTable(tableData);
// }

// function closeModal() {
//     document.getElementById('myModal').style.display = 'none';
//     document.getElementById('overlay').style.display = 'none';
// }

function populateTable(data) {
    const tableBody = document.querySelector('#TableDivisi tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>
                            <button onclick="addDataToForm(${item.id}, '${item.name}')">
                                Add
                            </button>
                        </td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
}

function searchData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const maxRows = parseInt(document.getElementById('maxRowsInput').value);

    // Filter the tableData based on the search input
    const filteredData = tableData.filter(item => {
        return item.name.toLowerCase().includes(searchValue);
    });

    // Limit the number of rows to display based on the maxRows input
    const slicedData = filteredData.slice(0, maxRows);

    populateTable(slicedData);
}

function addDataToForm(id, name) {
    // Here, you can implement the logic to add the selected data
    // (id and name) to another form or perform any other desired action.
    console.log(`Selected Data: ID-${id}, Name-${name}`);
}

function updateData() {
    // Implement the functionality to update the data here
    // Retrieve the data from the form fields and send it to the server
    const idbrng = $('#nama-barang').val();
    const nama = $('#input1').val();
    const kode = $('#input2').val();

    // You can use Ajax or other methods to send the data to the server for updating
    console.log('Updating data...');
    console.log(`ID: ${idbrng}, Nama: ${nama}, Kode: ${kode}`);
}

saveButton.addEventListener("click", function () {

    var id = document.getElementById('input1').value;
    var kd_brng = document.getElementById('kd-barang').value;

        let data = {
            id: id,
            kd_brg: kd_brng,
        };
        console.log(data);

        const formContainer = document.getElementById("form-container");
        const form = document.createElement("form");
        form.setAttribute("action", "AdStarUpKodeBarang/{IDLOG}");
        form.setAttribute("method", "POST");

        // Loop through the data object and add hidden input fields to the form
        for (const key in data) {
            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", key);
            input.value = data[key]; // Set the value of the input field to the corresponding data
            form.appendChild(input);
        }
        // Create method input with "PUT" Value
        const method = document.createElement("input");
        method.setAttribute("type", "hidden");
        method.setAttribute("name", "_method");
        method.value = "PUT"; // Set the value of the input field to the corresponding data
        form.appendChild(method);

        // Create input with "Update Keluarga" Value
        const ifUpdate = document.createElement("input");
        ifUpdate.setAttribute("type", "hidden");
        ifUpdate.setAttribute("name", "_ifUpdate");
        ifUpdate.value = "Update Kode Barang"; // Set the value of the input field to the corresponding data
        form.appendChild(ifUpdate);

        formContainer.appendChild(form);

        // Add CSRF token input field (assuming the csrfToken is properly fetched)
        let csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        let csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_token";
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        // Wrap form submission in a Promise
        function submitForm() {
            return new Promise((resolve, reject) => {
                form.onsubmit = resolve; // Resolve the Promise when the form is submitted
                form.submit();
            });
        }

        // Call the submitForm function to initiate the form submission
        submitForm()
            .then(() => console.log("Form submitted successfully!"))
            .catch((error) => console.error("Form submission error:", error));
    }
);

