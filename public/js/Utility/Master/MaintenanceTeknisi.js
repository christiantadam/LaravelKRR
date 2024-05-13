$(document).ready(function () {
    let divLokasiTambah = document.getElementById("divLokasiTambah");
    let listLokasiTambah = document.getElementById("listLokasiTambah");
    let divLokasiEdit = document.getElementById("divLokasiEdit");
    let listLokasiEdit = document.getElementById("listLokasiEdit");
    let lokasiUserSebelum = [];
    let lokasiUserSesudah = [];
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

    $(document).on("click", ".editButtonTeknisi", function (e) {
        // e.preventDefault();
        var teknisiId = $(this).data("teknisi-id");
        var $tr = $(this).closest("tr");
        var lokasi = $tr.find("td:first").text();

        // console.log("ID Teknisi yang akan diedit:", teknisiId);
        // console.log("tes");

        getLokasi(teknisiId);
        var datas = {
            id: teknisiId,
            lokasi: lokasi,
        };
        console.log(datas);
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
            TeknisiAwal: TeknisiAwalValue,
            LokasiAwal: LokasiAwalValue,
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
                } else {
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
                } else {
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

    getLokasi(0); //initialize checkboxes in modal

    function getLokasi(idTeknisi) {
        fetch("/AllLokasiTeknisi/" + idTeknisi)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let checklist;
                if (data.length > 1) {
                    checklist = createChecklist(data[0], data[1]);
                    const checkboxes = document.querySelectorAll(
                        'input[type="checkbox"]:checked'
                    );
                    fiturUserSebelum = Array.from(checkboxes).map((checkbox) =>
                        parseInt(checkbox.value)
                    );
                } else {
                    checklist = createChecklist(data[0], []);
                }
                // console.log(checklist);
                if (idTeknisi == 0) {
                    divLokasiTambah.style.display = "block";
                    listLokasiTambah.appendChild(checklist);
                } else {
                    divLokasiEdit.style.display = "block";
                    listLokasiEdit.appendChild(checklist);
                }
                // divButton.style.display = "block";
                // document.getElementById("item-0").focus();
            });
    }

    function createChecklist(array, checkedItems) {
        let currentDiv;
        let checklist;
        let listItemCounter = 0;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < array.length; i++) {
            const item = array[i];

            if (listItemCounter % 15 === 0) {
                currentDiv = document.createElement("div");
                checklist = document.createElement("ul");
                currentDiv.appendChild(checklist);
                fragment.appendChild(currentDiv);
            }

            const listItem = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `item-${i}`;
            checkbox.value = item.Id_Lokasi;

            // Check the checkbox if its value exists in the checkedItems array
            if (checkedItems.length !== 0) {
                const isChecked = checkedItems.some(
                    (checkedItem) => checkedItem.id_lokasi === item.Id_Lokasi
                );
                // console.log(checkbox, isChecked);
                if (isChecked) {
                    checkbox.checked = true;
                }
            }

            const label = document.createElement("label");
            label.setAttribute("for", `item-${i}`);
            label.textContent = `${item.Lokasi}`;

            listItem.appendChild(checkbox);
            listItem.appendChild(label);

            checklist.appendChild(listItem);

            listItemCounter++;
        }

        return fragment;
    }
});
