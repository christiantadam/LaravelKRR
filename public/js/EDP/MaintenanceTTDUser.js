jQuery(function ($) {
    //#region Variables
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_simpanTTD = document.getElementById("btn_simpanTTD");
    let table_userWeb = $("#table_userWeb").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        serverSide: true,
        order: [0, "desc"],
        ajax: {
            url: "/MaintenanceTTDUser/getDataUser",
            type: "GET",
        },
        columns: [
            { data: "NomorUser" },
            { data: "NamaUser" },
            {
                data: "IDUser",
                render: function (data, type, full, meta) {
                    let buttonTtd =
                        '<button class="btn btn-primary btn-ttd" data-id="' +
                        data +
                        '"data-toggle="modal" data-target="#modalTambahTTD">Input TTD File</button>';
                    let buttonCanvas =
                        '<button class="btn btn-success btn-canvas" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#ttdModal" onclick="openTTD()">Input TTD Canvas</button>';
                    // let buttonACC =
                    //     '<button class="btn btn-warning btn-acc" data-id="' +
                    //     data +
                    //     '">Submit</button>';
                    // let buttonHapus =
                    //     '<button class="btn btn-danger btn-hapus" data-id="' +
                    //     data +
                    //     '">Hapus</button>';
                    if (full.IsActive) {
                        return buttonTtd + " " + buttonCanvas;
                    } else {
                        return "User tidak aktif";
                    }
                },
            },
            {
                data: "FotoTtd",
                render: function (data, type, full, meta) {
                    if (data) {
                        return `
                        <img
                            src="data:image/png;base64,${data}"
                            alt="TTD"
                            style="width:120px; height:auto;"
                        >
                    `;
                    } else {
                        return "-";
                    }
                },
            },
        ],
    });
    let mmu_gambarTTD = document.getElementById("mmu_gambarTTD");
    let imagePreview = document.getElementById("imagePreview");
    let previewImg = document.getElementById("previewImg");
    let clearImage = document.getElementById("clearImage");
    let mmu_buttonSave = document.getElementById("mmu_buttonSave");
    //#endregion
    //#region Load Form
    init();
    //#endregion
    //#region Functions
    function init() {
        previewImg.value = "";
    }
    //#endregion
    //#region Event Listener

    $(document).on("click", ".btn-ttd", function (e) {
        let IdUser = $(this).data("id");
        $("#mmu_buttonSave").data("id", IdUser);
    });

    let idUserCanvas = null;
    $(document).on("click", ".btn-canvas", function () {
        let idUser = $(this).data("id");
        idUserCanvas = idUser;
    });

    $("#ttdModal").on("shown.bs.modal", function () {
        initCanvas();
    });

    mmu_gambarTTD.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
                previewImg.dataset.base64 = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    mmu_gambarTTD.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            sisaSaldo.focus();
        }
    });

    clearImage.addEventListener("click", function () {
        mmu_gambarTTD.value = "";
        previewImg.src = "#";
        previewImg.style.display = "none";
    });

    mmu_buttonSave.addEventListener("click", function () {
        let IdUser = $(this).data("id");
        let formData = new FormData();
        formData.append("jenisStore", "tambahTTD");
        formData.append("gambarTTD", mmu_gambarTTD.files[0]);
        formData.append("_token", csrfToken);
        formData.append("idUser", IdUser);
        $.ajax({
            url: "/MaintenanceTTDUser",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (response) {
                if (!response) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Tambah TTD failed ",
                        returnFocus: false,
                    });
                } else {
                    console.log(response);
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        showConfirmButton: false,
                        timer: 1000,
                        text: response.message,
                        returnFocus: false,
                    });
                    $("#table_userWeb").DataTable().ajax.reload();
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to Tambah TTD.",
                });
            },
        });
    });

    // $(document).on("click", ".btn-canvas", function (e) {
    //     let IdUser = $(this).data("id");
    //     $("#btn_simpanTTD").data("id", IdUser);
    //     console.log(IdUser);

    // });

    function isCanvasEmpty(canvas) {
        const blank = document.createElement("canvas");
        blank.width = canvas.width;
        blank.height = canvas.height;

        return canvas.toDataURL() === blank.toDataURL();
    }

    btn_simpanTTD.addEventListener("click", async function (event) {
        event.preventDefault();
        // let base64 = canvas.toDataURL("image/png");
        // let ttd_base64 = document.getElementById("ttd_base64");
        // ttd_base64.value = base64;
        $("#ttdModal").modal("hide");

        let ttd_base64 = document.getElementById("ttd_base64");

        if (isCanvasEmpty(canvas)) {
            // canvas kosong → set NULL
            ttd_base64.value = null;
            console.log("Canvas kosong");
        } else {
            let base64 = canvas.toDataURL("image/png");
            let base64Clean = base64.replace(/^data:image\/png;base64,/, "");
            ttd_base64.value = base64Clean;
            console.log("Canvas terisi");
        }

        $.ajax({
            url: "MaintenanceTTDUser",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                jenisStore: "tambahTTDCanvas",
                IdUser: idUserCanvas,
                ttd_base64: ttd_base64.value,
            },
            success: function (response) {
                console.log(response.message);
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        $("#table_userWeb").DataTable().ajax.reload();
                        // btn_proses.disabled = false;
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    // btn_proses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                // btn_proses.disabled = false;
            },
        });
    });
    //#endregion
});
