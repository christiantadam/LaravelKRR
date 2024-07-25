document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radio_hutang = document.getElementById("radio_hutang");
    let radio_tunai = document.getElementById("radio_tunai");
    let btn_ok = document.getElementById("btn_ok");

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        if ($.fn.DataTable.isDataTable("#tablepenyesuaian")) {
            $("#tablepenyesuaian").DataTable().destroy();
        }

        let table = $("#tablepenyesuaian").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            returnFocus: true,
            ajax: {
                url: "PenyesuaianSaldoSupplier/getData",
                dataType: "json",
                type: "GET",
                data: {
                    _token: csrfToken,
                    idpenagihan: idpenagihan.value,
                },
            },
            columns: [
                {
                    data: "No_Pengajuan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Nilai_PIB" },
                { data: "No_Pajak" },
                { data: "Id_PIB" },
                {
                    data: "Tgl_PIB",
                    render: function (data) {
                        return data
                            ? new Date(data).toLocaleDateString("en-US")
                            : "";
                    },
                },
                { data: "No_Kontrak" },
                {
                    data: "Tgl_Kontrak",
                    render: function (data) {
                        return data
                            ? new Date(data).toLocaleDateString("en-US")
                            : "";
                    },
                },
                { data: "No_Invoice" },
                {
                    data: "Tgl_Invoice",
                    render: function (data) {
                        return data
                            ? new Date(data).toLocaleDateString("en-US")
                            : "";
                    },
                },
                { data: "No_SKBM" },
                {
                    data: "Tgl_SKBM",
                    render: function (data) {
                        return data
                            ? new Date(data).toLocaleDateString("en-US")
                            : "";
                    },
                },
                { data: "No_SKPPH" },
                {
                    data: "Tgl_SKPPH",
                    render: function (data) {
                        return data
                            ? new Date(data).toLocaleDateString("en-US")
                            : "";
                    },
                },
                { data: "No_SPPB_BC" },
                {
                    data: "Tgl_SPPB_BC",
                    render: function (data) {
                        return data
                            ? new Date(data).toLocaleDateString("en-US")
                            : "";
                    },
                },
            ],
        });
    });
});
