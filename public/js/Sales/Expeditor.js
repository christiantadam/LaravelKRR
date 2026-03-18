jQuery(function ($) {
    //#region Variables
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let button_tambahExpeditor = document.getElementById("button_tambahExpeditor"); // prettier-ignore
    let exp_namaExpeditor = document.getElementById("exp_namaExpeditor");
    let exp_contactPerson = document.getElementById("exp_contactPerson");
    let exp_alamatKantor = document.getElementById("exp_alamatKantor");
    let exp_kodePos = document.getElementById("exp_kodePos");
    let exp_kotaExpeditor = document.getElementById("exp_kotaExpeditor");
    let exp_provinsiExpeditor = document.getElementById("exp_provinsiExpeditor"); //prettier-ignore
    let exp_negaraExpeditor = document.getElementById("exp_negaraExpeditor");
    let exp_nomorTelepon1 = document.getElementById("exp_nomorTelepon1");
    let exp_nomorTelepon2 = document.getElementById("exp_nomorTelepon2");
    let exp_nomorHP1 = document.getElementById("exp_nomorHP1");
    let exp_nomorHP2 = document.getElementById("exp_nomorHP2");
    let exp_nomorTelex = document.getElementById("exp_nomorTelex");
    let exp_nomorFax1 = document.getElementById("exp_nomorFax1");
    let exp_nomorFax2 = document.getElementById("exp_nomorFax2");
    let exp_emailExpeditor = document.getElementById("exp_emailExpeditor");
    let exp_buttonProses = document.getElementById("exp_buttonProses");
    let modalExpeditor = document.getElementById("modalExpeditor");
    let modalLabelExpeditor = document.getElementById("modalLabelExpeditor");
    let table_expeditor = $("#table_expeditor").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ordering: true,
        order: [[0, "asc"]],
        autoWidth: false,
        ajax: {
            url: "/Expeditor/getAllExpeditor",
            type: "GET",
            data: {
                _token: csrfToken,
            },
        },
        columns: [
            { data: "NamaExpeditor" },
            {
                data: "ContactPerson",
                render: function (data, type, full, meta) {
                    return data ?? "".trim();
                },
            },
            {
                data: "Kota",
                render: function (data, type, full, meta) {
                    return data ?? "".trim();
                },
            },
            {
                data: "IDExpeditor",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-sm btn-primary btn-edit" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#modalExpeditor">&#x270E; Edit</button> ' +
                        '<button class="btn btn-sm btn-danger btn-delete" data-id="' +
                        data +
                        '">&#x1F5D1; Nonaktifkan</button>'
                    );
                },
            },
        ],
    });
    //#endregion

    //#region Functions
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

    function clearModal() {
        // Clear all input type="text"
        modalExpeditor
            .querySelectorAll('input[type="text"]')
            .forEach(function (input) {
                input.value = "";
            });
    }

    function restoreFocusTrap() {
        // Restore Bootstrap 4 modal focus trap after alert
        $(document).on("focusin.modal", function (e) {
            if (
                $(e.target).closest(".modal").length === 0 &&
                $(".modal:visible").length > 0
            ) {
                e.stopPropagation();
                $(".modal:visible").focus();
            }
        });
    }
    //#endregion

    //#region Load Form

    //#endregion

    //#region Event Listeners
    $("#modalExpeditor").on("shown.bs.modal", function (event) {
        exp_namaExpeditor.focus();
    });

    $("#modalExpeditor").on("hidden.bs.modal", function (event) {
        clearModal();
    });

    button_tambahExpeditor.addEventListener("click", function (e) {
        $("#exp_buttonProses").data("id", null);
        modalLabelExpeditor.innerText = "Tambah Expeditor";
    });

    exp_buttonProses.addEventListener("click", function (e) {
        let idExpeditor = $("#exp_buttonProses").data("id");
        $.ajax({
            url: "/Expeditor",
            type: "POST",
            data: {
                jenis: idExpeditor ? "editExpeditor" : "tambahExpeditor",
                _token: csrfToken,
                NamaExpeditor: exp_namaExpeditor.value,
                IDExpeditor: idExpeditor,
                ContactPerson: exp_contactPerson.value,
                Alamat: exp_alamatKantor.value,
                KodePos: exp_kodePos.value,
                Kota: exp_kotaExpeditor.value,
                Propinsi: exp_provinsiExpeditor.value,
                Negara: exp_negaraExpeditor.value,
                NoTelp1: exp_nomorTelepon1.value,
                NoTelp2: exp_nomorTelepon2.value,
                NoHp1: exp_nomorHP1.value,
                NoHp2: exp_nomorHP2.value,
                NoTelex: exp_nomorTelex.value,
                NoFax1: exp_nomorFax1.value,
                NoFax2: exp_nomorFax2.value,
                Email: exp_emailExpeditor.value,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil diproses",
                    }).then(() => {
                        table_expeditor.ajax.reload(null, false);
                        $("#modalExpeditor").modal("hide");
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#exp_buttonProses").data("id", rowID);
        modalLabelExpeditor.innerText = "Edit Expeditor";

        // Get the row data from the DataTable
        var rowData = table_expeditor.row($(this).closest("tr")).data();

        if (!rowData) {
            console.error("Row data not found");
            return;
        }
        console.log(rowData);

        $.ajax({
            url: "/Expeditor/getExpeditorById",
            type: "GET",
            data: {
                idExpeditor: rowID,
            },
            success: function (response) {
                console.log(response);
                if (response) {
                    // Assuming your server returns an array of objects for the table data
                    exp_namaExpeditor.value = response[0].NamaExpeditor;
                    exp_contactPerson.value = response[0].ContactPerson;
                    exp_alamatKantor.value = response[0].Alamat;
                    exp_kodePos.value = response[0].KodePos;
                    exp_kotaExpeditor.value = response[0].Kota;
                    exp_provinsiExpeditor.value = response[0].Propinsi;
                    exp_negaraExpeditor.value = response[0].Negara;
                    exp_nomorTelepon1.value = response[0].NoTelp1;
                    exp_nomorTelepon2.value = response[0].NoTelp2;
                    exp_nomorHP1.value = response[0].NoHp1;
                    exp_nomorHP2.value = response[0].NoHp2;
                    exp_nomorTelex.value = response[0].NoTelex;
                    exp_nomorFax1.value = response[0].NoFax1;
                    exp_nomorFax2.value = response[0].NoFax2;
                    exp_emailExpeditor.value = response[0].Email;
                } else {
                    console.error(
                        "Data is not in the expected format:",
                        response,
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin menghapus Expeditor ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya!",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/Expeditor",
                    type: "POST",
                    data: {
                        jenis: "hapusExpeditor",
                        idExpeditor: rowID,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        console.log(response);
                        if (response.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil",
                                text: "Data berhasil dinonaktifkan",
                            }).then(() => {
                                table_expeditor.ajax.reload(null, false);
                            });
                        } else if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan",
                                text: response.error,
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error deleting data: ", error);
                    },
                });
            }
        });
    });

    exp_namaExpeditor.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_contactPerson.focus();
        }
    });

    exp_contactPerson.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_alamatKantor.focus();
        }
    });

    exp_alamatKantor.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_kodePos.focus();
        }
    });

    exp_kodePos.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_kotaExpeditor.focus();
        }
    });

    exp_kotaExpeditor.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_provinsiExpeditor.focus();
        }
    });

    exp_provinsiExpeditor.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_negaraExpeditor.focus();
        }
    });

    exp_negaraExpeditor.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_nomorTelepon1.focus();
        }
    });

    exp_nomorTelepon1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_nomorTelepon2.focus();
        }
    });

    exp_nomorTelepon2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_nomorHP1.focus();
        }
    });

    exp_nomorHP1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_nomorHP2.focus();
        }
    });

    exp_nomorHP2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_nomorTelex.focus();
        }
    });

    exp_nomorTelex.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_nomorFax1.focus();
        }
    });

    exp_nomorFax1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_nomorFax2.focus();
        }
    });

    exp_nomorFax2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_emailExpeditor.focus();
        }
    });

    exp_emailExpeditor.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            exp_buttonProses.focus();
        }
    });
    //#endregion
});
