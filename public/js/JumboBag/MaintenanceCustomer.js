$(document).ready(function () {
    //#region Load Form
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var dataTableCustomer = $("#table-customer").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ordering: false,
        ajax: {
            url: "/MaintenanceCustomer/create",
            type: "GET",
        },
        columns: [
            { data: "Kode_Customer" },
            { data: "Nama_Customer" },
            {
                data: "Kode_Customer",
                render: function (data, type, full, meta) {
                    var rowID = data;
                    return (
                        '<button class="btn btn-primary btn-edit" data-id="' +
                        rowID +
                        '">Edit</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        rowID +
                        '">Delete</button>'
                    );
                },
            },
        ],
    });
    // Panggil fungsi fetchCustomers saat halaman dimuat
    // fetchCustomers();

    //#region Function
    // Fungsi untuk mengambil data pelanggan dan mengisi tabel
    // function fetchCustomers() {
    //     $.ajax({
    //         url: "/MaintenanceCustomer/create",
    //         type: "GET",
    //         dataType: "json",
    //         success: function (data) {
    //             var tbody = $("#table-teknisi tbody");
    //             tbody.empty();

    //             data.forEach(function (customer) {
    //                 var row =
    //                     "<tr>" +
    //                     "<td>" +
    //                     customer.Kode_Customer +
    //                     "</td>" +
    //                     "<td>" +
    //                     customer.Nama_Customer +
    //                     "</td>" +
    //                     "<td>" +
    //                     '<button class="btn btn-primary btn-edit" data-id="' +
    //                     customer.Kode_Customer +
    //                     '">Edit</button> ' +
    //                     '<button class="btn btn-danger btn-delete" data-id="' +
    //                     customer.Kode_Customer +
    //                     '">Delete</button>' +
    //                     "</td>" +
    //                     "</tr>";
    //                 tbody.append(row);
    //             });
    //         },
    //         error: function (error) {
    //             console.log("Error fetching customer data:", error);
    //         },
    //     });
    // }

    //#region Event Listener
    // Event listener untuk tombol tambah customer
    $("#tambahCustomerForm").on("submit", function (e) {
        e.preventDefault();

        var kodeCustomer = $("#kodeCustomer").val().toUpperCase().trim();
        var namaCustomer = $("#namaCustomer").val().toUpperCase().trim();

        // Validasi
        // if (kodeCustomer.length > 4) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Error!",
        //         text: "Kode Customer tidak boleh lebih dari 4 karakter!",
        //         showConfirmButton: false,
        //     });
        //     return;
        // }

        $.ajax({
            url: "/MaintenanceCustomer",
            type: "POST",
            data: {
                kode_customer: kodeCustomer,
                nama_customer: namaCustomer,
            },
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                if (response.success) {
                    $("#tambahCustomerModal").modal("hide");
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: response.success,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    dataTableCustomer.ajax.reload(null, false); // Reload DataTable

                    // Remove modal backdrop
                    $(".modal-backdrop").remove();

                    // Reset form fields
                    $("#tambahCustomerForm")[0].reset();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Terjadi kesalahan saat menambahkan data!",
                    showConfirmButton: false,
                });
                console.error("Error adding data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });
    // Event listener untuk tombol edit
    $(document).on("click", ".btn-edit", function () {
        var kodeCustomer = $(this).data("id");
        console.log("Edit customer dengan Kode Customer:", kodeCustomer);

        // Ambil data customer berdasarkan Kode Customer
        $.ajax({
            url: "/MaintenanceCustomer/" + kodeCustomer + "/edit",
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (data) {
                console.log(data);
                // Display SweetAlert popup with form inputs
                Swal.fire({
                    title: "Edit Customer",
                    html: `
                            <div style="padding: 20px; text-align: left;">
                                <div style="margin-bottom: 15px;">
                                    <label for="swal-input1" style="display: block; font-weight: bold; margin-bottom: 5px; white-space: nowrap;">Kode Customer</label>
                                    <input id="swal-input1" class="input" value="${data[0].Kode_Customer}" style="width: calc(100% - 10px); padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 10px; overflow: hidden;">
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="swal-input2" style="display: block; font-weight: bold; margin-bottom: 5px; white-space: nowrap;">Nama Customer</label>
                                    <input id="swal-input2" class="input" value="${data[0].Nama_Customer}" style="width: calc(100% - 10px); padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; overflow: hidden;">
                                </div>
                            </div>
                        `,
                    showCancelButton: true,
                    cancelButtonText: "Cancel",
                    focusConfirm: false,
                    preConfirm: () => {
                        const kodeCustomer = $("#swal-input1")
                            .val()
                            .toUpperCase()
                            .trim();
                        const namaCustomer = $("#swal-input2")
                            .val()
                            .toUpperCase()
                            .trim();
                        if (kodeCustomer.length > 4) {
                            Swal.showValidationMessage(
                                "Kode Customer harus tidak lebih dari 4 karakter"
                            );
                            return false;
                        }
                        return {
                            kodeCustomer: kodeCustomer,
                            namaCustomer: namaCustomer,
                        };
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        // You can proceed with further actions such as making another AJAX call to save the updated data

                        let kodeCustomers = $("#swal-input1")
                            .val()
                            .toUpperCase()
                            .trim();
                        namaCustomer = $("#swal-input2")
                            .val()
                            .toUpperCase()
                            .trim();
                        $.ajax({
                            url: "/MaintenanceCustomer/" + kodeCustomer,
                            type: "PUT",
                            data: {
                                kode_customer: kodeCustomers,
                                nama_customer: namaCustomer,
                            },
                            headers: {
                                "X-CSRF-TOKEN": csrfToken,
                            },
                            beforeSend: function () {
                                // Show loading screen
                                $("#loading-screen").css("display", "flex");
                            },
                            dataType: "json",
                            success: function (response) {
                                if (response.success) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Berhasil!",
                                        text: "Data Berhasil Diupdate!",
                                        showConfirmButton: false,
                                    });
                                    dataTableCustomer.ajax.reload();
                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error!",
                                        text: response.error,
                                        showConfirmButton: false,
                                    });
                                }
                            },
                            error: function (xhr, status, error) {
                                console.error("Error:", status, error);
                            },
                            complete: function () {
                                // Hide loading screen
                                $("#loading-screen").css("display", "none");
                            },
                        });
                    }
                });
            },
            error: function (error) {
                console.log("Error fetching customer data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    // Event listener untuk tombol delete
    $(document).on("click", ".btn-delete", function (e) {
        e.preventDefault();

        var rowID = $(this).data("id");

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus Data Customer yang terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                // var requestData = {
                //     id: rowID,
                // };
                console.log(rowID);
                $.ajax({
                    url: "/MaintenanceCustomer/" + rowID, // Gantilah dengan URL endpoint yang benar
                    method: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    beforeSend: function () {
                        // Show loading screen
                        $("#loading-screen").css("display", "flex");
                    },
                    success: function (response) {
                        dataTableCustomer.ajax.reload(); // Memuat ulang data setelah penghapusan
                        console.log(response);
                        if (response.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Terhapus!",
                                text: response.success,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        } else if (response.info) {
                            Swal.fire({
                                icon: "info",
                                title: "Info!",
                                text: response.info,
                                showConfirmButton: false,
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: response.error,
                                showConfirmButton: false,
                            });
                        }
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data: ",
                            error.responseText
                        );
                    },
                    complete: function () {
                        // Hide loading screen
                        $("#loading-screen").css("display", "none");
                    },
                });
            }
        });
    });
});
