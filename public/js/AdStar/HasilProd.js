$("#tabel_Barang2").DataTable();
$("#tabel_noorder").DataTable();

// // Click event handler for table rows
 // Mengambil semua elemen input tanggal
 const inputTanggalElements = document.querySelectorAll('input[type="date"]');

 // Mengatur nilai awal input tanggal ke tanggal hari ini
 const tanggalHariIni = new Date().toISOString().slice(0, 10);
 inputTanggalElements.forEach(function(inputElement) {
     inputElement.value = tanggalHariIni;
 });

 // Mengizinkan pengguna untuk mengubah tanggal secara manual
 inputTanggalElements.forEach(function(inputElement) {
     inputElement.addEventListener('change', function() {
         // Anda dapat mengakses tanggal yang diubah dengan inputElement.value
         // Contoh: const tanggalYangDiubah = inputElement.value;
     });
 });

 //
//--------------------------------------------------------------------------------------//

       // Mengambil semua elemen input waktu
       const inputWaktuElements = document.querySelectorAll('input[type="time"]');

       // Menghilangkan detik dari waktu saat ini
       const waktuSaatIni = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

       // Mengatur nilai awal input waktu ke waktu saat ini tanpa detik
       inputWaktuElements.forEach(function(inputElement) {
           inputElement.value = waktuSaatIni;
       });

       // Mengizinkan pengguna untuk mengubah waktu secara manual
       inputWaktuElements.forEach(function(inputElement) {
           inputElement.addEventListener('change', function() {
               // Anda dapat mengakses waktu yang diubah dengan inputElement.value
               // Contoh: const waktuYangDiubah = inputElement.value;
           });
       });

//--------------------------------------------------------------------------------------//

const ldtransaksi = document.getElementById('ld-transaksi');
var kodeSave;


