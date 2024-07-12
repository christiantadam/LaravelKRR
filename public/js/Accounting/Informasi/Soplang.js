let tglAkhirLaporan = document.getElementById('tglAkhirLaporan');
let btnProses = document.getElementById('btnProses');

let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tglAkhirLaporan.value = formattedDate2;

btnProses.addEventListener('click', function (event) {
    event.preventDefault();

    methodkoreksi.value="PUT";
    formkoreksi.action = "/Soplang/" + tglAkhirLaporan.value;
    formkoreksi.submit();
})
