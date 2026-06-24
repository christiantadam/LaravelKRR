//#region Variable
let baseUrl = '/CounterFaktur';
let tahun = $('#tahun');
let counterSebelum = $('#counter_sebelum');
let fakturSebelum = $('#faktur_sebelum');
let counterSesudah = $('#counter_sesudah');
let fakturSesudah = $('#faktur_sesudah');
let btnRefresh = $('#btnRefresh');
let btnSimpan = $('#btnSimpan');

//#endregion


//#region Function

function loadData() {

    $.ajax({
        url: `${baseUrl}/create`,
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            $('.loading-screen').show();
        },
        complete: function () {
            $('.loading-screen').hide();
        },
        success: function (response) {
            if (!response.success) {
                showError(response.message);
                return;
            }

            tahun.val(response.tahun);

            counterSebelum.val(response.counter);
            fakturSebelum.val(response.faktur);

            counterSesudah.val('');
            fakturSesudah.val('');

            counterSesudah.focus();
        },
        error: function (xhr) {

            let message = 'Terjadi kesalahan';

            if (xhr.responseJSON?.message) {
                message = xhr.responseJSON.message;
            }

            showError(message);
        }
    });
}

function saveData() {

    let tahunValue = tahun.val();
    let counterValue = counterSesudah.val().trim();
    let fakturValue = fakturSesudah.val().trim();

    if (counterValue === '' || fakturValue === '') {
        showWarning('Counter dan Faktur harus diisi');
        return;
    }

    if (!$.isNumeric(counterValue) || !$.isNumeric(fakturValue)) {
        showWarning('Counter dan Faktur harus berupa angka');
        return;
    }

    Swal.fire({
        title: 'Konfirmasi',
        html: `
            Apakah anda yakin mengganti faktur pajak menjadi
            <b>${fakturValue}</b><br><br>
            dan counter faktur tahun
            <b>${tahunValue}</b>
            menjadi
            <b>${counterValue}</b> ?
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Simpan',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {

        if (!result.isConfirmed) {
            counterSesudah.focus();
            return;
        }

        $.ajax({
            url: baseUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                tahun: tahunValue,
                counter: counterValue,
                faktur: fakturValue
            },
            beforeSend: function () {
                btnSimpan.prop('disabled', true);
            },
            complete: function () {
                btnSimpan.prop('disabled', false);
            },
            success: function (response) {

                if (!response.success) {
                    showError(response.message);
                    return;
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: response.message
                }).then(() => {
                    loadData();
                });
            },
            error: function (xhr) {

                let message = 'Terjadi kesalahan';

                if (xhr.status === 422) {

                    let errors = xhr.responseJSON.errors;
                    let firstError = Object.values(errors)[0][0];

                    showWarning(firstError);
                    return;
                }

                if (xhr.responseJSON?.message) {
                    message = xhr.responseJSON.message;
                }

                showError(message);
            }
        });

    });
}


function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: message
    });
}

function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    });
}

function showWarning(message) {
    Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: message
    });
}

//#endregion


//#region EventListener

$(document).ready(function () {
    loadData();

});

btnRefresh.on('click', function () {
    loadData();

});

btnSimpan.on('click', function () {
    saveData();

});

counterSesudah.on('keypress', function (e) {
    if (e.which === 13) {
        fakturSesudah.focus();
    }

});

fakturSesudah.on('keypress', function (e) {
    if (e.which === 13) {
        btnSimpan.focus();
    }

});

//#endregion
