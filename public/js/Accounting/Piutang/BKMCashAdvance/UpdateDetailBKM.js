$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let radio_1 = document.getElementById("radio_1");
    let radio_2 = document.getElementById("radio_2");
    let radio_3 = document.getElementById("radio_3");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_rp = $("#table_rp").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_rb = $("#table_rb").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_rk = $("#table_rk").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let rowDataPertama;
    let rowDataKedua;
    let rowDataKetiga;
    let koreksi;

    radio_1.addEventListener("click", function (event) {
        koreksi = 1;
    });

    radio_2.addEventListener("click", function (event) {
        koreksi = 2;
    });

    radio_3.addEventListener("click", function (event) {
        koreksi = 3;
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        if (koreksi == 1) {
            var myModal = new bootstrap.Modal(
                document.getElementById("modalDetailPelunasan"),
                {
                    keyboard: false,
                }
            );
            myModal.show();
        }else if (koreksi == 2) {

        }else if (koreksi == 3) {

        }
    });

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "UpdateDetailBKM/getPelunasan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bulan: bulan.value,
                        tahun: tahun.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxAtas" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Tgl_Pelunasan" },
                { data: "Id_Pelunasan" },
                { data: "Id_bank" },
                { data: "Jenis_Pembayaran" },
                { data: "Nama_MataUang" },
                { data: "Nilai_Pelunasan" },
                { data: "No_Bukti" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });
    });

    let rowDataArray = [];

    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataPertama);
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataPertama = null;
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        table_rp = $("#table_rp").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "UpdateDetailBKM/getDetailPelunasan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data.Id_Pelunasan,
                    });
                },
            },
            columns: [
                {
                    data: "ID_Penagihan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Nilai_Pelunasan" },
                { data: "Pelunasan_Rupiah" },
                { data: "Kode_Perkiraan" },
                { data: "NamaCust" },
                { data: "ID_Detail_Pelunasan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });

        table_rb = $("#table_rb").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "UpdateDetailBKM/getDetailBiaya",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data.Id_Pelunasan,
                    });
                },
            },
            columns: [
                {
                    data: "Keterangan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Biaya" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_Pelunasan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });

        table_rk = $("#table_rk").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "UpdateDetailBKM/getDetailKurang",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data.Id_Pelunasan,
                    });
                },
            },
            columns: [
                {
                    data: "Keterangan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "KurangLebih" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_Pelunasan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });
    });

    let rowDataArrayKedua = [];

    $("#table_rp tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_rp tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKedua = table_rp.row($(this).closest("tr")).data();
                rowDataArrayKedua.push(rowDataKedua);
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_rp);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArrayKedua = [];
                rowDataKedua = null;
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_rp);
            }
        }
    );

    let rowDataArrayKetiga = [];

    $("#table_rb tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_rb tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKetiga = table_rb.row($(this).closest("tr")).data();
                rowDataArrayKetiga.push(rowDataKetiga);
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, table_rb);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArrayKetiga = [];
                rowDataKetiga = null;
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, table_rb);
            }
        }
    );

    let rowDataArrayKeempat = [];

    $("#table_rk tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_rk tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKeempat = table_rk.row($(this).closest("tr")).data();
                rowDataArrayKeempat.push(rowDataKeempat);
                console.log(rowDataArrayKeempat);
                console.log(rowDataKeempat, this, table_rk);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArrayKeempat = [];
                rowDataKeempat = null;
                console.log(rowDataArrayKeempat);
                console.log(rowDataKeempat, this, table_rk);
            }
        }
    );
});
