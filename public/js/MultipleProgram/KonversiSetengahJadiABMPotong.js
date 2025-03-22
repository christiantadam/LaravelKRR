$(document).ready(function () {
    const select_divisiTanpaBarcode = $('#select_divisiTanpaBarcode'); // prettier-ignore
    const select_kelompokAsalTanpaBarcode = $('#select_kelompokAsalTanpaBarcode'); // prettier-ignore
    const select_kelompokTujuanTanpaBarcode = $('#select_kelompokTujuanTanpaBarcode'); // prettier-ignore
    const select_kelompokUtamaAsalTanpaBarcode = $('#select_kelompokUtamaAsalTanpaBarcode'); // prettier-ignore
    const select_kelompokUtamaTujuanTanpaBarcode = $('#select_kelompokUtamaTujuanTanpaBarcode'); // prettier-ignore
    const select_objekAsalTanpaBarcode = $('#select_objekAsalTanpaBarcode'); // prettier-ignore
    const select_objekTujuanTanpaBarcode = $('#select_objekTujuanTanpaBarcode'); // prettier-ignore
    const select_subKelompokAsalTanpaBarcode = $('#select_subKelompokAsalTanpaBarcode'); // prettier-ignore
    const select_subKelompokTujuanTanpaBarcode = $('#select_subKelompokTujuanTanpaBarcode'); // prettier-ignore
    const select_typeAsalTanpaBarcode = $('#select_typeAsalTanpaBarcode'); // prettier-ignore
    const select_typeTujuanTanpaBarcode = $('#select_typeTujuanTanpaBarcode'); // prettier-ignore
    let button_hapusTujuanKonversiTanpaBarcode = document.getElementById('button_hapusTujuanKonversiTanpaBarcode'); // prettier-ignore
    let button_modalProsesTanpaBarcode = document.getElementById('button_modalProsesTanpaBarcode'); // prettier-ignore
    let button_tambahTujuanKonversiTanpaBarcode = document.getElementById('button_tambahTujuanKonversiTanpaBarcode'); // prettier-ignore
    let button_updateTujuanKonversiTanpaBarcode = document.getElementById('button_updateTujuanKonversiTanpaBarcode'); // prettier-ignore
    let closeModalButtonDetail = document.getElementById("closeModalButtonDetail"); // prettier-ignore
    let closeModalButtonTambahTujuanTanpaBarcode = document.getElementById('closeModalButtonTambahTujuanTanpaBarcode'); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let detail_konversiModalTableDaftarAsalKonversi = $("#detail_konversiModalTableDaftarAsalKonversi").DataTable(); // prettier-ignore
    let detail_konversiModalTableDaftarTujuanKonversi = $("#detail_konversiModalTableDaftarTujuanKonversi").DataTable(); // prettier-ignore
    let div_asalKonversiTanpaBarcode = document.getElementById('div_asalKonversiTanpaBarcode'); // prettier-ignore
    let div_PIBAsalTanpaBarcode = document.getElementById('div_PIBAsalTanpaBarcode'); // prettier-ignore
    let div_PIBTujuanTanpaBarcode = document.getElementById('div_PIBTujuanTanpaBarcode'); // prettier-ignore
    let div_tabelTujuanKonversiTanpaBarcode = document.getElementById('div_tabelTujuanKonversiTanpaBarcode'); // prettier-ignore
    let div_tujuanKonversiTanpaBarcode = document.getElementById('div_tujuanKonversiTanpaBarcode'); // prettier-ignore
    let div_headerFormTambahTujuanKonversiTanpaBarcode = document.getElementById('div_headerFormTambahTujuanKonversiTanpaBarcode'); // prettier-ignore
    let id_shiftTanpaBarcode = document.getElementById("id_shiftTanpaBarcode"); // prettier-ignore
    let id_groupTanpaBarcode = document.getElementById("id_groupTanpaBarcode"); // prettier-ignore
    let input_tanggalKonversiTanpaBarcode = document.getElementById('input_tanggalKonversiTanpaBarcode'); // prettier-ignore
    let jumlah_pemakaianPrimerTanpaBarcode = document.getElementById('jumlah_pemakaianPrimerTanpaBarcode'); // prettier-ignore
    let jumlah_pemakaianSekunderTanpaBarcode = document.getElementById('jumlah_pemakaianSekunderTanpaBarcode'); // prettier-ignore
    let jumlah_pemakaianTritierTanpaBarcode = document.getElementById('jumlah_pemakaianTritierTanpaBarcode'); // prettier-ignore
    let jumlah_pemasukanPrimerTanpaBarcode = document.getElementById('jumlah_pemasukanPrimerTanpaBarcode'); // prettier-ignore
    let jumlah_pemasukanSekunderTanpaBarcode = document.getElementById('jumlah_pemasukanSekunderTanpaBarcode'); // prettier-ignore
    let jumlah_pemasukanTritierTanpaBarcode = document.getElementById('jumlah_pemasukanTritierTanpaBarcode'); // prettier-ignore
    let PIB_asalTanpaBarcode = document.getElementById('PIB_asalTanpaBarcode'); // prettier-ignore
    let PIB_tujuanTanpaBarcode = document.getElementById('PIB_tujuanTanpaBarcode'); // prettier-ignore
    let saldo_terakhirPrimerAsalTanpaBarcode = document.getElementById('saldo_terakhirPrimerAsalTanpaBarcode'); // prettier-ignore
    let saldo_terakhirPrimerTujuanTanpaBarcode = document.getElementById('saldo_terakhirPrimerTujuanTanpaBarcode'); // prettier-ignore
    let saldo_terakhirSekunderAsalTanpaBarcode = document.getElementById('saldo_terakhirSekunderAsalTanpaBarcode'); // prettier-ignore
    let saldo_terakhirSekunderTujuanTanpaBarcode = document.getElementById('saldo_terakhirSekunderTujuanTanpaBarcode'); // prettier-ignore
    let saldo_terakhirTritierAsalTanpaBarcode = document.getElementById('saldo_terakhirTritierAsalTanpaBarcode'); // prettier-ignore
    let saldo_terakhirTritierTujuanTanpaBarcode = document.getElementById('saldo_terakhirTritierTujuanTanpaBarcode'); // prettier-ignore
    let satuan_primerJumlahPemakaianTanpaBarcode = document.getElementById('satuan_primerJumlahPemakaianTanpaBarcode'); // prettier-ignore
    let satuan_primerJumlahPemasukanTanpaBarcode = document.getElementById('satuan_primerJumlahPemasukanTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirPrimerAsalTanpaBarcode = document.getElementById('satuan_saldoTerakhirPrimerAsalTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirPrimerTujuanTanpaBarcode = document.getElementById('satuan_saldoTerakhirPrimerTujuanTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirSekunderAsalTanpaBarcode = document.getElementById('satuan_saldoTerakhirSekunderAsalTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirSekunderTujuanTanpaBarcode = document.getElementById('satuan_saldoTerakhirSekunderTujuanTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirTritierAsalTanpaBarcode = document.getElementById('satuan_saldoTerakhirTritierAsalTanpaBarcode'); // prettier-ignore
    let satuan_saldoTerakhirTritierTujuanTanpaBarcode = document.getElementById('satuan_saldoTerakhirTritierTujuanTanpaBarcode'); // prettier-ignore
    let satuan_sekunderJumlahPemakaianTanpaBarcode = document.getElementById('satuan_sekunderJumlahPemakaianTanpaBarcode'); // prettier-ignore
    let satuan_sekunderJumlahPemasukanTanpaBarcode = document.getElementById('satuan_sekunderJumlahPemasukanTanpaBarcode'); // prettier-ignore
    let satuan_tritierJumlahPemakaianTanpaBarcode = document.getElementById('satuan_tritierJumlahPemakaianTanpaBarcode'); // prettier-ignore
    let satuan_tritierJumlahPemasukanTanpaBarcode = document.getElementById('satuan_tritierJumlahPemasukanTanpaBarcode'); // prettier-ignore
    let tambahTujuanModalLabelTanpaBarcode = document.getElementById('tambahTujuanModalLabelTanpaBarcode'); // prettier-ignore
    let tambahTujuanModalTanpaBarcode = document.getElementById('tambahTujuanModalTanpaBarcode'); // prettier-ignore

    let table_daftarTujuanKonversiTanpaBarcode = $(
        "#table_daftarTujuanKonversiTanpaBarcode"
    ).DataTable({
        paging: false,
        searching: false,
        info: false,
        autoWidth: false,
    });
    let table_daftarKonversi = $("#table_daftarKonversi").DataTable({
        processing: true,
        responsive: true,
        ordering: false,
        autoWidth: false,
        data: [], // This will be populated with client-side data
        columns: [
            { data: "IdTypeTujuan" },
            { data: "NamaTypeTujuan" },
            { data: "HasilPrimer" },
            { data: "HasilSekunder" },
            { data: "HasilTritier" },
            { data: "idkonversi" },
            {
                data: "idkonversi",
                render: function (data, type, full, meta) {
                    return (
                        '<button class="btn btn-success btn-acc" data-id="' +
                        data +
                        '">ACC</button> ' +
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-bs-toggle="modal" data-bs-target="#detailKonversiModal" id="button_modalDetailPermohonan">Lihat Detail</button> ' +
                        '<button class="btn btn-danger btn-delete" data-id="' +
                        data +
                        '">Hapus</button>'
                    );
                },
            },
        ],
        columnDefs: [
            { width: "12%", targets: 0 },
            { width: "25%", targets: 1 },
            { width: "25%", targets: 6 },
        ],
    });

    //#region Function Mantap-mantap
    // Setup global AJAX handlers
    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    function getDataPermohonan() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/KonversiSetengahJadi/getDataPermohonan/ABMStghJadi",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_daftarKonversi.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_daftarKonversi.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    function getSelectElementsByType(tipeInitialisasi) {
        const elementSets = {
            showModal: [
                { element: select_objekAsalTanpaBarcode, placeholder: "Pilih Objek Asal" }, // prettier-ignore
                { element: select_kelompokUtamaAsalTanpaBarcode, placeholder: "Pilih Kelompok Utama Asal"}, // prettier-ignore
                { element: select_kelompokAsalTanpaBarcode, placeholder: "Pilih Kelompok Asal"}, // prettier-ignore
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
                { element: select_objekTujuanTanpaBarcode,placeholder: "Pilih Objek Tujuan"}, // prettier-ignore
                { element: select_kelompokUtamaTujuanTanpaBarcode,placeholder: "Pilih Kelompok Utama Tujuan"}, // prettier-ignore
                { element: select_kelompokTujuanTanpaBarcode,placeholder: "Pilih Kelompok Tujuan"}, // prettier-ignore
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
            ],
            pilihDivisi: [
                { element: select_objekAsalTanpaBarcode, placeholder: "Pilih Objek Asal" }, // prettier-ignore
                { element: select_kelompokUtamaAsalTanpaBarcode, placeholder: "Pilih Kelompok Utama Asal"}, // prettier-ignore
                { element: select_kelompokAsalTanpaBarcode, placeholder: "Pilih Kelompok Asal"}, // prettier-ignore
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
                { element: select_objekTujuanTanpaBarcode, placeholder: "Pilih Objek Tujuan"}, // prettier-ignore
                { element: select_kelompokUtamaTujuanTanpaBarcode, placeholder: "Pilih Kelompok Utama Tujuan"}, // prettier-ignore
                { element: select_kelompokTujuanTanpaBarcode, placeholder: "Pilih Kelompok Tujuan"}, // prettier-ignore
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
            ],
            pilihObjekAsal: [
                { element: select_kelompokUtamaAsalTanpaBarcode, placeholder: "Pilih Kelompok Utama Asal"}, // prettier-ignore
                { element: select_kelompokAsalTanpaBarcode, placeholder: "Pilih Kelompok Asal"}, // prettier-ignore
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
            ],
            pilihKelompokUtamaAsal: [
                { element: select_kelompokAsalTanpaBarcode, placeholder: "Pilih Kelompok Asal"}, // prettier-ignore
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
            ],
            pilihKelompokAsal: [
                { element: select_subKelompokAsalTanpaBarcode, placeholder: "Pilih Sub Kelompok Asal"}, // prettier-ignore
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
            ],
            pilihSubKelompokAsal: [
                { element: select_typeAsalTanpaBarcode, placeholder: "Pilih Type Asal" }, // prettier-ignore
            ],
            pilihObjekTujuan: [
                { element: select_kelompokUtamaTujuanTanpaBarcode, placeholder: "Pilih Kelompok Utama Tujuan"}, // prettier-ignore
                { element: select_kelompokTujuanTanpaBarcode, placeholder: "Pilih Kelompok Tujuan"}, // prettier-ignore
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
            ],
            pilihKelompokUtamaTujuan: [
                { element: select_kelompokTujuanTanpaBarcode, placeholder: "Pilih Kelompok Tujuan"}, // prettier-ignore
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
            ],
            pilihKelompokTujuan: [
                { element: select_subKelompokTujuanTanpaBarcode, placeholder: "Pilih Sub Kelompok Tujuan"}, // prettier-ignore
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
            ],
            pilihSubKelompokTujuan: [
                { element: select_typeTujuanTanpaBarcode, placeholder: "Pilih Type Tujuan"}, // prettier-ignore
            ],
        };

        return elementSets[tipeInitialisasi] || [];
    }

    function initializeSelectElement(tipeInitialisasi) {
        // Define an array of select elements and their placeholders based on tipeInitialisasi
        let selectElements = getSelectElementsByType(tipeInitialisasi);

        // Initialize each select element with Select2 and set the placeholder
        selectElements.forEach(({ element, placeholder }) => {
            element.select2({
                dropdownParent: $("#modalBodyTambahTujuanKonversiTanpaBarcode"),
                placeholder: placeholder,
            });
        });

        // Special case for select_divisi initialization in "showModal"
        if (tipeInitialisasi === "showModal") {
            select_divisiTanpaBarcode.select2({
                dropdownParent: $("#modalBodyTambahTujuanKonversiTanpaBarcode"),
                placeholder: "Pilih Divisi",
            });
        }
    }

    function clearSelectElement(tipeInitialisasi) {
        // Get the array of select elements based on tipeInitialisasi
        let selectElements = getSelectElementsByType(tipeInitialisasi);

        // Clear each select element and set placeholder
        selectElements.forEach(({ element, placeholder }) => {
            element
                .empty()
                .append(
                    `<option value="" disabled selected>${placeholder}</option>`
                );
        });
    }

    function clearInputTextElements(tipeClearInput) {
        let inputTextIds = [];
        if (tipeClearInput == "pilihIdTypeAsal") {
            inputTextIds = [
                "saldo_terakhirPrimerAsalTanpaBarcode",
                "satuan_saldoTerakhirPrimerAsalTanpaBarcode",
                "saldo_terakhirSekunderAsalTanpaBarcode",
                "satuan_saldoTerakhirSekunderAsalTanpaBarcode",
                "saldo_terakhirTritierAsalTanpaBarcode",
                "satuan_saldoTerakhirTritierAsalTanpaBarcode",
                "jumlah_pemakaianPrimerTanpaBarcode",
                "satuan_primerJumlahPemakaianTanpaBarcode",
                "jumlah_pemakaianSekunderTanpaBarcode",
                "satuan_sekunderJumlahPemakaianTanpaBarcode",
                "jumlah_pemakaianTritierTanpaBarcode",
                "satuan_tritierJumlahPemakaianTanpaBarcode",
            ];
        } else {
            inputTextIds = [
                "saldo_terakhirPrimerTujuanTanpaBarcode",
                "satuan_saldoTerakhirPrimerTujuanTanpaBarcode",
                "saldo_terakhirSekunderTujuanTanpaBarcode",
                "satuan_saldoTerakhirSekunderTujuanTanpaBarcode",
                "saldo_terakhirTritierTujuanTanpaBarcode",
                "satuan_saldoTerakhirTritierTujuanTanpaBarcode",
                "jumlah_pemasukanPrimerTanpaBarcode",
                "satuan_primerJumlahPemasukanTanpaBarcode",
                "jumlah_pemasukanSekunderTanpaBarcode",
                "satuan_sekunderJumlahPemasukanTanpaBarcode",
                "jumlah_pemasukanTritierTanpaBarcode",
                "satuan_tritierJumlahPemasukanTanpaBarcode",
            ];
        }

        inputTextIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.value = ""; // Clear the text
            }
        });
    }

    function readOnlyInputTextElements(tipeReadOnlyInput) {
        let inputTextIds = [];
        if (tipeReadOnlyInput == "pilihIdTypeAsal") {
            inputTextIds = [
                "jumlah_pemakaianPrimerTanpaBarcode",
                "jumlah_pemakaianSekunderTanpaBarcode",
            ];
        } else {
            inputTextIds = [
                "jumlah_pemasukanPrimerTanpaBarcode",
                "jumlah_pemasukanSekunderTanpaBarcode",
            ];
        }

        inputTextIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.readOnly = true; // set text input to readonly
            }
        });
    }

    //#endregion

    //#region Setup Form

    getDataPermohonan();

    //#endregion

    //#region Event Handlers

    button_tambahKonversi.addEventListener("click", function () {
        $("#tambahTujuanModalTanpaBarcode").modal("show");
        proses = 1; // proses insert
    });

    $("#tambahTujuanModalTanpaBarcode").on("shown.bs.modal", function (event) {
        table_daftarTujuanKonversiTanpaBarcode.clear().draw(); //Clear Table
        // button_updateTujuanKonversiTanpaBarcode.disabled = true;
        // button_hapusTujuanKonversiTanpaBarcode.disabled = true;
        button_modalProsesTanpaBarcode.disabled = true;
        jumlah_pemasukanPrimerTanpaBarcode.readOnly = true;
        jumlah_pemasukanSekunderTanpaBarcode.readOnly = true;
        jumlah_pemasukanTritierTanpaBarcode.readOnly = true;

        document
            .querySelectorAll("#tambahTujuanModalTanpaBarcode input")
            .forEach((input) => {
                input.value = "";
            });
        input_tanggalKonversiTanpaBarcode.valueAsDate = new Date();
        initializeSelectElement("showModal"); //Initialize all select element inside modal
        clearSelectElement("showModal");
        select_divisiTanpaBarcode.val(null).trigger("change"); // Clear selected index for select_divisi

        setTimeout(() => {
            input_tanggalKonversiTanpaBarcode.focus();
        }, 150);

        const InputIds = [
            "jumlah_pemasukanTritierTanpaBarcode",
            "jumlah_pemasukanSekunderTanpaBarcode",
            "jumlah_pemasukanPrimerTanpaBarcode",
            "jumlah_pemakaianPrimerTanpaBarcode",
            "jumlah_pemakaianSekunderTanpaBarcode",
            "jumlah_pemakaianTritierTanpaBarcode",
        ];

        function getNextFocusableElement(currentElement) {
            if (currentElement.id === "jumlah_pemasukanTritierTanpaBarcode") {
                return document.getElementById("button_modalProsesTanpaBarcode") // prettier-ignore
            }

            let elements = document.querySelectorAll(
                "input, select, textarea, button"
            );
            let currentIndex = Array.prototype.indexOf.call(
                elements,
                currentElement
            );

            for (let i = currentIndex + 1; i < elements.length; i++) {
                if (!elements[i].readOnly && !elements[i].disabled) {
                    return elements[i];
                }
            }
            return null;
        }

        InputIds.forEach(function (id) {
            const inputElement = document.getElementById(id);
            let element = document.getElementById(id);
            if (inputElement) {
                setInputFilter(
                    inputElement,
                    function (value) {
                        // Check if the value is a valid number with a period as a decimal separator and no commas, and not greater than saldo_terakhir
                        return /^\d*[.]?\d*$/.test(value);
                    },
                    "Tidak boleh karakter atau koma, harus angka dengan titik desimal"
                );
                element.addEventListener("keypress", function (e) {
                    if (e.key == "Enter") {
                        e.preventDefault(); // Prevent the default action of the Enter key

                        if (this.value == "") {
                            this.value = 0;
                        }

                        var value = parseFloat(this.value);
                        if (!isNaN(value)) {
                            this.value = parseFloat(value).toFixed(2);
                        }

                        // Find the next input element that is not readonly or disabled
                        let nextElement = getNextFocusableElement(this);
                        if (nextElement) {
                            nextElement.focus();
                            if (nextElement.type == "text") {
                                nextElement.select();
                            }
                        }
                    }
                });
            }
        });
    });

    closeModalButtonDetail.addEventListener("click", function () {
        $("#detailKonversiModal").modal("hide");
    });

    closeModalButtonTambahTujuanTanpaBarcode.addEventListener(
        "click",
        function () {
            $("#tambahTujuanModalTanpaBarcode").modal("hide");
        }
    );

    id_shiftTanpaBarcode.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["P", "M", "S"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity("Silahkan pilih [P]agi, [S]iang, atau [M]alam"); // prettier-ignore
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    id_shiftTanpaBarcode.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (id_shiftTanpaBarcode.value == "") {
                id_shiftTanpaBarcode.classList.add("input-error");
            } else {
                id_groupTanpaBarcode.focus();
            }
        }
    });

    id_groupTanpaBarcode.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["A", "B", "C"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity("Silahkan pilih A, B, atau C"); // prettier-ignore
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    id_groupTanpaBarcode.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (id_groupTanpaBarcode.value == "") {
                id_groupTanpaBarcode.classList.add("input-error");
            } else {
                select_divisiTanpaBarcode.select2("open");
            }
        }
    });

    input_tanggalKonversiTanpaBarcode.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                id_shiftTanpaBarcode.focus();
            }
        }
    );

    select_divisiTanpaBarcode.on("select2:select", function () {
        const selectedDivisiAsal = $(this).val(); // Get selected Divisi Asal
        // initializeSelectElement("pilihDivisi");
        clearSelectElement("pilihDivisi");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getObjek",
            method: "GET",
            data: { divisi: selectedDivisiAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Objek untuk divisi: " +
                            $("#select_divisiTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_objekAsalTanpaBarcode.append(
                            new Option(objek.NamaObjek, objek.IdObjek)
                        );
                        select_objekTujuanTanpaBarcode.append(
                            new Option(objek.NamaObjek, objek.IdObjek)
                        );
                    });
                    initializeSelectElement("pilihDivisi");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Objek data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_objekAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_objekAsalTanpaBarcode.on("select2:select", function () {
        const selectedObjekAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihObjekAsal");
        clearSelectElement("pilihObjekAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompokUtama",
            method: "GET",
            data: { objek: selectedObjekAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kelompok untuk Objek: " +
                            $("#select_objekAsalTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokUtamaAsalTanpaBarcode.append(
                            new Option(
                                objek.NamaKelompokUtama,
                                objek.IdKelompokUtama
                            )
                        );
                    });
                    initializeSelectElement("pilihObjekAsal");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kelompok Utama data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_kelompokUtamaAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_objekTujuanTanpaBarcode.on("select2:select", function () {
        if (select_typeAsalTanpaBarcode.val() == null) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Silahkan pilih Type Asal terlebih dahulu",
            });
            select_objekTujuanTanpaBarcode.val(null).trigger("change");
            return;
        }
        const selectedObjekTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihObjekTujuan");
        clearSelectElement("pilihObjekTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompokUtama",
            method: "GET",
            data: { objek: selectedObjekTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kelompok untuk Objek: " +
                            $("#select_objekTujuanTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokUtamaTujuanTanpaBarcode.append(
                            new Option(
                                objek.NamaKelompokUtama,
                                objek.IdKelompokUtama
                            )
                        );
                    });
                    initializeSelectElement("pilihObjekTujuan");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kelompok Utama data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_kelompokUtamaTujuanTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_kelompokUtamaAsalTanpaBarcode.on("select2:select", function () {
        const selectedKelompokUtamaAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihKelompokUtamaAsal");
        clearSelectElement("pilihKelompokUtamaAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompok",
            method: "GET",
            data: { kelompokUtama: selectedKelompokUtamaAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kelompok untuk Kelompok Utama: " +
                            $("#select_kelompokUtamaAsalTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokAsalTanpaBarcode.append(
                            new Option(objek.namakelompok, objek.idkelompok)
                        );
                    });
                    initializeSelectElement("pilihKelompokUtamaAsal");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kelompok Utama data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_kelompokAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_kelompokUtamaTujuanTanpaBarcode.on("select2:select", function () {
        const selectedKelompokUtamaTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihKelompokUtamaTujuan");
        clearSelectElement("pilihKelompokUtamaTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getKelompok",
            method: "GET",
            data: { kelompokUtama: selectedKelompokUtamaTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Kelompok untuk Kelompok Utama: " +
                            $("#select_kelompokUtamaTujuan option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_kelompokTujuanTanpaBarcode.append(
                            new Option(objek.namakelompok, objek.idkelompok)
                        );
                    });
                    initializeSelectElement("pilihKelompokUtamaTujuan");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kelompok Utama data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_kelompokTujuanTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_kelompokAsalTanpaBarcode.on("select2:select", function () {
        const selectedKelompokAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihKelompokAsal");
        clearSelectElement("pilihKelompokAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getSubKelompok",
            method: "GET",
            data: { kelompok: selectedKelompokAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Sub Kelompok untuk Kelompok: " +
                            $("#select_kelompokAsalTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_subKelompokAsalTanpaBarcode.append(
                            new Option(
                                objek.NamaSubKelompok,
                                objek.IdSubkelompok
                            )
                        );
                    });
                    initializeSelectElement("pilihKelompokAsal");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Sub Kelompok data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_subKelompokAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_kelompokTujuanTanpaBarcode.on("select2:select", function () {
        const selectedKelompokTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihKelompokTujuan");
        clearSelectElement("pilihKelompokTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getSubKelompok",
            method: "GET",
            data: { kelompok: selectedKelompokTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Sub Kelompok untuk Kelompok: " +
                            $("#select_kelompokTujuanTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_subKelompokTujuanTanpaBarcode.append(
                            new Option(
                                objek.NamaSubKelompok,
                                objek.IdSubkelompok
                            )
                        );
                    });
                    initializeSelectElement("pilihKelompokTujuan");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Sub Kelompok data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_subKelompokTujuanTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_subKelompokAsalTanpaBarcode.on("select2:select", function () {
        const selectedSubKelompokAsal = $(this).val(); // Get selected Divisi Asal
        initializeSelectElement("pilihSubKelompokAsal");
        clearSelectElement("pilihSubKelompokAsal");
        clearInputTextElements("pilihIdTypeAsal");
        readOnlyInputTextElements("pilihIdTypeAsal");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getType",
            method: "GET",
            data: { subKelompok: selectedSubKelompokAsal }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Type untuk Sub Kelompok: " +
                            $("#select_subKelompokAsalTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    data.forEach(function (objek) {
                        select_typeAsalTanpaBarcode.append(
                            new Option(objek.NamaType, objek.IdType)
                        );
                    });
                    initializeSelectElement("pilihSubKelompokAsal");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Type data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_typeAsalTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_subKelompokTujuanTanpaBarcode.on("select2:select", function () {
        const selectedSubKelompokTujuan = $(this).val(); // Get selected Divisi Tujuan
        initializeSelectElement("pilihSubKelompokTujuan");
        clearSelectElement("pilihSubKelompokTujuan");
        clearInputTextElements("pilihIdTypeTujuan");
        readOnlyInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getType",
            method: "GET",
            data: { subKelompok: selectedSubKelompokTujuan }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Type untuk Sub Kelompok: " +
                            $("#select_subKelompokTujuanTanpaBarcode option:selected").text(), // prettier-ignore
                    });
                } else {
                    if (select_kelompokUtamaTujuanTanpaBarcode.val() == 1029) {
                        let itemsAdded = false; // Track if any item is added
                        data.forEach(function (objek) {
                            luasTujuanBarangTanpaBarcode =
                                parseFloat(objek.LebarPotongan) *
                                parseFloat(objek.PanjangPotongan);

                            if (
                                luasAsalBarangTanpaBarcode >=
                                luasTujuanBarangTanpaBarcode
                            ) {
                                select_typeTujuanTanpaBarcode.append(
                                    new Option(objek.NamaType, objek.IdType)
                                );
                                itemsAdded = true;
                            }
                        });

                        if (!itemsAdded) {
                            Swal.fire({
                                icon: "warning",
                                title: "Perhatian",
                                text:
                                    "Tidak ukuran yang lebih kecil dari luas barang asal konversi: " +
                                    luasAsalBarangTanpaBarcode.toString() +
                                    " pada kelompok " +
                                    select_kelompokTujuan.options[
                                        select_kelompokTujuan.selectedIndex
                                    ].text,
                            }).then(() => {
                                select_kelompokTujuan.focus();
                                select_subKelompokTujuan.disabled = true;
                            });
                        } else {
                            select_subKelompokTujuan.focus();
                        }
                    } else {
                        data.forEach(function (objek) {
                            select_typeTujuanTanpaBarcode.append(
                                new Option(objek.NamaType, objek.IdType)
                            );
                        });
                    }
                    initializeSelectElement("pilihSubKelompokTujuan");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Type data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                select_typeTujuanTanpaBarcode.select2("open");
            }, 200);
        });
    });

    select_typeAsalTanpaBarcode.on("select2:select", function () {
        const selectedIdType = $(this).val(); // Get selected Id Type
        // Clear Input Text
        clearInputTextElements("pilihIdTypeAsal");
        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getTypeSaldo",
            method: "GET",
            data: { idType: selectedIdType }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Data Type untuk Id Type: " +
                            $("#select_typeAsalTanpaBarcode option:selected").val(), // prettier-ignore
                    });
                } else {
                    luasAsalBarangTanpaBarcode = parseFloat(data[0].PanjangPotongan) * parseFloat(data[0].LebarPotongan); // prettier-ignore
                    if (
                        parseFloat(data[0].SaldoPrimer) > 0 ||
                        parseFloat(data[0].SaldoSekunder) > 0 ||
                        parseFloat(data[0].SaldoTritier) > 0
                    ) {
                        cekSaldo = true;
                        saldo_terakhirPrimerAsalTanpaBarcode.value = numeral(data[0].SaldoPrimer).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirPrimerAsalTanpaBarcode.value = data[0].satPrimer.trim(); // prettier-ignore
                        saldo_terakhirSekunderAsalTanpaBarcode.value = numeral(data[0].SaldoSekunder).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirSekunderAsalTanpaBarcode.value = data[0].satSekunder.trim(); // prettier-ignore
                        saldo_terakhirTritierAsalTanpaBarcode.value = numeral(data[0].SaldoTritier).format("0.00"); // prettier-ignore
                        satuan_saldoTerakhirTritierAsalTanpaBarcode.value =data[0].satTritier.trim(); // prettier-ignore
                        satuan_primerJumlahPemakaianTanpaBarcode.value = data[0].satPrimer.trim(); // prettier-ignore
                        satuan_sekunderJumlahPemakaianTanpaBarcode.value = data[0].satSekunder.trim(); // prettier-ignore
                        satuan_tritierJumlahPemakaianTanpaBarcode.value = data[0].satTritier.trim(); // prettier-ignore
                    } else {
                        cekSaldo = false;
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Tidak ada saldo untuk Type ini",
                        });
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Type data.",
                });
            },
        }).then(() => {
            if (!cekSaldo) {
                select_typeAsalTanpaBarcode.val(null).trigger("change");
                select_typeAsalTanpaBarcode.select2("open");
                jumlah_pemakaianPrimerTanpaBarcode.value = "";
                jumlah_pemakaianSekunderTanpaBarcode.value = "";
                jumlah_pemakaianTritierTanpaBarcode.value = "";
            } else {
                // Handle jumlah_pemakaianPrimer read-only and value setting
                if (
                    satuan_primerJumlahPemakaianTanpaBarcode.value &&
                    satuan_primerJumlahPemakaianTanpaBarcode.value !== "NULL"
                ) {
                    jumlah_pemakaianPrimerTanpaBarcode.readOnly = false;
                } else {
                    jumlah_pemakaianPrimerTanpaBarcode.value = numeral(0).format("0.00"); // prettier-ignore
                    jumlah_pemakaianPrimerTanpaBarcode.readOnly = true;
                }
                // Handle jumlah_pemakaianSekunder read-only and value setting
                if (
                    satuan_sekunderJumlahPemakaianTanpaBarcode.value &&
                    satuan_sekunderJumlahPemakaianTanpaBarcode.value !== "NULL"
                ) {
                    jumlah_pemakaianSekunderTanpaBarcode.readOnly = false;
                } else {
                    jumlah_pemakaianSekunderTanpaBarcode.value = numeral(0).format("0.00"); // prettier-ignore
                    jumlah_pemakaianSekunderTanpaBarcode.readOnly = true;
                }
                jumlah_pemakaianTritierTanpaBarcode.readOnly = false;

                // Set focus based on read-only status
                jumlah_pemakaianPrimerTanpaBarcode.readOnly
                    ? jumlah_pemakaianSekunderTanpaBarcode.readOnly
                        ? jumlah_pemakaianTritierTanpaBarcode.focus()
                        : jumlah_pemakaianSekunderTanpaBarcode.focus()
                    : jumlah_pemakaianPrimerTanpaBarcode.focus();
            }
        });
    });

    select_typeTujuanTanpaBarcode.on("select2:select", function () {
        const selectedIdType = $(this).val(); // Get selected Id Type
        // Clear Input Text
        clearInputTextElements("pilihIdTypeTujuan");

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/KonversiSetengahJadi/getTypeSaldo",
            method: "GET",
            data: { idType: selectedIdType }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Data Type untuk Id Type: " +
                            $("#select_typeTujuanTanpaBarcode option:selected").val(), // prettier-ignore
                    });
                } else {
                    saldo_terakhirPrimerTujuanTanpaBarcode.value = numeral(data[0].SaldoPrimer).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirPrimerTujuanTanpaBarcode.value = data[0].satPrimer.trim(); // prettier-ignore
                    saldo_terakhirSekunderTujuanTanpaBarcode.value = numeral(data[0].SaldoSekunder).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirSekunderTujuanTanpaBarcode.value = data[0].satSekunder.trim(); // prettier-ignore
                    saldo_terakhirTritierTujuanTanpaBarcode.value = numeral(data[0].SaldoTritier).format("0.00"); // prettier-ignore
                    satuan_saldoTerakhirTritierTujuanTanpaBarcode.value =data[0].satTritier.trim(); // prettier-ignore
                    satuan_primerJumlahPemasukanTanpaBarcode.value = data[0].satPrimer.trim(); // prettier-ignore
                    satuan_sekunderJumlahPemasukanTanpaBarcode.value = data[0].satSekunder.trim(); // prettier-ignore
                    satuan_tritierJumlahPemasukanTanpaBarcode.value = data[0].satTritier.trim(); // prettier-ignore

                    // Handle jumlah_pemakaianPrimer read-only and value setting
                    if (
                        satuan_primerJumlahPemasukanTanpaBarcode.value &&
                        satuan_primerJumlahPemasukanTanpaBarcode.value !== "NULL" // prettier-ignore
                    ) {
                        jumlah_pemasukanPrimerTanpaBarcode.readOnly = false;
                    } else {
                        jumlah_pemasukanPrimerTanpaBarcode.value = numeral(0).format("0.00"); // prettier-ignore
                        jumlah_pemasukanPrimerTanpaBarcode.readOnly = true;
                    }
                    // Handle jumlah_pemakaianSekunder read-only and value setting
                    if (
                        satuan_sekunderJumlahPemasukanTanpaBarcode.value &&
                        satuan_sekunderJumlahPemasukanTanpaBarcode.value !== "NULL" // prettier-ignore
                    ) {
                        jumlah_pemasukanSekunderTanpaBarcode.readOnly = false;
                    } else {
                        jumlah_pemasukanSekunderTanpaBarcode.value = numeral(0).format("0.00"); // prettier-ignore
                        jumlah_pemasukanSekunderTanpaBarcode.readOnly = true;
                    }
                    jumlah_pemasukanTritierTanpaBarcode.readOnly = false;

                    // Set focus based on read-only status
                    jumlah_pemasukanPrimerTanpaBarcode.readOnly
                        ? jumlah_pemasukanSekunderTanpaBarcode.readOnly
                            ? jumlah_pemasukanTritierTanpaBarcode.focus()
                            : jumlah_pemasukanSekunderTanpaBarcode.focus()
                        : jumlah_pemasukanPrimerTanpaBarcode.focus();
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Type data.",
                });
            },
        });
    });

    jumlah_pemasukanTritierTanpaBarcode.addEventListener("input", function (e) {
        let inputValue = parseFloat(e.target.value);
        let sumHasilKonversiTritierTanpaBarcode = 0;

        // Loop through table rows and sum only those without the .selected class
        table_daftarTujuanKonversiTanpaBarcode.rows().every(function () {
            let rowNode = this.node();
            if (!rowNode.classList.contains("selected")) {
                sumHasilKonversiTritierTanpaBarcode +=
                    parseFloat(this.data()[6]) || 0;
            }
        });

        let maxHasilKonversiTritierTanpaBarcode =
            parseFloat(
                numeral(jumlah_pemakaianTritierTanpaBarcode.value).value() *
                    1.03
            ) - sumHasilKonversiTritierTanpaBarcode;

        if (inputValue > maxHasilKonversiTritierTanpaBarcode) {
            this.setCustomValidity("Input exceeds the maximum allowed value.");
            e.target.value = parseFloat(numeral(jumlah_pemakaianTritierTanpaBarcode.value).value() * 1.03); // prettier-ignore
        } else {
            this.setCustomValidity("");
        }
        if (e.target.value !== "") {
            button_modalProsesTanpaBarcode.disabled = false;
        } else {
            button_modalProsesTanpaBarcode.disabled = true;
        }
        this.reportValidity();
    });

    button_modalProsesTanpaBarcode.addEventListener("click", function () {
        if (numeral(jumlah_pemasukanTritierTanpaBarcode.value).value() == 0) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Hasil konversi tidak boleh 0!",
            }).then(() => {
                jumlah_pemasukanTritierTanpaBarcode.focus();
            });

            return;
        }

        if (id_shiftTanpaBarcode.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Kolom shift harus diisi!",
            }).then(() => {
                id_shift.focus();
            });
            return;
        }

        if (
            select_typeTujuanTanpaBarcode.val() == select_typeAsalTanpaBarcode.val() // prettier-ignore
        ) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Asal dan tujuan konversi tidak boleh sama!",
            });
        } else {
            $.ajax({
                type: "POST",
                url: "/KonversiSetengahJadi",
                data: {
                    _token: csrfToken,
                    shift: id_shiftTanpaBarcode.value,
                    group: id_groupTanpaBarcode.value,
                    divisi: "ABM",
                    jenisStore: "permohonan",
                    id_typeAsal: select_typeAsalTanpaBarcode.val(),
                    pemakaian_primerAsal: jumlah_pemakaianPrimerTanpaBarcode.value, // prettier-ignore
                    pemakaian_sekunderAsal: jumlah_pemakaianSekunderTanpaBarcode.value, // prettier-ignore
                    pemakaian_tritierAsal: jumlah_pemakaianTritierTanpaBarcode.value, // prettier-ignore
                    idSubKelompokAsal: select_subKelompokAsalTanpaBarcode.val(),
                    idTypeTujuan: select_typeTujuanTanpaBarcode.val(),
                    jumlah_pemasukanPrimer: jumlah_pemasukanPrimerTanpaBarcode.value, // prettier-ignore
                    jumlah_pemasukanSekunder: jumlah_pemasukanSekunderTanpaBarcode.value, // prettier-ignore
                    jumlah_pemasukanTritier: jumlah_pemasukanTritierTanpaBarcode.value, // prettier-ignore
                    idSubkelompokTujuan: select_subKelompokTujuanTanpaBarcode.val(), // prettier-ignore
                    tanggalKonversi: input_tanggalKonversiTanpaBarcode.value,
                },
                success: function (response) {
                    if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {
                        getDataPermohonan();
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil!",
                            text: response.success,
                            showConfirmButton: false,
                        });
                        $("#tambahTujuanModalTanpaBarcode").modal("hide");
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
            });
        }
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalACC").data("id", rowID);
        document.getElementById("detailKonversiModalLabel").innerHTML =
            "Detail Permohonan Konversi " + rowID;
        $.ajax({
            url: "/KonversiSetengahJadi/getDetailKonversi",
            type: "GET",
            data: {
                idKonversi: rowID,
                idDivisi: "ABM",
            },
            success: function (response) {
                // Assuming your server returns an array of objects for the table data
                console.log(response);

                if (response && Array.isArray(response)) {
                    // Filter data for Asal Konversi Potong ABM
                    var asalData = response.filter(function (item) {
                        return item.UraianDetailTransaksi.includes(
                            "Asal Konversi Setengah Jadi ABM"
                        );
                    });

                    // Filter data for Tujuan Konversi Potong ABM
                    var tujuanData = response.filter(function (item) {
                        return item.UraianDetailTransaksi.includes(
                            "Tujuan Konversi Setengah Jadi ABM"
                        );
                    });

                    // Convert the data to match table column structure
                    var asalDataFormatted = asalData.map(function (item) {
                        return [
                            item.IdType, // Id Type Asal
                            item.NamaType, // Nama Type Asal
                            parseFloat(item.JumlahPengeluaranPrimer) +
                                " " +
                                (item.satPrimer.trim() ?? ""), // Pengeluaran Primer
                            parseFloat(item.JumlahPengeluaranSekunder) +
                                " " +
                                item.satSekunder.trim(), // Pengeluaran Sekunder
                            parseFloat(item.JumlahPengeluaranTritier) +
                                " " +
                                item.satTritier.trim(), // Pengeluaran Tritier
                            item.IdTransaksi, // Id Tmp Transaksi
                        ];
                    });

                    var tujuanDataFormatted = tujuanData.map(function (item) {
                        return [
                            item.IdType, // Id Type Tujuan
                            item.NamaType, // Nama Type Tujuan
                            parseFloat(item.JumlahPemasukanPrimer) +
                                " " +
                                (item.satPrimer.trim() ?? ""), // Pengeluaran Primer
                            parseFloat(item.JumlahPemasukanSekunder) +
                                " " +
                                item.satSekunder.trim(), // Pengeluaran Sekunder
                            parseFloat(item.JumlahPemasukanTritier) +
                                " " +
                                item.satTritier.trim(), // Pengeluaran Tritier
                            item.IdTransaksi, // Id Tmp Transaksi
                        ];
                    });

                    // Insert filtered data into table_daftarAsalKonversi
                    detail_konversiModalTableDaftarAsalKonversi
                        .clear()
                        .rows.add(asalDataFormatted)
                        .draw();

                    // Insert filtered data into table_daftarTujuanKonversi
                    detail_konversiModalTableDaftarTujuanKonversi
                        .clear()
                        .rows.add(tujuanDataFormatted)
                        .draw();
                    $("#detailKonversiModal").modal("show");
                } else {
                    console.error(
                        "Data is not in the expected format:",
                        response
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Yakin untuk menghapus?",
            text:
                "Apakah anda yakin untuk menghapus data permohonan dengan id konversi " +
                rowID +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/KonversiSetengahJadi/BatalACCDataKonversi",
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        idKonversi: rowID,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan!",
                                text: response.error,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: response.success,
                            });
                            getDataPermohonan();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Data permohonan tidak jadi dihapus :)",
                    "info"
                );
            }
        });
    });

    $(document).on("click", ".btn-acc", function (e) {
        //lakukan print barcode di sini
        e.preventDefault();
        let idkonversi = $(this).data("id");
        $.ajax({
            type: "POST",
            url: "/KonversiSetengahJadi",
            data: {
                _token: csrfToken,
                idkonversi: idkonversi,
                jenisStore: "accPermohonan",
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                } else {
                    // Extract values from the response
                    let Kode_barang = response.barcode[0].Kode_barang;
                    let NoIndeks = response.barcode[0].NoIndeks;

                    // Pad NoIndeks to 9 digits
                    let paddedNoIndeks = NoIndeks.pABMtart(9, "0");

                    // Concatenate NoIndeks and Kode_barang
                    let barcodeValue = `${paddedNoIndeks}-${Kode_barang}`;

                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: responseSuccess,
                        showConfirmButton: false,
                    }).then(() => {
                        const barcodeCanvas = document.getElementById("div_printBarcode"); // prettier-ignore

                        // Set up a MutationObserver to detect changes to the canvas
                        const observer = new MutationObserver((mutations) => {
                            mutations.forEach((mutation) => {
                                if (
                                    mutation.type === "attributes" &&
                                    mutation.attributeName === "data-rendered"
                                ) {
                                    // Trigger window.print() when rendering is complete
                                    window.print();
                                    // Stop observing after print is triggered
                                    observer.disconnect();
                                }
                            });
                        });

                        // Start observing the canvas element
                        observer.observe(barcodeCanvas, {
                            attributes: true,
                        });

                        // Generate the barcode with JsBarcode
                        JsBarcode("#div_printBarcode", barcodeValue, {
                            format: "CODE128", // The format of the barcode (e.g., CODE128, EAN13, UPC, etc.)
                            width: 4, // Width of a single barcode unit
                            height: 200, // Height of the barcode
                            displayValue: true, // Display the value below the barcode
                        });

                        // Add a custom attribute after the barcode is rendered
                        barcodeCanvas.setAttribute("data-rendered", "true");
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            },
        }).then(() => {
            getDataPermohonan();
        });
    });

    //#endregion
});
