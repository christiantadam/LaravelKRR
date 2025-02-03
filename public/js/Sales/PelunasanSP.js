let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
$(document).ready(function () {
    $("#table_SP").DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: "getDataPelunasanSP",
            dataType: "json",
            type: "GET",
            data: { _token: csrfToken },
        },
        columns: [
            {
                data: "IDSuratPesanan",
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `<input type="checkbox" name="selected[]" value="${row.IDPesanan}">
        <a class="DetailSP" data-id="${data}">${data}</a>`;
                },
            },
            {
                data: "NamaCust",
            },
            {
                data: "Tgl_Pesan",
                render: function (data, type, row) {
                    if (!data) return "";

                    let dateObj = new Date(data);
                    if (isNaN(dateObj)) return ""; // Handle invalid dates

                    let day = String(dateObj.getDate()).padStart(2, "0");
                    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
                    let year = dateObj.getFullYear();

                    return `${month}-${day}-${year}`; // Format MM-DD-YYYY
                },
            },
            {
                data: "SisaOrder",
                render: function (data) {
                    if (!data || ".00") return "0"; // Return 0 if empty
                    return parseFloat(data).toString(); // Removes .00 but keeps decimals if needed
                },
            },
        ],
        columnDefs: [
            {
                targets: 0,
                className: "RDZPaddingTable RDZCenterTable",
                orderable: false,
            },
            {
                targets: 1,
                className: "RDZPaddingTable RDZCenterTable",
            },
            {
                targets: 2,
                className: "RDZPaddingTable RDZCenterTable",
            },
            {
                targets: 3,
                className: "RDZPaddingTable RDZCenterTable",
            },
        ],
    });
});
