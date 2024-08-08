$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radio_1 = document.getElementById("radio_1");
    let radio_2 = document.getElementById("radio_2");
    let radio_biaya = document.getElementById("radio_biaya");
    let radio_pembayaran = document.getElementById("radio_pembayaran");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_tampil = document.getElementById("btn_tampil");
    let btn_okbkk = document.getElementById("btn_okbkk");
    let btn_cetakbkk = document.getElementById("btn_cetakbkk");
    let btn_prosesbkk = document.getElementById("btn_prosesbkk");
    let btn_kodePerkiraan = document.getElementById("btn_kodePerkiraan");
    let btn_noBg = document.getElementById("btn_noBg");
    let btn_prosesPembayaran = document.getElementById("btn_prosesPembayaran");
    let btn_prosesBG = document.getElementById("btn_prosesBG");
    let btn_group = document.getElementById("btn_group");
    let id_pembayaran = document.getElementById("id_pembayaran");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let bkk = document.getElementById("bkk");
    let nilaiBkk = document.getElementById("nilaiBkk");
    let nilaiPembulatan = document.getElementById("nilaiPembulatan");
    let jatuhTempo = document.getElementById("jatuhTempo");
    let bank = document.getElementById("bank");
    let jnsByr = document.getElementById("jnsByr");
    let id_jnsByr = document.getElementById("id_jnsByr");
    let noJnsByr = document.getElementById("noJnsByr");
    let jumlahJnsByr = document.getElementById("jumlahJnsByr");
    let statusCetak = document.getElementById("statusCetak");
    let bank_pembayaran = document.getElementById("bank_pembayaran");
    let jnsByr_pembayaran = document.getElementById("jnsByr_pembayaran");
    let noBg = document.getElementById("noBg");
    let rincian = document.getElementById("rincian");
    let nilaiBayar = document.getElementById("nilaiBayar");
    let nilaiRincian = document.getElementById("nilaiRincian");
    let kdPerkiraan1 = document.getElementById("kdPerkiraan1");
    let kdPerkiraan2 = document.getElementById("kdPerkiraan2");
    let bg_b = document.getElementById("bg_b");
    let id_detailkanan = document.getElementById("id_detailkanan");
    let id_detailkiri = document.getElementById("id_detailkiri");
    let tablekanan = $("#tablekanan").DataTable();
    let tablekiri = $("#tablekiri").DataTable();
    let tabletampilBKK = $("#tabletampilBKK").DataTable();
    let bg;
    let rowData;
    let rowDataBKK;
    let rowDataKiri;
    let rowDataKanan;
    let proses;
    let dp;

    function escapeHTML(text) {
        return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }

    let currentMonth = new Date().getMonth() + 1;
    month.value = currentMonth.toString().padStart(2, "0");
    let currentYear = new Date().getFullYear();
    year.value = currentYear;
    btn_proses.style.display = "none";
    jatuhTempo.valueAsDate = new Date();

    $("#uangMuka").off("change");
    $("#uangMuka").on("change", function () {
        if (this.checked) {
            dp = 1;
            $("#radio_biaya").prop("checked", true);
        } else {
            dp = 0;
            $("#radio_biaya").prop("checked", false);
            $("#radio_pembayaran").prop("checked", false);
        }
        console.log(dp);
    });

    radio_1.addEventListener("click", function (event) {
        bg = true;
    });

    radio_2.addEventListener("click", function (event) {
        bg = false;
    });

    let tableatas = $("#tableatas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "MaintenanceBKKKRR2/getPengajuan",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "Id_Pembayaran",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "Id_Bank" },
            { data: "NM_SUP" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Pembayaran" },
            { data: "Jenis_Pembayaran" },
            { data: "Nama_MataUang" },
            { data: "Jml_JenisBayar" },
            { data: "IdMataUang_PO" },
            { data: "Id_Jenis_Bayar" },
            { data: "Id_MataUang" },
            { data: "Id_Supplier" },
            { data: "Jenis_Bank" },
        ],
        columnDefs: [{ targets: [10, 11, 12, 13], visible: false }],
    });

    let rowDataArray = [];

    function parsePaymentValue(value) {
        return parseFloat(value.replace(/,/g, ""));
    }

    function calculateTotalPayment(rowDataArray) {
        return rowDataArray.reduce((total, row) => {
            return total + parsePaymentValue(row.Nilai_Pembayaran);
        }, 0);
    }

    $("#tableatas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#tableatas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                rowData = tableatas.row($(this).closest("tr")).data();
                rowDataArray.push(rowData);
                console.log(rowData, this, tableatas);
            } else {
                const index = rowDataArray.findIndex(
                    (row) => row.Id_Pembayaran === rowData.Id_Pembayaran
                );
                if (index > -1) {
                    rowDataArray.splice(index, 1);
                }
            }
        }
    );

    $("#tableatas tbody").off("click", "tr");
    $("#tableatas tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tableatas tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const tableatas = $("#tableatas").DataTable();
        let selectedRows = tableatas.rows(".selected").data().toArray();
        id_pembayaran.value = selectedRows[0].Id_Pembayaran;

        tablekiri = $("#tablekiri").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR2/getBGCek",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_pembayaran: id_pembayaran.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Detail_BGCek",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxkiri" value="${data}" /> ${data}`;
                    },
                },
                { data: "No_BGCek" },
                { data: "Jatuh_Tempo" },
                { data: "Status_Cetak" },
                { data: "Id_Pembayaran" },
                { data: "Nilai_BGCek" },
            ],
            // columnDefs: [{ targets: [5, 6], visible: false }],
        });

        tablekanan = $("#tablekanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR2/getPembayaran",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_pembayaran: id_pembayaran.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Detail_Bayar",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxkanan" value="${data}" /> ${data}`;
                    },
                },
                { data: "Rincian_Bayar" },
                { data: "Nilai_Rincian" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_BGCek" },
                { data: "Id_Pembayaran" },
                { data: "Keterangan" },
            ],
            columnDefs: [{ targets: [5, 6], visible: false }],
        });
    });

    $("#tablekiri tbody").off("change", 'input[name="penerimaCheckboxkiri"]');
    $("#tablekiri tbody").on(
        "change",
        'input[name="penerimaCheckboxkiri"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxkiri"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKiri = tablekiri.row($(this).closest("tr")).data();
                console.log(rowDataKiri, this, tablekiri);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
                id_detailkiri.value = rowDataKiri.Id_Detail_BGCek;
            } else {
                rowDataKiri = null;
            }
        }
    );

    $("#tablekanan tbody").off("change", 'input[name="penerimaCheckboxkanan"]');
    $("#tablekanan tbody").on(
        "change",
        'input[name="penerimaCheckboxkanan"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxkanan"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKanan = tablekanan.row($(this).closest("tr")).data();
                console.log(rowDataKanan, this, tablekanan);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
                id_detailkanan.value = rowDataKanan.Id_Detail_Bayar;
            } else {
                rowDataKanan = null;
            }
        }
    );

    //#region Event Listener

    btn_group.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(rowDataArray);
        const totalPayment = calculateTotalPayment(rowDataArray);
        Swal.fire({
            title: "Isikan Tanggal Pembuatan BKK",
            icon: "info",
            html: '<input type="date" id="bkk_date" class="swal2-input">',
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            didOpen: () => {
                // Get the current date
                const today = new Date();
                // Set the value of the input field
                document.getElementById("bkk_date").valueAsDate = today;
            },
            preConfirm: () => {
                const date = $("#bkk_date").val();
                if (!date) {
                    Swal.showValidationMessage("Tanggal harus diisi");
                    return false;
                }
                return date;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedDate = result.value;
                console.log("Tanggal yang dipilih: ", selectedDate);
                Swal.fire({
                    title: "Total Pembayaran",
                    icon: "info",
                    text: `${totalPayment.toLocaleString("en-US", {
                        style: "currency",
                        currency: "IDR",
                    })}`,
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log("Total dibayarkan: ", totalPayment);
                        $.ajax({
                            url: "MaintenanceBKKKRR2/getGroup",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                rowDataArray: rowDataArray,
                                tanggalgrup: selectedDate,
                            },
                            success: function (response) {
                                if (response.message) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Success!",
                                        text: response.message + ' dengan ID BKK: ' + response.idbkk,
                                        showConfirmButton: true,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            tableatas.ajax.reload();
                                            tablekiri.ajax.reload();
                                            tablekanan.ajax.reload();
                                            id_detailkanan.value = "";
                                            id_detailkiri.value = "";
                                            id_pembayaran.value = "";
                                        } else {
                                            tableatas.ajax.reload();
                                            tablekiri.ajax.reload();
                                            tablekanan.ajax.reload();
                                            id_detailkanan.value = "";
                                            id_detailkiri.value = "";
                                            id_pembayaran.value = "";
                                        }
                                    });
                                } else if (response.error) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error!",
                                        text: response.error,
                                        showConfirmButton: false,
                                    });
                                }
                            },
                            error: function (xhr, status, error) {
                                let errorMessage =
                                    "Terjadi kesalahan saat memproses data.";
                                if (
                                    xhr.responseJSON &&
                                    xhr.responseJSON.error
                                ) {
                                    errorMessage = xhr.responseJSON.error;
                                } else if (xhr.responseText) {
                                    try {
                                        const response = JSON.parse(
                                            xhr.responseText
                                        );
                                        errorMessage =
                                            response.error || errorMessage;
                                    } catch (e) {
                                        console.error(
                                            "Error parsing JSON response:",
                                            e
                                        );
                                    }
                                }

                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: errorMessage,
                                    showConfirmButton: false,
                                });
                            },
                        });
                    } else {
                        console.log("Total dibayarkan dibatalkan");
                    }
                });
            } else {
                console.log("Pemilihan tanggal dibatalkan");
            }
        });
    });

    btn_prosesPembayaran.addEventListener("click", function (event) {
        event.preventDefault();
        if (proses == 3) {
            Swal.fire({
                title: "Apakah anda yakin menghapus?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "MaintenanceBKKKRR2",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: proses,
                            bg: bg ? 1 : 0,
                            id_pembayaran: id_pembayaran.value,
                            noJnsByr: noJnsByr.value,
                            jatuhTempo: jatuhTempo.value,
                            statusCetak: statusCetak.value,
                            jumlahJnsByr: jumlahJnsByr.value,
                            id_detailkiri: id_detailkiri.value,
                            rincian: rincian.value,
                            nilaiRincian: nilaiRincian.value,
                            kdPerkiraan1: kdPerkiraan1.value,
                            bg_b: bg_b.value,
                            id_detailkanan: id_detailkanan.value,
                            dp: dp,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tableatas.ajax.reload();
                                        tablekiri.ajax.reload();
                                        tablekanan.ajax.reload();
                                        id_detailkanan.value = "";
                                        id_detailkiri.value = "";
                                        id_pembayaran.value = "";
                                    } else {
                                        tableatas.ajax.reload();
                                        tablekiri.ajax.reload();
                                        tablekanan.ajax.reload();
                                        id_detailkanan.value = "";
                                        id_detailkiri.value = "";
                                        id_pembayaran.value = "";
                                    }
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                }
            });
        } else {
            $.ajax({
                url: "MaintenanceBKKKRR2",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    bg: bg ? 1 : 0,
                    id_pembayaran: id_pembayaran.value,
                    noJnsByr: noJnsByr.value,
                    jatuhTempo: jatuhTempo.value,
                    statusCetak: statusCetak.value,
                    jumlahJnsByr: jumlahJnsByr.value,
                    id_detailkiri: id_detailkiri.value,
                    rincian: rincian.value,
                    nilaiRincian: nilaiRincian.value,
                    kdPerkiraan1: kdPerkiraan1.value,
                    bg_b: bg_b.value,
                    id_detailkanan: id_detailkanan.value,
                    dp: dp,
                },
                success: function (response) {
                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                tableatas.ajax.reload();
                                tablekiri.ajax.reload();
                                tablekanan.ajax.reload();
                                id_detailkanan.value = "";
                                id_detailkiri.value = "";
                                id_pembayaran.value = "";
                            } else {
                                tableatas.ajax.reload();
                                tablekiri.ajax.reload();
                                tablekanan.ajax.reload();
                                id_detailkanan.value = "";
                                id_detailkiri.value = "";
                                id_pembayaran.value = "";
                            }
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (xhr, status, error) {
                    let errorMessage = "Terjadi kesalahan saat memproses data.";
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        errorMessage = xhr.responseJSON.error;
                    } else if (xhr.responseText) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            errorMessage = response.error || errorMessage;
                        } catch (e) {
                            console.error("Error parsing JSON response:", e);
                        }
                    }

                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: errorMessage,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });

    btn_prosesBG.addEventListener("click", function (event) {
        event.preventDefault();
        if (proses == 3) {
            Swal.fire({
                title: "Apakah anda yakin menghapus?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "MaintenanceBKKKRR2",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: proses,
                            bg: bg ? 1 : 0,
                            id_pembayaran: id_pembayaran.value,
                            noJnsByr: noJnsByr.value,
                            jatuhTempo: jatuhTempo.value,
                            statusCetak: statusCetak.value,
                            jumlahJnsByr: jumlahJnsByr.value,
                            id_detailkiri: id_detailkiri.value,
                            rincian: rincian.value,
                            nilaiRincian: nilaiRincian.value,
                            kdPerkiraan1: kdPerkiraan1.value,
                            bg_b: bg_b.value,
                            id_detailkanan: id_detailkanan.value,
                            dp: dp,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tableatas.ajax.reload();
                                        tablekiri.ajax.reload();
                                        tablekanan.ajax.reload();
                                        id_detailkanan.value = "";
                                        id_detailkiri.value = "";
                                        id_pembayaran.value = "";
                                    } else {
                                        tableatas.ajax.reload();
                                        tablekiri.ajax.reload();
                                        tablekanan.ajax.reload();
                                        id_detailkanan.value = "";
                                        id_detailkiri.value = "";
                                        id_pembayaran.value = "";
                                    }
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                }
            });
        } else {
            $.ajax({
                url: "MaintenanceBKKKRR2",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    bg: bg ? 1 : 0,
                    id_pembayaran: id_pembayaran.value,
                    noJnsByr: noJnsByr.value,
                    jatuhTempo: jatuhTempo.value,
                    statusCetak: statusCetak.value,
                    jumlahJnsByr: jumlahJnsByr.value,
                    id_detailkiri: id_detailkiri.value,
                    rincian: rincian.value,
                    nilaiRincian: nilaiRincian.value,
                    kdPerkiraan1: kdPerkiraan1.value,
                    bg_b: bg_b.value,
                    id_detailkanan: id_detailkanan.value,
                    dp: dp,
                },
                success: function (response) {
                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                tableatas.ajax.reload();
                                tablekiri.ajax.reload();
                                tablekanan.ajax.reload();
                                id_detailkanan.value = "";
                                id_detailkiri.value = "";
                                id_pembayaran.value = "";
                            } else {
                                tableatas.ajax.reload();
                                tablekiri.ajax.reload();
                                tablekanan.ajax.reload();
                                id_detailkanan.value = "";
                                id_detailkiri.value = "";
                                id_pembayaran.value = "";
                            }
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (xhr, status, error) {
                    let errorMessage = "Terjadi kesalahan saat memproses data.";
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        errorMessage = xhr.responseJSON.error;
                    } else if (xhr.responseText) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            errorMessage = response.error || errorMessage;
                        } catch (e) {
                            console.error("Error parsing JSON response:", e);
                        }
                    }

                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: errorMessage,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        bg_b.value = rowData.Nilai_Pembayaran;
        proses = 3;
        if (rowData == null && rowData == undefined) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }

        if (
            (rowDataKiri == null || rowDataKiri == undefined) &
            (rowDataKanan == null || rowDataKanan == undefined)
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang mau dihapus terlebih dahulu!",
                showConfirmButton: true,
            });
            return;
        }

        if (
            rowDataKiri != null &&
            rowDataKiri != undefined &&
            rowDataKanan != null &&
            rowDataKanan != undefined
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih dari salah satu tabel BG/Cek atau Pembayaran!",
                showConfirmButton: true,
            });
            return;
        }

        if (bg == true && rowDataKiri != null && rowDataKiri != undefined) {
            var modalBG = new bootstrap.Modal(
                document.getElementById("formBGModal"),
                {
                    keyboard: false,
                }
            );
            modalBG.show();
            bank.value = rowData.Id_Bank;
            jnsByr.value = rowData.Jenis_Pembayaran;
            id_jnsByr.value = rowData.Id_Jenis_Bayar;
            noJnsByr.value = rowDataKiri.No_BGCek;
            jumlahJnsByr.value = rowDataKiri.Nilai_BGCek;
            jatuhTempo.value = rowDataKiri.Jatuh_Tempo;
            statusCetak.value = rowDataKiri.Status_Cetak;
            setTimeout(() => {
                noJnsByr.focus();
            }, 500);
        } else if (
            bg == false &&
            rowDataKanan != null &&
            rowDataKanan != undefined
        ) {
            var modalPem = new bootstrap.Modal(
                document.getElementById("formModalPembayaran"),
                {
                    keyboard: false,
                }
            );
            modalPem.show();
            bank_pembayaran.value = rowData.Id_Bank;
            jnsByr_pembayaran.value = rowData.Jenis_Pembayaran;
            rincian.value = rowDataKanan.Rincian_Bayar;
            nilaiRincian.value = rowDataKanan.Nilai_Rincian;
            kdPerkiraan1.value = rowDataKanan.Kode_Perkiraan;
            kdPerkiraan2.value = rowDataKanan.Keterangan;
        } else {
            Swal.fire({
                title: "Detail BG/Cek atau Detail Pembayaran, Pilih dulu!",
                icon: "info",
                showConfirmButton: true,
            });
        }
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        bg_b.value = rowData.Nilai_Pembayaran;
        proses = 2;
        if (rowData == null && rowData == undefined) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }

        if (
            (rowDataKiri == null || rowDataKiri == undefined) &
            (rowDataKanan == null || rowDataKanan == undefined)
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang mau dikoreksi terlebih dahulu!",
                showConfirmButton: true,
            });
            return;
        }

        if (
            rowDataKiri != null &&
            rowDataKiri != undefined &&
            rowDataKanan != null &&
            rowDataKanan != undefined
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih dari salah satu tabel BG/Cek atau Pembayaran!",
                showConfirmButton: true,
            });
            return;
        }

        if (bg == true && rowDataKiri != null && rowDataKiri != undefined) {
            var modalBG = new bootstrap.Modal(
                document.getElementById("formBGModal"),
                {
                    keyboard: false,
                }
            );
            modalBG.show();
            bank.value = rowData.Id_Bank;
            jnsByr.value = rowData.Jenis_Pembayaran;
            id_jnsByr.value = rowData.Id_Jenis_Bayar;
            noJnsByr.value = rowDataKiri.No_BGCek;
            jumlahJnsByr.value = rowDataKiri.Nilai_BGCek;
            // let parsedDate = parseDateYMD(rowDataKiri.Jatuh_Tempo);
            // jatuhTempo.value = formatDateToMMDDYYYY(parsedDate);
            console.log(rowDataKiri.Jatuh_Tempo);
            console.log(new Date(rowDataKiri.Jatuh_Tempo));
            var jatuhTempoDate = new Date(rowDataKiri.Jatuh_Tempo);
            jatuhTempoDate.setDate(jatuhTempoDate.getDate() + 1);
            jatuhTempo.valueAsDate = jatuhTempoDate;
            statusCetak.value = rowDataKiri.Status_Cetak;
            setTimeout(() => {
                noJnsByr.focus();
            }, 500);
        } else if (
            bg == false &&
            rowDataKanan != null &&
            rowDataKanan != undefined
        ) {
            var modalPem = new bootstrap.Modal(
                document.getElementById("formModalPembayaran"),
                {
                    keyboard: false,
                }
            );
            modalPem.show();
            bank_pembayaran.value = rowData.Id_Bank;
            jnsByr_pembayaran.value = rowData.Jenis_Pembayaran;
            rincian.value = rowDataKanan.Rincian_Bayar;
            nilaiRincian.value = rowDataKanan.Nilai_Rincian;
            kdPerkiraan1.value = rowDataKanan.Kode_Perkiraan;
            kdPerkiraan2.value = escapeHTML(rowDataKanan.Keterangan);
            nilaiBayar.value = 0;
        } else {
            Swal.fire({
                title: "Detail BG/Cek atau Detail Pembayaran, Pilih dulu!",
                icon: "info",
                showConfirmButton: true,
            });
        }
    });

    btn_tampil.addEventListener("click", function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );
        myModal.show();
    });

    btn_refresh.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_okbkk.addEventListener("click", function (event) {
        event.preventDefault();
        tabletampilBKK = $("#tabletampilBKK").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "MaintenanceBKKKRR2/getBKK",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        month: month.value,
                        year: year.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_BKK",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "NilaiBKK" },
                { data: "NM_SUP" },
                { data: "Id_MataUang" },
                { data: "Id_Jenis_Bayar" },
            ],
            columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });

    $("#tabletampilBKK tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#tabletampilBKK tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataBKK = tabletampilBKK.row($(this).closest("tr")).data();
                console.log(rowDataBKK, this, tabletampilBKK);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
            }
        }
    );

    btn_cetakbkk.addEventListener("click", function (event) {
        event.preventDefault();
        bkk.value = rowDataBKK.Id_BKK;
        nilaiBkk.value = rowDataBKK.NilaiBKK;
        nilaiPembulatan.value = rowDataBKK.NilaiBKK;
        Swal.fire({
            title: "Merubah Nilai Pembulatannya ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                btn_cetakbkk.style.display = "none";
                btn_prosesbkk.style.display = "block";
                setTimeout(() => {
                    nilaiPembulatan.focus();
                }, 300);
            } else {
                window.location.href = "MaintenanceBKKKRR2Print";
            }
        });
    });

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        bg_b.value = null;
        proses = 1;
        if (rowData == null && rowData == undefined) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        if (bg == true) {
            var modalBG = new bootstrap.Modal(
                document.getElementById("formBGModal"),
                {
                    keyboard: false,
                }
            );
            modalBG.show();
            bank.value = rowData.Id_Bank;
            jnsByr.value = rowData.Jenis_Pembayaran;
            id_jnsByr.value = rowData.Id_Jenis_Bayar;
            jumlahJnsByr.value = 0;
            setTimeout(() => {
                noJnsByr.focus();
            }, 500);
        } else if (bg == false) {
            var modalPem = new bootstrap.Modal(
                document.getElementById("formModalPembayaran"),
                {
                    keyboard: false,
                }
            );
            modalPem.show();
            bank_pembayaran.value = rowData.Id_Bank;
            jnsByr_pembayaran.value = rowData.Jenis_Pembayaran;
        } else {
            Swal.fire({
                title: "Detail BG/Cek atau Detail Pembayaran, Pilih dulu!",
                icon: "info",
                showConfirmButton: true,
            });
        }
    });

    btn_kodePerkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="kiraTable" class="display" style="width:100%"><thead><tr><th>Keterangan</th><th>Kode Perkiraan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#kiraTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#kiraTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKKKRR2/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Keterangan" },
                                { data: "NoKodePerkiraan" },
                            ],
                        });
                        $("#kiraTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kdPerkiraan1.value = selectedRow.NoKodePerkiraan.trim();
                    kdPerkiraan2.value = selectedRow.Keterangan.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_noBg.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a No BG",
                html: '<table id="btnBGTable" class="display" style="width:100%"><thead><tr><th>No BG</th><th>ID Detail BG</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#btnBGTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#btnBGTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKKKRR2/getDetailBG",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_pembayaran: id_pembayaran.value,
                                },
                                success: function (response) {
                                    if (response.message) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Success!",
                                            text: response.message,
                                            showConfirmButton: true,
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                            }
                                        });
                                    } else if (response.error) {
                                        Swal.fire({
                                            icon: "info",
                                            title: "Info!",
                                            text: response.error,
                                            showConfirmButton: false,
                                        });
                                    }
                                },
                            },
                            columns: [
                                { data: "No_BGCek" },
                                { data: "Id_Detail_BGCek" },
                            ],
                        });
                        $("#btnBGTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // kdPerkiraan1.value = selectedRow.NoKodePerkiraan.trim();
                    // kdPerkiraan2.value = selectedRow.Keterangan.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
