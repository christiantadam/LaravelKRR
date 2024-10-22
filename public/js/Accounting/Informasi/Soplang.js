let tglAkhirLaporan = document.getElementById('tglAkhirLaporan');
let btnProses = document.getElementById('btnProses');

let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tglAkhirLaporan.value = formattedDate2;

// btnProses.addEventListener('click', function (event) {
//     event.preventDefault();

//     methodkoreksi.value="PUT";
//     formkoreksi.action = "/Soplang/" + tglAkhirLaporan.value;
//     formkoreksi.submit();
// })
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

btnProses.addEventListener("click", function (e) {
    $.ajax({
        type: 'PUT',
        url: 'Soplang/proses',
        data: {
            _token: csrfToken,
            tglAkhirLaporan: tglAkhirLaporan.value,
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    text: "Data Selesai Diproses. Silakan Lihat Di Excell",
                    returnFocus: false
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});