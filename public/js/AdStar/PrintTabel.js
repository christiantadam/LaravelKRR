//--------------------------------------------------------------------------------------//
//auto pilih di awal
document.addEventListener("DOMContentLoaded", function() {
    // Pilih radio button "StarPark"
    document.getElementById("radio1").checked = true;
});

//--------------------------------------------------------------------------------------//




//--------------------------------------------------------------------------------------//

var a = 0;

document.querySelectorAll('input[name="optradio"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        a = parseInt(this.value); // Mengubah string menjadi angka
    });
});

const btncust = document.getElementById('btncust')
btncust.addEventListener("click", function () {
    var optStarChecked = document.getElementById('radio1').checked;

    // Menentukan nilai parameter @idjenis berdasarkan kondisi OptStarChecked
    var idjenis = optStarChecked ? 1 : 2;
    // console.log(idjenis);
    // return;
    fetch("/AdStarPrintTabel/" + idjenis + ".dataCust")
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
            $("#tbl_customer").DataTable().clear().draw();

            // Loop through the data and create table rows
            data.forEach((item) => {
                var row = [item.NamaCust, item.IDCust];
                $("#tbl_customer").DataTable().row.add(row);
            });

            // Redraw the table to show the changes
            $("#tbl_customer").DataTable().draw();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

const btnukuran = document.getElementById('btnukuran');
var kodeSave;


btnukuran.addEventListener("click", function () {
    var tanggal = document.getElementById('tanggal');
    fetch("/AdStarPrintTabel/" + tanggal.value + ".dataUkuran")
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
            $("#tbl_ukuran").DataTable().clear().draw();

            // Loop through the data and create table rows
            data.forEach((item) => {
                var row = [item.GrupMesinOrder, item.IDLOG];
                $("#tbl_ukuran").DataTable().row.add(row);
            });

            // Redraw the table to show the changes
            $("#tbl_ukuran").DataTable().draw();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