ldtransaksi.addEventListener("click", function () {
    var idcust = document.getElementById('tanggal');
    fetch("/AdStarHasilProd/" + idcust.value + ".dataTransaksi")
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
            $("#tabel_notransaksi").DataTable().clear().draw();

            // Loop through the data and create table rows
            data.forEach((item) => {
                var row = [item.Nama_brg, item.id];
                $("#tabel_notransaksi").DataTable().row.add(row);
            });

            // Redraw the table to show the changes
            $("#tabel_notransaksi").DataTable().draw();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

//--------------------------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("addButton");
    var saveButton = document.getElementById("saveButton");
    var cancelButton = document.getElementById("cancelButton");
    var updateButton = document.getElementById("updateButton");
    var deleteButton = document.getElementById("deleteButton");
    var inputElements = document.querySelectorAll("input[readonly]");
    var selectElement = document.getElementById("grup-pelaksana-dropdown");
    var buttonprimary = document.getElementsByClassName("btn-primary");
    var button_noordkrj = document.getElementById("button_noordkrj");
    var ld_transaksi = document.getElementById("ld-transaksi");
    var button_msnprdk = document.getElementById("button_msnprdk");


    function toggleInputEditing(enable) {
        inputElements.forEach(function (input) {
            input.readOnly = !enable;
        });
        selectElement.disabled = !enable;
        button_noordkrj.disabled = !enable;
        ld_transaksi.disabled = !enable;
        button_msnprdk.disabled = !enable;

    }

    // Initialize the form with inputs and buttons disabled
    toggleInputEditing(false);

    addButton.addEventListener("click", function () {
        var isEditing = (addButton.textContent === "Add");
        kodeSave = 1;

        toggleInputEditing(isEditing);

          // Clear form inputs
          inputElements.forEach(function (input) {
            input.value = "";
        });

        if (isEditing) {
            addButton.style.display = "none";
            saveButton.style.display = "block"; // Display the Save button
            updateButton.style.display = "none";
            cancelButton.style.display = "block";// Disable the Update button
            deleteButton.disabled = true; // Disable the Delete button
        } else {
            addButton.style.display = "block";
            saveButton.style.display = "none"; // Hide the Save button
            updateButton.style.display = "block";
            cancelButton.style.display = "none";
            deleteButton.disabled = false; // Enable the Delete button
            // Reset form values if needed
        }
    });

    updateButton.addEventListener("click", function () {
        var isEditing = (addButton.textContent === "Add");
        kodeSave = 2;

        toggleInputEditing(isEditing);

          // Clear form inputs
          inputElements.forEach(function (input) {
            input.value = "";
        });

        if (isEditing) {
            addButton.style.display = "none";
            saveButton.style.display = "block"; // Display the Save button
            updateButton.style.display = "none";
            cancelButton.style.display = "block";// Disable the Update button
            deleteButton.disabled = true; // Disable the Delete button
        } else {
            addButton.style.display = "block";
            saveButton.style.display = "none"; // Hide the Save button
            updateButton.style.display = "block";
            cancelButton.style.display = "none";
            deleteButton.disabled = false; // Enable the Delete button
            // Reset form values if needed
        }
    });

    deleteButton.addEventListener("click", function () {
        kodeSave = 3;
        var isEditing = (addButton.textContent === "Add");
        toggleInputEditing(isEditing);

          // Clear form inputs
          inputElements.forEach(function (input) {
            input.value = "";
        });

        if (isEditing) {
            addButton.style.display = "none";
            saveButton.style.display = "block"; // Display the Save button
            updateButton.style.display = "none";
            cancelButton.style.display = "block";// Disable the Update button
            deleteButton.disabled = true; // Disable the Delete button
        } else {
            addButton.style.display = "block";
            saveButton.style.display = "none"; // Hide the Save button
            updateButton.style.display = "block";
            cancelButton.style.display = "none";
            deleteButton.disabled = false; // Enable the Delete button
            // Reset form values if needed
        }
    });

    // Button.addEventListener("click", function() {
    //     var isEditing = (addButton.textContent === "Add");
    //     toggleInputEditing(isEditing);

    //     if (isEditing) {
    //         addButton.style.display = "none";
    //         saveButton.style.display = "block"; // Display the Save button
    //         updateButton.disabled = true; // Disable the Update button
    //         deleteButton.disabled = true; // Disable the Delete button
    //     } else {
    //         addButton.style.display = "block";
    //         saveButton.style.display = "none"; // Hide the Save button
    //         updateButton.disabled = false; // Enable the Update button
    //         deleteButton.disabled = false; // Enable the Delete button
    //         // Reset form values if needed
    //     }
    // });

    // Add click event listener to the "Save" button
    saveButton.addEventListener("click", function () {

        toggleInputEditing(false);
        var Tanggal = document.getElementById('tanggal').value;
        var kode = 1;
        var IDLOG = document.getElementById('no-transaksi').value;
        var No_Order = document.getElementById('noorder').value;
        var IDMESIN = document.getElementById('kdmesin').value;
        var selectElement = document.getElementById("grup-pelaksana-dropdown");
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        var Group = selectedOption.textContent;
        var AWALSHIFT = document.getElementById('jammulai').value;
        var AKHIRSHIFT = document.getElementById('jamakhir').value;
        var JMLPRIMER = document.getElementById('jml-ball').value;
        var JMLSEKUNDER = document.getElementById('no-transaksi').value;
        var JMLTRITIER = document.getElementById('jml-lembar').value;


        if (kodeSave == 1) {
            let data = {
                Tanggal: Tanggal,
                kode: kodeSave,
                No_Order: No_Order,
                IDMESIN: IDMESIN,
                Group: Group,
                AWALSHIFT: AWALSHIFT,
                AKHIRSHIFT: AKHIRSHIFT,
                JMLPRIMER: JMLPRIMER,
                JMLSEKUNDER: JMLSEKUNDER,
                JMLTRITIER: JMLTRITIER,
            };


            console.log(data);

            const formContainer = document.getElementById("form-container");
            const form = document.createElement("form");
            form.setAttribute("action", "AdStarHasilProd");
            form.setAttribute("method", "POST");

            // Loop through the data object and add hidden input fields to the form
            for (const key in data) {
                const input = document.createElement("input");
                input.setAttribute("type", "hidden");
                input.setAttribute("name", key);
                input.value = data[key]; // Set the value of the input field to the corresponding data
                form.appendChild(input);
            }

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


        } else if (kodeSave == 2) {

            let data = {
                Tanggal: Tanggal,
                kode: kodeSave,
                IDLOG: IDLOG,
                No_Order: No_Order,
                IDMESIN: IDMESIN,
                Group: Group,
                AWALSHIFT: AWALSHIFT,
                AKHIRSHIFT: AKHIRSHIFT,
                JMLPRIMER: JMLPRIMER,
                JMLSEKUNDER: JMLSEKUNDER,
                JMLTRITIER: JMLTRITIER,
            };
            console.log(data);

            const formContainer = document.getElementById("form-container");
            const form = document.createElement("form");
            form.setAttribute("action", "AdStarHasilProd/{IDLOG}");
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
            ifUpdate.value = "Update Hasil Produksi"; // Set the value of the input field to the corresponding data
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
        } else if (kodeSave == 3) {
            let data = {
                Tanggal: Tanggal,
                kode: kodeSave,
                IDLOG: IDLOG,
                No_Order: No_Order,
                IDMESIN: IDMESIN,
                Group: Group,
                AWALSHIFT: AWALSHIFT,
                AKHIRSHIFT: AKHIRSHIFT,
                JMLPRIMER: JMLPRIMER,
                JMLSEKUNDER: JMLSEKUNDER,
                JMLTRITIER: JMLTRITIER,
            };
            const formContainer = document.getElementById("form-container");
            const form = document.createElement("form");
            form.setAttribute("action", "AdStarHasilProd/{IDLOG}");
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
            method.value = "DELETE"; // Set the value of the input field to the corresponding data
            form.appendChild(method);

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








        addButton.style.display = "block";
        saveButton.style.display = "none"; // Hide the Save button
        updateButton.style.display = "block";
        cancelButton.style.display = "none";// Disable the Update button
        deleteButton.disabled = false; // Disable the Delete button
    });

    cancelButton.addEventListener("click", function () {
        toggleInputEditing(false);
        addButton.style.display = "block";
        saveButton.style.display = "none"; // Hide the Save button
        updateButton.style.display = "block";
        cancelButton.style.display = "none";// Disable the Update button
        deleteButton.disabled = false; // Disable the Delete button
    });

});

//--------------------------------------------------------------------------------------//

function getTime(date) {
    // Format tanggal dan waktu
    var dateTime = new Date(date);

    var jamMulaiInput = document.getElementById("jammulai");
    var jam = String(dateTime.getHours()).padStart(2, '0'); // Ambil jam dengan format 2 digit
    var menit = String(dateTime.getMinutes()).padStart(2, '0'); // Ambil menit dengan format 2 digit

    return jam + ":" + menit;

}

//--------------------------------------------------------------------------------------//

// // Click event handler for table rows
$('#tabel_notransaksi tbody').on('click', 'tr', function () {
    // Get the data from the clicked row
    var rowData = $("#tabel_notransaksi").DataTable().row(this).data();
    $('#no-transaksi').val(rowData[1]);
    var IDLOG = document.getElementById('no-transaksi').value;
    fetch("/AdStarHasilProd/" + IDLOG + ".getDataProduksi")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Assuming the response is in JSON format
        })
        .then((data) => {

            // Loop through the data and create table rows
            data.forEach((item) => {
                $('#noorder').val(item.NO_ORDER);
                $('#namabarang').val(item.Nama_brg);
                $('#kdmesin').val(item.IdMesin);
                $('#namamesin').val(item.NamaMesin);
                console.log();
                // var selecteds = document.querySelector('select[name="grup-pelaksana-dropdown"]');
                // selecteds.options[item.GROUP].selected = true;

                $('#grup-pelaksana-dropdown').val(item.GROUP);
                $('#jammulai').val(getTime(item.AWALSHIFT));
                $('#jamakhir').val(getTime(item.AKHIRSHIFT));
                $('#jml-ball').val(item.JMLPRIMER);
                $('#jml-lembar').val(item.JMLSEKUNDER);
                $('#jml-kg').val(item.JMLTRITIER);


            });

            // Redraw the table to show the changes

        })
        .catch((error) => {
            console.error("Error:", error);
        });
    // var idbrng = $(this).data('idbrng');
    // console.log(GrupMesinOrder);
    // Populate the form fields with the data

});

//--------------------------------------------------------------------------------------//

$('#tabel_noorder tbody').on('click', 'tr', function () {
    // Get the data from the clicked row
    var rowData = $("#tabel_noorder").DataTable().row(this).data();
    // var idbrng = $(this).data('idbrng');
    // console.log(GrupMesinOrder);
    // Populate the form fields with the data
    $('#namabarang').val(rowData[1]);
    $('#noorder').val(rowData[0]);
});
$('#tabel_Barang2 tbody').on('click', 'tr', function () {
    // Get the data from the clicked row
    var rowData = $("#tabel_Barang2").DataTable().row(this).data();
    // var idbrng = $(this).data('idbrng');
    // console.log(GrupMesinOrder);
    // Populate the form fields with the data
    $('#kdmesin').val(rowData[1]);
    $('#namamesin').val(rowData[0]);
});

