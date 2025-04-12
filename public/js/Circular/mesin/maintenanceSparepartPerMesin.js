let table_sparepartPerMesin = $("#table_sparepartPerMesin").DataTable({
    processing: true, // Optional, as processing is more relevant for server-side
    responsive: true,
    ordering: false,
    autoWidth: false,
    data: [], // This will be populated with client-side data
    columns: [
        { data: "NamaSparepart" },
        {
            data: "IdentificationNumber",
            render: function (data, type, full, meta) {
                if (data == "" || data == null) {
                    // If the data is empty or null, return a message
                    return '<span class="text-danger">Tidak ada</span>';
                } else {
                    return data;
                }
            },
        },
        { data: "Keterangan" },
        {
            data: "IdSparepart",
            render: function (data, type, full, meta) {
                return (
                    '<button class="btn btn-primary btn-edit" data-id="' +
                    data +
                    '">Edit</button> ' +
                    '<button class="btn btn-danger btn-delete" data-id="' +
                    data +
                    '">Hapus</button>'
                );
            },
        },
    ],
});
