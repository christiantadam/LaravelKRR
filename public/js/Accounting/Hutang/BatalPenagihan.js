let bulan = document.getElementById("bulan");
let tahun = document.getElementById("tahun");
let idPenagihan = document.getElementById("idPenagihan");

const currentDate = new Date();
// Get the current month (January is 0, December is 11)
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
bulan.value = currentMonth;
tahun.value = currentYear;

document.addEventListener("DOMContentLoaded", function () {
    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    bulan.value = currentMonth;
    tahun.value = currentYear;
});

idPenagihan.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.classList.add("input-error");
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});

idPenagihan.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        fetch("/detailpenagihan/" + idPenagihan.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idPenagihan.value = options[0].Id_Penagihan;
            });
    }
});

