$(document).ready(function () {

    $('#table_SJ').DataTable({
        processing: true,
        responsive: true,
        scrollX: true,
        autoWidth: false,
        serverSide: true,
        order: [],
        columnDefs: [{ targets: 5, orderable: false }],
        ajax: {
            url: '/KirimSJACCCustomer/getDataSJACC',
            type: 'GET',
            beforeSend: function () {
                $("#loading-screen").css("display", "flex");
            },
            complete: function () {
                $("#loading-screen").css("display", "none");
            },
        },
        columns: [
            {
                data: 'Tanggal',
                name: 'Tanggal',
                render: function (data) {

                    if (!data) {
                        return '';
                    }

                    return data.substring(0, 10);
                }
            },
            { data: 'IDPengiriman', name: 'IDPengiriman' },
            { data: 'NamaCust', name: 'NamaCust' },
            { data: 'SuratPesanan', name: 'SuratPesanan' },
            { data: 'No_PO', name: 'No_PO' },
            { data: 'NamaType', name: 'NamaType' },
            {
                data: "QuantityDisplay",
                name: "QuantityDisplay",
                render: function (data) {

                    if (!data || data === "-") {
                        return "-";
                    }

                    let parts = data.split(" ");

                    let qty = parts[0];
                    let satuan = parts.slice(1).join(" ").trim();;

                    return `${qty} ${formatSatuan(satuan)}`;
                }
            },
            { data: 'AlamatKirimCustomer', name: 'AlamatKirimCustomer' },
            { data: 'NamaExpeditor', name: 'NamaExpeditor' },
            { data: 'TrukNopol', name: 'TrukNopol' },
            {
                data: 'IDPengiriman',
                orderable: false,
                searchable: false,
                render: function (data) {
                    return `
                        <button
                            class="btn btn-success btn-sm btnDownload"
                            data-id="${data}">
                            Unduh
                        </button>
                    `;
                }
            }
        ]
    });

});

function formatSatuan(satuan) {

    let mapping = {
        TABUNG: "TABUNG",
        SET: "SET",
        KGM: "KILOGRAM",
        RP: "RP",
        BALL: "BALL",
        LBR: "LEMBAR",
        PC: "POTONG",
        YARDS: "YARD",
        "MTR²": "METER PERSEGI",
        ROLL: "ROLL",
        DRUM: "DRUM",
        LJR: "LONJOR",
        MTR: "METER",
        UNIT: "UNIT",
    };

    return mapping[satuan] || satuan;
}


$(document).on('click', '.btnDownload', function () {
    let idPengiriman = $(this).data('id');

    fetch(`/KirimSJACCCustomer/downloadAttachment/${idPengiriman}`)
        .then(async response => {
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();

                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: result.message
                });

                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `SJ ${idPengiriman}.jpg`;
            a.click();

            window.URL.revokeObjectURL(url);
        });
});
