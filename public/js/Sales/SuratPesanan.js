$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let createSPModalLabel = document.getElementById("createSPModalLabel");

    $(document).on("click", "#btn_copy", function (event) {
        event.preventDefault();
        $("#createSPModal").modal("show");
        createSPModalLabel.innerHTML = "Copy Surat Pesanan";

        // Ambil nilai $no_spValue dari tombol yang diklik
        let no_spValue = $(this).data("nosp");

        // Lakukan request AJAX menggunakan query string
        // $.ajax({
        //     url: "SuratPesanan/Copy?no_sp=" + no_spValue,
        //     type: "GET",
        //     success: function (response) {
        //         console.log(response);

        //         if (response.message) {
        //             Swal.fire({
        //                 icon: "success",
        //                 title: "Success!",
        //                 text: response.message,
        //                 showConfirmButton: true,
        //             }).then(() => {
        //                 // Lakukan tindakan setelah sukses
        //             });
        //         } else if (response.error) {
        //             Swal.fire({
        //                 icon: "info",
        //                 title: "Info!",
        //                 text: response.error,
        //                 showConfirmButton: false,
        //             });
        //         }
        //     },
        //     error: function (xhr) {
        //         Swal.fire({
        //             icon: "error",
        //             title: "Error!",
        //             text: "Something went wrong.",
        //             showConfirmButton: true,
        //         });
        //     },
        // });
    });

    // $(document).on("click", "#btn_copy", function (event) {
    //     event.preventDefault();

    //     // Ambil nilai $no_spValue dari tombol yang diklik
    //     let no_spValue = $(this).data("nosp");

    //     // Lakukan request AJAX menggunakan query string
    //     $.ajax({
    //         url: "SuratPesanan/Copy?no_sp=" + no_spValue,
    //         type: "GET",
    //         success: function (response) {
    //             console.log(response);

    //             if (response.message) {
    //                 Swal.fire({
    //                     icon: "success",
    //                     title: "Success!",
    //                     text: response.message,
    //                     showConfirmButton: true,
    //                 }).then(() => {
    //                     // Lakukan tindakan setelah sukses
    //                 });
    //             } else if (response.error) {
    //                 Swal.fire({
    //                     icon: "info",
    //                     title: "Info!",
    //                     text: response.error,
    //                     showConfirmButton: false,
    //                 });
    //             }
    //         },
    //         error: function (xhr) {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Error!",
    //                 text: "Something went wrong.",
    //                 showConfirmButton: true,
    //             });
    //         },
    //     });
    // });
});
