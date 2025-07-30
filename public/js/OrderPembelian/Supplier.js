jQuery(function ($) {
    let alamat1 = document.getElementById("alamat1");
    let alamat2 = document.getElementById("alamat2");
    let button_tambahSupplier = document.getElementById("button_tambahSupplier"); // prettier-ignore
    let clear_button = document.getElementById("clear_button");
    let contact_person1 = document.getElementById("contact_person1");
    let contact_person2 = document.getElementById("contact_person2");
    let csrf = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let email1 = document.getElementById("email1");
    let email2 = document.getElementById("email2");
    let fax1 = document.getElementById("fax1");
    let fax2 = document.getElementById("fax2");
    let kode = document.getElementById("kode");
    let kode_form = document.getElementById("kode_form");
    let kota1 = document.getElementById("kota1");
    let kota2 = document.getElementById("kota2");
    let mata_uang = document.getElementById("mata_uang");
    let mobile_phone1 = document.getElementById("mobile_phone1");
    let mobile_phone2 = document.getElementById("mobile_phone2");
    let negara1 = document.getElementById("negara1");
    let negara2 = document.getElementById("negara2");
    let phone1 = document.getElementById("phone1");
    let phone2 = document.getElementById("phone2");
    let save_button = document.getElementById("save_button");
    let supplier_id = document.getElementById("supplier_id");
    let supplier_text = document.getElementById("supplier_text");
    let tambahSupplierLabel = document.getElementById("tambahSupplierLabel");
    let tambahSupplierModal = document.getElementById("tambahSupplierModal");
    let table_Supplier = $("#table_Supplier").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ordering: true,
        order: [[0, "asc"]],
        autoWidth: false,
        ajax: {
            url: "/Supplier",
            type: "POST", // Use POST for Laravel
            data: {
                _token: csrf,
                jenis: "getAllSupplier",
            },
        },
        columns: [
            { data: "NO_SUP" },
            { data: "NM_SUP" },
            {
                data: "ALAMAT1",
                render: function (data, type, full, meta) {
                    return data ?? "".trim();
                },
            },
            {
                data: "KOTA1",
                render: function (data, type, full, meta) {
                    return data ?? "".trim();
                },
            },
            {
                data: "NEGARA1",
                render: function (data, type, full, meta) {
                    return data ?? "".trim();
                },
            },
            {
                data: "NO_SUP",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-sm btn-info btn-edit" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#tambahSupplierModal">&#x270E; Edit</button> ' +
                        '<button class="btn btn-sm btn-danger btn-delete" data-id="' +
                        data +
                        '">&#x1F5D1; Hapus</button>'
                    );
                },
            },
        ],
    });

    //#region Functions
    function clearModal() {
        // Clear all input type="text"
        tambahSupplierModal
            .querySelectorAll('input[type="text"]')
            .forEach(function (input) {
                input.value = "";
            });

        // Clear all select elements
        tambahSupplierModal
            .querySelectorAll("select")
            .forEach(function (select) {
                select.selectedIndex = 0; // or -1 if you want to remove selection completely
                // If using Select2
                if ($(select).hasClass("select2-hidden-accessible")) {
                    $(select).val(null).trigger("change");
                }
            });
    }
    //#endregion

    //#region Load Form
    setInputFilter(
        mobile_phone1,
        function (value) {
            return /^\+?\d*$/.test(value); // Allow optional "+" at start, followed by digits
        },
        "Only numbers and an optional leading '+' are allowed"
    );
    setInputFilter(
        mobile_phone2,
        function (value) {
            return /^\+?\d*$/.test(value); // Allow optional "+" at start, followed by digits
        },
        "Only numbers and an optional leading '+' are allowed"
    );
    setInputFilter(
        phone1,
        function (value) {
            return /^\+?\d*$/.test(value); // Allow optional "+" at start, followed by digits
        },
        "Only numbers and an optional leading '+' are allowed"
    );
    setInputFilter(
        phone2,
        function (value) {
            return /^\+?\d*$/.test(value); // Allow optional "+" at start, followed by digits
        },
        "Only numbers and an optional leading '+' are allowed"
    );
    //#endregion

    //#region Event Listeners
    button_tambahSupplier.addEventListener("click", function (e) {
        $("#save_button").data("id", null);
    });

    save_button.addEventListener("click", function (e) {
        idSupplier = $("#save_button").data("id");
        $.ajax({
            url: "/KebutuhanKomponenJBB",
            type: "POST",
            data: {
                jenis: idSupplier ? "editSupplier" : "tambahSupplier",
                kodeBarang: kodeBarang,
                jumlahKebutuhan: jumlah,
                tanggalKebutuhanAwal: tanggalAwal,
                tanggalKebutuhanAkhir: tanggalAkhir,
                tanggalKebutuhanKirim: tanggalKirim,
                lokasi: lokasi,
                keterangan: keteranganKebutuhan.value,
                idKebutuhanKomponen: $("#modal_ok").data("id"),
                _token: csrf,
            },
            success: function (response) {
                if (response.success) {
                    $("#tambahKebutuhanKomponenModal").modal("hide");
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil ditambahkan",
                    }).then(() => {
                        $("#tambahKebutuhanKomponenModal").modal("hide");
                        table_daftarKebutuhan.ajax.reload();
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

    clear_button.addEventListener("click", function (e) {
        clearModal();
    });

    $("#tambahSupplierModal").on("hidden.bs.modal", function (event) {
        clearModal();
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#save_button").data("id", rowID);

        // Get the row data from the DataTable
        var rowData = table_Supplier.row($(this).closest("tr")).data();

        if (!rowData) {
            console.error("Row data not found");
            return;
        }
        console.log(rowData);

        $.ajax({
            url: "/Supplier/getSupplierById",
            type: "GET",
            data: {
                idSupplier: rowID,
            },
            success: function (response) {
                console.log(response);
                if (response) {
                    // Assuming your server returns an array of objects for the table data
                    supplier_text.value = response[0].NM_SUP.trim();
                    contact_person1.value = response[0].PERSON1 ?? "".trim();
                    phone1.value = response[0].TLP1 ?? "".trim();
                    mobile_phone1.value = response[0].HPHONE1 ?? "".trim();
                    email1.value = response[0].TELEX1 ?? "".trim();
                    fax1.value = response[0].FAX1 ?? "".trim();
                    alamat1.value = response[0].ALAMAT1 ?? "".trim();
                    kota1.value = response[0].KOTA1 ?? "".trim();
                    negara1.value = response[0].NEGARA1 ?? "".trim();
                    contact_person2.value = response[0].PERSON2 ?? "".trim();
                    phone2.value = response[0].TLP2 ?? "".trim();
                    mobile_phone2.value = response[0].HPHONE2 ?? "".trim();
                    email2.value = response[0].TELEX2 ?? "".trim();
                    fax2.value = response[0].FAX2 ?? "".trim();
                    alamat2.value = response[0].ALAMAT2 ?? "".trim();
                    kota2.value = response[0].KOTA2 ?? "".trim();
                    negara2.value = response[0].NEGARA2 ?? "".trim();
                    mata_uang.value = response[0].ID_MATAUANG;
                } else {
                    console.error(
                        "Data is not in the expected format:",
                        response
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
        $.ajax({
            url: "/Supplier",
            type: "POST",
            data: {
                jenis: "hapusSupplier",
                idSupplier: rowID,
                _token: csrf,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil dinonaktifkan",
                    }).then(() => {
                        table_Supplier.ajax.reload();
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
    //#endregion
});
