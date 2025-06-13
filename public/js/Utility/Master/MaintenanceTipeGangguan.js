jQuery(function ($) {
    //#region Load Form
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var dataTableCustomer = $("#table-customer").DataTable({
        serverSide: true,
        responsive: true,
        ordering: false,
        ajax: {
            url: "/MaintenanceTipeGangguan/create",
            type: "GET",
        },
        columns: [
            { data: "id_type" },
            { data: "nama_type_gangguan" },
            {
                data: "id_type",
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

    //#region Tambah
    $("#tambahCustomerForm").on("submit", function (e) {
        e.preventDefault();

        var tipe_gangguan = $("#tipe_gangguan").val().trim();

        $.ajax({
            url: "/MaintenanceTipeGangguan",
            type: "POST",
            data: {
                tipe_gangguan: tipe_gangguan,
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
    //#region Edit
    $(document).on("click", ".btn-edit", function () {
        var id_type = $(this).data("id");

        // Ambil data customer berdasarkan Kode Customer
        $.ajax({
            url: "/MaintenanceTipeGangguan/" + id_type + "/edit",
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
                    title: "Edit Tipe Gangguan",
                    html: `
                            <div style="padding: 20px; text-align: left;">
                                <div style="margin-bottom: 15px;">
                                    <label for="swal-input1" style="display: block; font-weight: bold; margin-bottom: 5px; white-space: nowrap;">ID</label>
                                    <input id="swal-input1" class="input" value="${data[0].id_type}" style="width: calc(100% - 10px); padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 10px; overflow: hidden;" readOnly>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="swal-input2" style="display: block; font-weight: bold; margin-bottom: 5px; white-space: nowrap;">Tipe Gangguan</label>
                                    <input id="swal-input2" class="input" value="${data[0].nama_type_gangguan}" style="width: calc(100% - 10px); padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; overflow: hidden;">
                                </div>
                            </div>
                        `,
                    showCancelButton: true,
                    cancelButtonText: "Cancel",
                    focusConfirm: false,
                    preConfirm: () => {
                        const id_type = $("#swal-input1").val();
                        const nama_type_gangguan = $("#swal-input2").val();
                        return {
                            id_type: id_type,
                            nama_type_gangguan: nama_type_gangguan,
                        };
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        // You can proceed with further actions such as making another AJAX call to save the updated data

                        let id_type = $("#swal-input1").val();
                        nama_type_gangguan = $("#swal-input2").val();
                        $.ajax({
                            url: "/MaintenanceTipeGangguan/" + id_type,
                            type: "PUT",
                            data: {
                                id_type: id_type,
                                nama_type_gangguan: nama_type_gangguan,
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

    //#region Delete
    $(document).on("click", ".btn-delete", function (e) {
        e.preventDefault();
        var id_type = $(this).data("id");

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
                console.log(id_type);
                $.ajax({
                    url: "/MaintenanceTipeGangguan/" + id_type, // Gantilah dengan URL endpoint yang benar
                    method: "DELETE",
                    data: {
                        id_type: id_type,
                    },
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
                                title: "Success!",
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
