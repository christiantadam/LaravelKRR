$("#tbl_customer").DataTable();
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

$('#tbl_customer tbody').on('click', 'tr', function () {
    // Get the data from the clicked row
    var rowData = $("#tbl_customer").DataTable().row(this).data();
    // var idbrng = $(this).data('idbrng');
    // console.log(GrupMesinOrder);
    // Populate the form fields with the data
    $('#idcust').val(rowData[1]);
    $('#namacust').val(rowData[0]);
});

//--------------------------------------------------------------------------------------//

const btnprodtype = document.getElementById('btnprodtype');
var kodeSave;


btnprodtype.addEventListener("click", function () {
    var idcust = document.getElementById('idcust');
    fetch("/AdStarOpenTop/" + idcust.value + ".dataProdType")
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

// //--------------------------------------------------------------------------------------//

// document.addEventListener("DOMContentLoaded", function () {
//     var addButton = document.getElementById("addButton");
//     var saveButton = document.getElementById("saveButton");
//     var cancelButton = document.getElementById("cancelButton");
//     var updateButton = document.getElementById("updateButton");
//     var deleteButton = document.getElementById("deleteButton");
//     var inputElements = document.querySelectorAll("input[readonly]");
//     var selectElement = document.getElementById("grup-pelaksana-dropdown");
//     var buttonprimary = document.getElementsByClassName("btn-primary");
//     var button_noordkrj = document.getElementById("button_noordkrj");
//     var ld_transaksi = document.getElementById("ld-transaksi");
//     var button_msnprdk = document.getElementById("button_msnprdk");


//     function toggleInputEditing(enable) {
//         inputElements.forEach(function (input) {
//             input.readOnly = !enable;
//         });
//         selectElement.disabled = !enable;
//         button_noordkrj.disabled = !enable;
//         ld_transaksi.disabled = !enable;
//         button_msnprdk.disabled = !enable;

//     }

//     // Initialize the form with inputs and buttons disabled
//     toggleInputEditing(false);

//     addButton.addEventListener("click", function () {
//         var isEditing = (addButton.textContent === "Add");
//         kodeSave = 1;

//         toggleInputEditing(isEditing);

//         if (isEditing) {
//             addButton.style.display = "none";
//             saveButton.style.display = "block"; // Display the Save button
//             updateButton.style.display = "none";
//             cancelButton.style.display = "block";// Disable the Update button
//             deleteButton.disabled = true; // Disable the Delete button
//         } else {
//             addButton.style.display = "block";
//             saveButton.style.display = "none"; // Hide the Save button
//             updateButton.style.display = "block";
//             cancelButton.style.display = "none";
//             deleteButton.disabled = false; // Enable the Delete button
//             // Reset form values if needed
//         }
//     });

//     updateButton.addEventListener("click", function () {
//         var isEditing = (addButton.textContent === "Add");
//         kodeSave = 2;

//         toggleInputEditing(isEditing);

//         if (isEditing) {
//             addButton.style.display = "none";
//             saveButton.style.display = "block"; // Display the Save button
//             updateButton.style.display = "none";
//             cancelButton.style.display = "block";// Disable the Update button
//             deleteButton.disabled = true; // Disable the Delete button
//         } else {
//             addButton.style.display = "block";
//             saveButton.style.display = "none"; // Hide the Save button
//             updateButton.style.display = "block";
//             cancelButton.style.display = "none";
//             deleteButton.disabled = false; // Enable the Delete button
//             // Reset form values if needed
//         }
//     });

//     deleteButton.addEventListener("click", function () {
//         kodeSave = 3;
//         var isEditing = (addButton.textContent === "Add");
//         toggleInputEditing(isEditing);

//         if (isEditing) {
//             addButton.style.display = "none";
//             saveButton.style.display = "block"; // Display the Save button
//             updateButton.style.display = "none";
//             cancelButton.style.display = "block";// Disable the Update button
//             deleteButton.disabled = true; // Disable the Delete button
//         } else {
//             addButton.style.display = "block";
//             saveButton.style.display = "none"; // Hide the Save button
//             updateButton.style.display = "block";
//             cancelButton.style.display = "none";
//             deleteButton.disabled = false; // Enable the Delete button
//             // Reset form values if needed
//         }
//     });


//     // Add click event listener to the "Save" button
//     saveButton.addEventListener("click", function () {
//         addButton.style.display = "block";
//         saveButton.style.display = "none"; // Hide the Save button
//         updateButton.style.display = "block";
//         cancelButton.style.display = "none";// Disable the Update button
//         deleteButton.disabled = false; // Disable the Delete button
//     });

//     cancelButton.addEventListener("click", function () {
//         toggleInputEditing(false);
//         addButton.style.display = "block";
//         saveButton.style.display = "none"; // Hide the Save button
//         updateButton.style.display = "block";
//         cancelButton.style.display = "none";// Disable the Update button
//         deleteButton.disabled = false; // Disable the Delete button
//     });

// });
