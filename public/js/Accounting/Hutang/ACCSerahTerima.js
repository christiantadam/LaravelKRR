$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let table_terima = $("#table_terima").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "ACCSerahTerimaPenagihan/getSerahTerima",
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
                data: "Waktu_Penagihan",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "NM_SUP" },
            { data: "Nama_Dokumen" },
            { data: "Status_PPN" },
            { data: "Nama_MataUang" },
            { data: "Nilai_Penagihan" },
            { data: "Id_MataUang" },
        ],
        columnDefs: [{ targets: [7], visible: false }],
    });

    // $("#tablepertama tbody").off("change", 'input[name="penerimaCheckbox"]');

    // $("#tablepertama tbody").on(
    //     "change",
    //     'input[name="penerimaCheckbox"]',
    //     function () {
    //         if (this.checked) {
    //             $('input[name="penerimaCheckbox"]')
    //                 .not(this)
    //                 .prop("checked", false);
    //             rowData = tablepertama.row($(this).closest("tr")).data();
    //             console.log(rowData, this, tablepertama);
    //             const formatDate = (dateString) => {
    //                 if (!dateString)
    //                     return new Date().toISOString().split("T")[0];
    //                 const date = new Date(dateString);
    //                 const offset = date.getTimezoneOffset();
    //                 const adjustedDate = new Date(
    //                     date.getTime() - offset * 60 * 1000
    //                 );
    //                 return adjustedDate.toISOString().split("T")[0];
    //             };
    //         }
    //     }
    // );
});
