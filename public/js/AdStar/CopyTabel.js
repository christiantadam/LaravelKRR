$("#tbl_customer1").DataTable();
$("#tbl_prodtype").DataTable();
$("#tbl_customer2").DataTable();

//--------------------------------------------------------------------------------------//
//auto pilih di awal
document.addEventListener("DOMContentLoaded", function() {
    // Pilih radio button "StarPark"
    document.getElementById("radio1").checked = true;

    // Pilih checkbox "Top Close"
    document.getElementById("check2").checked = true;
});

//--------------------------------------------------------------------------------------//

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Mematikan semua checkbox
            checkboxes.forEach(function(cb) {
                if (cb !== this) {
                    cb.checked = false;
                }
            }, this);
        });
    });

//--------------------------------------------------------------------------------------//

$('#tbl_customer1 tbody').on('click', 'tr', function () {
    // Get the data from the clicked row
    var rowData = $("#tbl_customer1").DataTable().row(this).data();
    // var idbrng = $(this).data('idbrng');
    // console.log(GrupMesinOrder);
    // Populate the form fields with the data
    $('#idcust').val(rowData[1]);
    $('#namacust').val(rowData[0]);
});

//--------------------------------------------------------------------------------------//

var a=0;

document.querySelectorAll('input[name="optradio"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        a = parseInt(this.value); // Mengubah string menjadi angka
    });
});

const btncust1 = document.getElementById('btncust1')
btncust1.addEventListener("click", function () {
    var Kode=""
    if (a==1) {
        Kode = 6
    }
    else if (a==2) {
        Kode = 3
    }
    fetch("/AdStarCopyTabel/" + Kode + ".dataCust1")
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
            $("#tbl_customer1").DataTable().clear().draw();

            // Loop through the data and create table rows
            data.forEach((item) => {
                var row = [item.NamaCust, item.IDCust];
                $("#tbl_customer1").DataTable().row.add(row);
            });

            // Redraw the table to show the changes
            $("#tbl_customer1").DataTable().draw();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

var b=0;

document.querySelectorAll('input[name="optioncheck"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        b = parseInt(this.value); // Mengubah string menjadi angka
    });
});

const btnprodtype = document.getElementById('btnprodtype')
btnprodtype.addEventListener("click", function () {
    var Kode="";
    var idcust = document.getElementById('idcust');
    if (b==1) {
        Kode = 7
    }
    else if (b==2) {
        Kode = 1
    }
    fetch("/AdStarCopyTabel/" + Kode +"."+ idcust.value + ".dataProdType")
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
            $("#tbl_prodtype").DataTable().clear().draw();

            // Loop through the data and create table rows
            data.forEach((item) => {
                var row = [item.Nama_brg, item.id];
                $("#tbl_prodtype").DataTable().row.add(row);
            });

            // Redraw the table to show the changes
            $("#tbl_prodtype").DataTable().draw();
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
        // selectElement.disabled = !enable;
        // button_noordkrj.disabled = !enable;
        // ld_transaksi.disabled = !enable;
        // button_msnprdk.disabled = !enable;

    }

    // Initialize the form with inputs and buttons disabled
    toggleInputEditing(false);

    addButton.addEventListener("click", function () {
        var isEditing = (addButton.textContent === "Copy");
        kodeSave = 1;

        toggleInputEditing(isEditing);

        if (isEditing) {
            addButton.style.display = "none";
            saveButton.style.display = "block"; // Display the Save button
            cancelButton.style.display = "block";// Disable the Update button
        } else {
            addButton.style.display = "block";
            saveButton.style.display = "none"; // Hide the Save button
            cancelButton.style.display = "none";
            // Reset form values if needed
        }
    });

    // Add click event listener to the "Save" button
    saveButton.addEventListener("click", function () {

        toggleInputEditing(false);
        var ID = document.getElementById('idprod1').value;
        var kode = 1;
        var ID_CUST = document.getElementById('idcust2').value;
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
                ID: ID,
                ID_CUST: ID_CUST,
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
            form.setAttribute("action", "AdStarCopyTabel");
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
            form.setAttribute("action", "AdStarCopyTabel/{IDLOG}");
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
            form.setAttribute("action", "AdStarCopyTabel/{IDLOG}");
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
        cancelButton.style.display = "none";// Disable the Update button
    });

    cancelButton.addEventListener("click", function () {
        toggleInputEditing(false);
        addButton.style.display = "block";
        saveButton.style.display = "none"; // Hide the Save button
        cancelButton.style.display = "none";// Disable the Update button
    });

});
