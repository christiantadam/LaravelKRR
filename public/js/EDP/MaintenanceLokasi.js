$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let divLokasiTambah = document.getElementById("divLokasiTambah");
    let listLokasiTambah = document.getElementById("listLokasiTambah");
    let divLokasiEdit = document.getElementById("divLokasiEdit");
    let listLokasiEdit = document.getElementById("listLokasiEdit");
    let userEdit = document.getElementById("userEdit");
    let updateButtonTeknisi = document.getElementById("updateButtonTeknisi");
    let lokasiUserSebelum = [];
    let lokasiUserSesudah = [];
    var dataTableTeknisi = $("#table-teknisi").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ordering: true,
        ajax: {
            url: "MaintenanceLokasi/getData",
            type: "GET",
        },
        columns: [
            { data: "IDUser" },
            { data: "NomorUser" },
            { data: "NamaUser" },
            { data: "Lokasi" },
            // { data: "IdUserMaster" },
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
                    <button class="btn btn-sm btn-primary btn-edit" style="width: 150px;"data-id="${row.IDUser}">
                        <i class="fa fa-edit"></i> Edit Lokasi
                    </button>
                    `;
                },
            },
        ],
    });

    let idUserAll = null;
    $('#table-teknisi').on('click', '.btn-edit', function () {
        const idUser = $(this).data("id");
        idUserAll = idUser;
        console.log("ID Header:", idUser);

        // simpan idUser (jika diperlukan di modal)
        // $("#editmodal").data("idheader", idUser);
        $('#editmodal').modal('show');

        $.ajax({
            url: "MaintenanceLokasi/getDataNamaUser",
            type: "GET",
            data: {
                _token: csrfToken,
                idUser: idUserAll,
            },
            success: function (data) {
                userEdit.value = data.data[0].NomorUser;
                $.ajax({
                    url: "MaintenanceLokasi/getDataLokasiUser",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idUser: idUserAll,
                    },
                    success: function (res) {
                        console.log(res);

                        // 1️⃣ Uncheck semua checkbox dulu
                        $('input.form-check-input[type="checkbox"]').prop('checked', false);

                        // 2️⃣ Ambil array data lokasi
                        if (res.data && res.data.length > 0) {
                            // contoh: [{Id_Lokasi:'JKK'}, {Id_Lokasi:'MJS'}]
                            res.data.forEach(function (item) {
                                $('input.form-check-input[value="' + item.Id_Lokasi + '"]')
                                    .prop('checked', true);
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr.responseText);
                        alert("Gagal mengambil data lokasi user");
                    },
                });
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    updateButtonTeknisi.addEventListener("click", function (event) {
        event.preventDefault();

        let lokasiDipilih = [];

        // ambil semua checkbox yang dicentang
        $('#editmodal input.form-check-input:checked').each(function () {
            lokasiDipilih.push($(this).val());
        });

        $.ajax({
            url: "MaintenanceLokasi",
            type: "POST",
            data: {
                _token: csrfToken,
                idUser: idUserAll,
                lokasi: lokasiDipilih.join(',') // contoh: JKK,MJS
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        $('#editmodal').modal('hide');
                        dataTableTeknisi.ajax.reload(null, false);
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    btn_proses.disabled = false;
                }
            },
            error: function (xhr) {
                console.error(xhr.responseText);
                alert("Gagal update lokasi");
            }
        });
    });
});
