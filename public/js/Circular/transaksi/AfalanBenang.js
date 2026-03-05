jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tanggal = document.getElementById("tanggal");
    let btn_ok = document.getElementById("btn_ok");
    let primer_atas = document.getElementById("primer_atas");
    let sekunder_atas = document.getElementById("sekunder_atas");
    let tritier_atas = document.getElementById("tritier_atas");

    const slcShift = document.getElementById("shift");

    let table_atas = $("#table_atas").DataTable({
    });

    let table_bawah = $("#table_bawah").DataTable({
    });

    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    tanggal.focus();
    const today = new Date();
    today.setDate(today.getDate() - 1);
    tanggal.valueAsDate = today;
    primer_atas.value = 0;
    sekunder_atas.value = 0;
    tritier_atas.value = 0;

    //#region Enter
    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            shift.focus();
        }
    });

    //#region Select2
    $("#" + slcShift.id).select2({ placeholder: "-- Pilih Shift --" });

    $("#" + slcShift.id).on("change", function () {
        setTimeout(() => {
            btn_ok.focus();
        }, 300);
    });

    //#region Event Listener
    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "AfalanBenang/getListAfalanBenang",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tanggal: tanggal.value,
                        shift: $("#" + slcShift.id).val(),
                    });
                },
            },
            columns: [
                {
                    data: "Shift",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: 'Nama_mesin' },
                { data: "Id_order" },
                { data: "Afv_bng_wa" },
                { data: "Afv_bng_we" },
            ],
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
    });

    let rowDataArray = [];
    let rowDataPertama = null;
    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);
                // rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // rowDataPertama = null;
                // Remove the unchecked row data from the array
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                rowDataArray = rowDataArray.filter(
                    (row) => row.Nama_mesin !== rowDataPertama.Nama_mesin
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    btn_kodeperkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira")
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
                        const table = $("#tableKira").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKKKRR1/getKira",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NoKodePerkiraan" },
                                { data: "Keterangan" },
                            ],
                            paging: false,
                            scrollY: "300px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#tableKira_filter input").focus();
                        }, 300);
                        // $("#tableKira_filter input").on("keyup", function () {
                        //     table
                        //         .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //         .search(this.value) // Cari berdasarkan input pencarian
                        //         .draw(); // Perbarui hasil pencarian
                        // });
                        $("#tableKira tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_kira.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    keterangan_kira.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );

                    setTimeout(() => {
                        btn_proses.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});