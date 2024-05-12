$(document).ready(function () {
    var dataTableTeknisi = $("#table-teknisi").DataTable({
        serverSide: true,
        responsive: true,
        ordering: false,
        ajax: {
            url: "/get-teknisi",
            type: "GET",
        },
        columns: [
            { data: "Lokasi" },
            { data: "NamaUser" },
            // { data: "IdUserMaster" },
            {
                data: "Id_Teknisi",
                render: function (data, type, full, meta) {
                    var rowID = data;
                    return (
                        '<button class="btn btn-primary editButtonTeknisi" data-teknisi-id="' +
                        rowID +
                        '" data-bs-toggle="modal" data-bs-target="#editmodal" type="button">Edit</button>' +
                        '<button class="btn btn-secondary deleteButtonTeknisi" data-id="' +
                        rowID +
                        '">Hapus</button>'
                    );
                },
            },
        ],
    });

    // $("#refreshButtonTeknisi").click(function () {
    //     $("#hiddenIdTeknisi").val("");
    //     dataTableTeknisi.ajax.reload();
    // });

    $(document).on("click", ".editButtonTeknisi", function (e) {
        // e.preventDefault();
        var teknisiId = $(this).data("teknisi-id");
        var $tr = $(this).closest('tr');
        var lokasi = $tr.find('td:first').text();
        console.log("ID Teknisi yang akan diedit:", teknisiId);
        console.log("tes");

        var datas = {
            id: teknisiId,
            lokasi: lokasi,
        };
        $.ajax({
            type: "GET",
            url: "/get-teknisi-id", //get id lokasi awal
            data: datas,
            success: function (response) {
                console.log(response);
                $("#editteknisi").val(response.IdUserMaster); //set selected index
                $("#editlokasi").val(response.Id_Lokasi); //set selected index
                $("#hiddenIdTeknisiAwalValue").val(teknisiId);
                $("#hiddenIdLokasiAwalValue").val(response.Id_Lokasi);
            },
        });
    });

    $("#updateButtonTeknisi").click(function () {
        var LokasiValue = $("#editlokasi").val();
        var IdUserMasterValue = $("#editteknisi").val();
        var TeknisiAwalValue = $("#hiddenIdTeknisiAwalValue").val();
        var LokasiAwalValue = $("#hiddenIdLokasiAwalValue").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            IdUserMaster: IdUserMasterValue,
            Lokasi: LokasiValue,
            TeknisiAwal : TeknisiAwalValue,
            LokasiAwal : LokasiAwalValue
        };
        console.log(requestData);
        $.ajax({
            url: "/update-teknisi",
            method: "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Data Berhasil Disimpan!",
                        showConfirmButton: false,
                        timer: "2000",
                    });
                    // Clear Form
                    $("#teknisi").val("");
                    $("#lokasi").val("");
                    dataTableTeknisi.ajax.reload();
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: response.error,
                        showConfirmButton: false,
                        timer: "2000",
                    });
                }
                // Clear Form
                $("#editteknisi").val("");
                $("#editlokasi").val("");
                $("#hiddenIdTeknisi").val("");
                dataTableTeknisi.ajax.reload();
                $("#editmodal").modal("hide");
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
                $("#editmodal").modal("hide");
            },
        });
    });

    // DeleteButton click
    $(document).on("click", ".deleteButtonTeknisi", function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var rowID = $(this).data("id");

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus Data Teknisi yang terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    id: rowID,
                };
                $.ajax({
                    url: "/delete-teknisi",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        // console.log(response);
                        dataTableTeknisi.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: "2000",
                        });
                        $("#hiddenIdTeknisi").val("");
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                });
            }
        });
    });

    $("#saveButtonTeknisi").click(function () {
        var TeknisiValue = $("#teknisi").val();
        var LokasiValue = $("#lokasi").val();
        // var nomorIdValue = $("#hiddenIdTeknisi").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            NamaTeknisi: TeknisiValue,
            Lokasi: LokasiValue,
        };
        console.log(TeknisiValue);
        console.log(LokasiValue);
        $.ajax({
            url: "/save-teknisi",
            method: "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Data Berhasil Disimpan!",
                        showConfirmButton: false,
                        timer: "2000",
                    });
                    // Clear Form
                    $("#teknisi").val("");
                    $("#lokasi").val("");
                    dataTableTeknisi.ajax.reload();
                }
                else{
                    Swal.fire({
                        icon: "error",
                        title: response.error,
                        showConfirmButton: false,
                        timer: "2000",
                    });
                }
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
        });
    });
});
