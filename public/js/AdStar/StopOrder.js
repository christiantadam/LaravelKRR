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


var kodeSave;


 // // Click event handler for table rows
 $('#tabel_noorder tbody').on('click', 'tr', function() {
    // Get the data from the clicked row
    var nama = $(this).data('nama');
    var kode = $(this).data('kode');
    var idbrng = $(this).data('idbrng');

    // Populate the form fields with the data
    $('#nama-barang').val(idbrng);
    $('#input1').val(nama);
});

var a=0
const btn_noorder = document.getElementById('btn_noorder')
btn_noorder.addEventListener("click", function () {
    var Kode=""
    if (a==1) {
        Kode = 10
    }
    else if (a==2) {
        Kode = 14
    }
    fetch("/AdStarStopOrder/" + Kode + ".dataOrder")
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
            $("#tabel_noorder").DataTable().clear().draw();

            // Loop through the data and create table rows
            data.forEach((item) => {
                var row = [item.NAMA_BRG, item.No_Order];
                $("#tabel_noorder").DataTable().row.add(row);
            });

            // Redraw the table to show the changes
            $("#tabel_noorder").DataTable().draw();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

$('#tabel_noorder tbody').on('click', 'tr', function () {
    // Get the data from the clicked row
    var rowData = $("#tabel_noorder").DataTable().row(this).data();
    $('#nama_brng').val(rowData[0]);
    $('#no_order').val(rowData[1]);

    var no_order = document.getElementById('no_order').value;
    fetch("/AdStarStopOrder/" + no_order + ".dataOrder2")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Assuming the response is in JSON format
        })
        .then((data) => {

            // Loop through the data and create table rows
            data.forEach((item) => {
                $('#no_pesan').val(item.IDPESANAN);
                $('#srt_pesan').val(item.no_sp);
                $('#qty_ordr').val(item.Jml_Order);
                $('#hsl_ordr').val(item.A_ORder);
                $('#rncn_kerja').val(getTime(item.R_TGL_START));
                $('#rncn_finish').val(getTime(item.R_TGL_FINISH));
                // $('#tgl_finish').val(item.JMLPRIMER);


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

// $('#tabel_noorder tbody').on('click', 'tr', function () {
//     // Get the data from the clicked row
//     var rowData = $("#tabel_noorder").DataTable().row(this).data();
//     // var idbrng = $(this).data('idbrng');
//     // console.log(GrupMesinOrder);
//     // Populate the form fields with the data

// });

document.addEventListener("DOMContentLoaded", function () {
    const stpButton = document.getElementById("stpButton");
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");
    const unstpButton = document.getElementById("unstpButton");
    const btn_noorder = document.getElementById("btn_noorder");
    var inputElements = document.querySelectorAll("input[readonly]");


    function toggleInputEditing(enable) {
        // inputElements.forEach(function (input) {
        //     input.readOnly = !enable;
        // });
        // selectElement.disabled = !enable;
        // button_noordkrj.disabled = !enable;
        // ld_transaksi.disabled = !enable;
        btn_noorder.disabled = !enable;

    }

    // Initialize the form with inputs and buttons disabled
    toggleInputEditing(false);

    stpButton.addEventListener("click", function () {
        var isEditing = (stpButton.textContent === "Stop Order");
        a=1;
        kodeSave = 1;

        toggleInputEditing(isEditing);

         // Clear form inputs
         inputElements.forEach(function (input) {
            input.value = "";
        });


        if (isEditing) {
            stpButton.style.display = "none";
            saveButton.style.display = "block"; // Display the Save button
            unstpButton.style.display = "none";
            cancelButton.style.display = "block";// Disable the Update button
        } else {
            stpButton.style.display = "block";
            saveButton.style.display = "none"; // Hide the Save button
            unstpButton.style.display = "block";
            cancelButton.style.display = "none";
            // Reset form values if needed
        }
    });

    unstpButton.addEventListener("click", function () {
        var isEditing = (stpButton.textContent === "Stop Order");
        a=2;
        kodeSave = 2;

        toggleInputEditing(isEditing);

         // Clear form inputs
         inputElements.forEach(function (input) {
            input.value = "";
        });


        if (isEditing) {
            stpButton.style.display = "none";
            saveButton.style.display = "block"; // Display the Save button
            unstpButton.style.display = "none";
            cancelButton.style.display = "block";// Disable the Update button
        } else {
            stpButton.style.display = "block";
            saveButton.style.display = "none"; // Hide the Save button
            unstpButton.style.display = "block";
            cancelButton.style.display = "none";
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
        var Tanggal = document.getElementById('tgl_finish').value;
        var IDLOG = document.getElementById('no_order').value;



        if (kodeSave == 1) {
            let data = {
                Tanggal: Tanggal,
                kode: 4,
                IDLOG: IDLOG,
            };
            console.log(data);

            const formContainer = document.getElementById("form-container");
            const form = document.createElement("form");
            form.setAttribute("action", "StopOrder/{IDLOG}");
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


        } else if (kodeSave == 2) {

            let data = {
                Tanggal: Tanggal,
                kode: 5,
                IDLOG: IDLOG,
            };
            console.log(data);

            const formContainer = document.getElementById("form-container");
            const form = document.createElement("form");
            form.setAttribute("action", "StopOrder/{IDLOG}");
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
            form.setAttribute("action", "HslPrdPrs/{IDLOG}");
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








        stpButton.style.display = "block";
        saveButton.style.display = "none"; // Hide the Save button
        unstpButton.style.display = "block";
        cancelButton.style.display = "none";// Disable the Update button
    });

    cancelButton.addEventListener("click", function () {
        toggleInputEditing(false);
        stpButton.style.display = "block";
        saveButton.style.display = "none"; // Hide the Save button
        unstpButton.style.display = "block";
        cancelButton.style.display = "none";// Disable the Update button
    });

});
