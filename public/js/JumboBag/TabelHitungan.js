let csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
let customer = document.getElementById("customer");
let id_customer = document.getElementById("id_customer");
let btn_customer = document.getElementById("btn_customer");
let nama_barang = document.getElementById("nama_barang");
let komponen = document.getElementById("komponen");
let btn_nama_barang = document.getElementById("btn_nama_barang");
let tanggal = document.getElementById("tanggal");
let tanggal_update = document.getElementById("tanggal_update");
let body_bentuk = document.getElementById("body_bentuk");
let btn_body_model = document.getElementById("btn_body_model");
let body_model = document.getElementById("body_model");
let id_body_model = document.getElementById("id_body_model");
let body_panjang = document.getElementById("body_panjang");
let body_lebar = document.getElementById("body_lebar");
let body_diameter = document.getElementById("body_diameter");
let body_tinggi = document.getElementById("body_tinggi");
let cerobongAtas_bentuk = document.getElementById("cerobongAtas_bentuk");
let cerobongAtas_model = document.getElementById("cerobongAtas_model");
let id_cerobongAtas_model = document.getElementById("id_cerobongAtas_model");
let btn_cerobongAtas_model = document.getElementById("btn_cerobongAtas_model");
let cerobongAtas_panjang = document.getElementById("cerobongAtas_panjang");
let cerobongAtas_lebar = document.getElementById("cerobongAtas_lebar");
let cerobongAtas_diameter = document.getElementById("cerobongAtas_diameter");
let cerobongAtas_tinggi = document.getElementById("cerobongAtas_tinggi");
let cerobongBawah_bentuk = document.getElementById("cerobongBawah_bentuk");
let cerobongBawah_model = document.getElementById("cerobongBawah_model");
let id_cerobongBawah_model = document.getElementById("id_cerobongBawah_model");
let btn_cerobongBawah_model = document.getElementById(
    "btn_cerobongBawah_model"
);
let cerobongBawah_panjang = document.getElementById("cerobongBawah_panjang");
let cerobongBawah_lebar = document.getElementById("cerobongBawah_lebar");
let cerobongBawah_diameter = document.getElementById("cerobongBawah_diameter");
let cerobongBawah_tinggi = document.getElementById("cerobongBawah_tinggi");
let reinforced_lebar = document.getElementById("reinforced_lebar");
let reinforced_beltrope = document.getElementById("reinforced_beltrope");
let reinforced_loop = document.getElementById("reinforced_loop");
let reinforced_SWL = document.getElementById("reinforced_SWL");
let reinforced_stdwaktu = document.getElementById("reinforced_stdwaktu");
let reinforced_lami = document.getElementById("reinforced_lami");
let reinforced_warna = document.getElementById("reinforced_warna");
let reinforced_inner = document.getElementById("reinforced_inner");
let reinforced_seal = document.getElementById("reinforced_seal");
let reinforced_jumlah = document.getElementById("reinforced_jumlah");
let reinforced_jarak = document.getElementById("reinforced_jarak");
let reinforced_warnaBelt = document.getElementById("reinforced_warnaBelt");
let reinforced_tinggiloop = document.getElementById("reinforced_tinggiloop");
let reinforced_SF = document.getElementById("reinforced_SF");
let reinforced_printing = document.getElementById("reinforced_printing");
let reinforced_tebal = document.getElementById("reinforced_tebal");
let reinforced_keterangan = document.getElementById("reinforced_keterangan");
let jenis_barang = document.getElementById("jenis_barang");
let tabelData = new DataTable(document.getElementById("tabelData")); //initialize datatables
let tambah_komponen = document.getElementById("tambah_komponen");
let koreksi_komponen = document.getElementById("koreksi_komponen");
let hapus_komponen = document.getElementById("hapus_komponen");
let total1 = document.getElementById("total1");
let total2 = document.getElementById("total2");
let total3 = document.getElementById("total3");
let btn_isi = document.getElementById("btn_isi");
let btn_koreksi = document.getElementById("btn_koreksi");
let btn_hapus = document.getElementById("btn_hapus");
let btn_proses = document.getElementById("btn_proses");
let tmb = 1;
let proses;

//#region Load Form

btn_isi.focus();
tanggal.valueAsDate = new Date();
tanggal_update.valueAsDate = new Date();
aktif_tombol(tmb);

//#endregion

//#region Functions

function aktif_tombol(tmb) {
    if (tmb == 1) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = false;
        btn_hapus.disabled = false;
        btn_proses.disabled = true;
        btn_hapus.innerHTML = "Hapus";
        btn_customer.disabled = true;
        btn_isi.focus();
    } else if (tmb == 2) {
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_proses.disabled = false;
        btn_hapus.innerHTML = "Batal";
        btn_customer.disabled = false;
        btn_customer.focus();
    }
}

function cleardata() {
    customer.value = "";
    id_customer.value = "";
    nama_barang.value = "";
    komponen.value = "";
    body_bentuk.value = "";
    body_model.value = "";
    body_panjang.value = "";
    body_lebar.value = "";
    body_diameter.value = "";
    body_tinggi.value = "";
    cerobongAtas_bentuk.value = "";
    cerobongAtas_model.value = "";
    cerobongAtas_panjang.value = "";
    cerobongAtas_lebar.value = "";
    cerobongAtas_diameter.value = "";
    cerobongAtas_tinggi.value = "";
    cerobongBawah_bentuk.value = "";
    cerobongBawah_model.value = "";
    cerobongBawah_panjang.value = "";
    cerobongBawah_lebar.value = "";
    cerobongBawah_diameter.value = "";
    cerobongBawah_tinggi.value = "";
    reinforced_lebar.value = "";
    reinforced_beltrope.value = "";
    reinforced_loop.value = "";
    reinforced_SWL.value = "";
    reinforced_stdwaktu.value = "";
    reinforced_lami.value = "";
    reinforced_warna.value = "";
    reinforced_inner.value = "";
    reinforced_seal.checked = false;
    reinforced_jumlah.value = "";
    reinforced_jarak.value = "";
    reinforced_warnaBelt.value = "";
    reinforced_tinggiloop.value = "";
    reinforced_SF.value = "";
    reinforced_printing.value = "";
    reinforced_tebal.value = "";
    reinforced_keterangan.value = "";
    jenis_barang.value = "";
    tabelData.clear().draw();
    total1.value = "";
    total2.value = "";
    total3.value = "";
}

//#endregion

//#region Add Event Listener

btn_isi.addEventListener("click", function (event) {
    event.preventDefault();
    tmb = 2;
    proses = 1;
    aktif_tombol(tmb);
    cleardata();
});

btn_koreksi.addEventListener("click", function (event) {
    event.preventDefault();
    tmb = 2;
    proses = 2;
    aktif_tombol(tmb);
    cleardata();
});

btn_hapus.addEventListener("click", function (event) {
    event.preventDefault();
    if (tmb == 2) {
        //batal
        tmb = 1;
        proses = 0;
        aktif_tombol(tmb);
        cleardata();
    } else {
        //proses hapus
        tmb = 2;
        proses = 3;
        aktif_tombol(tmb);
        cleardata();
    }
});

btn_customer.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Customer",
            html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#customerTable")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#customerTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: "getDataCustomerJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Customer",
                            },
                            {
                                data: "Kode_Customer",
                            },
                        ],
                    });
                    $("#customerTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                customer.value = selectedRow.Nama_Customer.trim();
                id_customer.value = selectedRow.Kode_Customer.trim();
                if (proses == 1) {
                    nama_barang.value = "O-" + id_customer.value.trim() + "-";
                    nama_barang.disabled = false;
                    nama_barang.focus();
                } else {
                    btn_kode_barang.disabled = false;
                    btn_kode_barang.focus();
                }
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
    // console.log(selectedRow);
});

btn_customer.addEventListener("focus", function () {
    if (nama_barang.value != "") {
        btn_customer.blur();
        nama_barang.focus();
    }
});

nama_barang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        tanggal.disabled = false;
        tanggal.focus();
    }
});

tanggal.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        body_bentuk.disabled = false;
        body_bentuk.focus();
    }
});

body_bentuk.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (body_bentuk && body_bentuk.value.trim() !== "") {
            body_bentuk.value = body_bentuk.value.toUpperCase();
            if (body_bentuk.value == "C" || body_bentuk.value == "S") {
                if (proses == 1) {
                    body_panjang.value = 0;
                    body_lebar.value = 0;
                    body_diameter.value = 0;
                    body_diameter.value = 0;
                    body_tinggi.value = 0;
                }
                if (body_bentuk.value == "S") {
                    body_diameter.disabled = true;
                    body_lebar.disabled = true;
                    body_tinggi.disabled = true;
                    body_panjang.disabled = false;
                    body_panjang.focus();
                } else {
                    body_panjang.disabled = true;
                    body_tinggi.disabled = true;
                    body_lebar.disabled = true;
                    body_diameter.disabled = false;
                    body_diameter.focus();
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Bentuk Body Besar Harus [C]ircular / [S]quare!",
                });
                body_bentuk.value = "";
                body_bentuk.focus();
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Bentuk Body Besar Harus [C]ircular / [S]quare!",
            });
        }
    }
});

body_panjang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        body_lebar.disabled = false;
        body_lebar.focus();
    }
});

body_diameter.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        body_tinggi.disabled = false;
        body_tinggi.focus();
    }
});

body_lebar.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        body_tinggi.disabled = false;
        body_tinggi.focus();
    }
});

body_tinggi.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        btn_body_model.disabled = false;
        btn_body_model.focus();
    }
});

btn_body_model.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Model",
            html: '<table id="ModelTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#ModelTable")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#ModelTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: "getDataModelBodyJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                body_bentuk: body_bentuk.value,
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Model",
                            },
                            {
                                data: "Kode_Model",
                            },
                        ],
                    });
                    $("#ModelTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                body_model.value = selectedRow.Nama_Model.trim();
                console.log(id_body_model.value, selectedRow.Kode_Model);
                id_body_model.value = selectedRow.Kode_Model.trim();
                // if (proses == 1) {
                //     nama_barang.value = "O-" + id_Model.value.trim() + "-";
                //     nama_barang.disabled = false;
                //     nama_barang.focus();
                // } else {
                //     btn_kode_barang.disabled = false;
                //     btn_kode_barang.focus();
                // }
                cerobongAtas_bentuk.disabled = false;
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_body_model.addEventListener("focus", function () {
    if (body_model.value != "" && id_body_model.value != "") {
        btn_body_model.blur();
        cerobongAtas_bentuk.focus();
    }
});

cerobongAtas_bentuk.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (cerobongAtas_bentuk && cerobongAtas_bentuk.value.trim() !== "") {
            cerobongAtas_bentuk.value = cerobongAtas_bentuk.value.toUpperCase();
            if (
                cerobongAtas_bentuk.value == "C" ||
                cerobongAtas_bentuk.value == "S"
            ) {
                if (proses == 1) {
                    cerobongAtas_panjang.value = 0;
                    cerobongAtas_lebar.value = 0;
                    cerobongAtas_diameter.value = 0;
                    cerobongAtas_diameter.value = 0;
                    cerobongAtas_tinggi.value = 0;
                }
                if (cerobongAtas_bentuk.value == "S") {
                    cerobongAtas_lebar.disabled = true;
                    cerobongAtas_tinggi.disabled = true;
                    cerobongAtas_diameter.disabled = true;
                    cerobongAtas_panjang.disabled = false;
                    cerobongAtas_panjang.focus();
                } else {
                    cerobongAtas_lebar.disabled = true;
                    cerobongAtas_tinggi.disabled = true;
                    cerobongAtas_panjang.disabled = true;
                    cerobongAtas_diameter.disabled = false;
                    cerobongAtas_diameter.focus();
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Bentuk Cerobong Atas Besar Harus [C]ircular / [S]quare!",
                });
                cerobongAtas_bentuk.value = "";
                cerobongAtas_bentuk.focus();
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Bentuk Cerobong Atas Besar Harus [C]ircular / [S]quare!",
            });
        }
    }
});

cerobongAtas_panjang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        cerobongAtas_lebar.disabled = false;
        cerobongAtas_lebar.focus();
    }
});

cerobongAtas_lebar.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        cerobongAtas_tinggi.disabled = false;
        cerobongAtas_tinggi.focus();
    }
});

cerobongAtas_diameter.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        cerobongAtas_tinggi.disabled = false;
        cerobongAtas_tinggi.focus();
    }
});

cerobongAtas_tinggi.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        btn_cerobongAtas_model.disabled = false;
        btn_cerobongAtas_model.focus();
    }
});

btn_cerobongAtas_model.addEventListener("click", async function (e) { //harusnya beda dengan body_bentuk
    e.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Model",
            html: '<table id="ModelTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#ModelTable")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#ModelTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: "getDataModelCerobongAtasJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                cerobongAtas_bentuk: cerobongAtas_bentuk.value,
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Model",
                            },
                            {
                                data: "Kode_Model",
                            },
                        ],
                    });
                    $("#ModelTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                cerobongAtas_model.value = selectedRow.Nama_Model.trim();
                // console.log(id_cerobongAtas_model.value, selectedRow.Kode_Model);
                id_cerobongAtas_model.value = selectedRow.Kode_Model.trim();
                // if (proses == 1) {
                //     nama_barang.value = "O-" + id_Model.value.trim() + "-";
                //     nama_barang.disabled = false;
                //     nama_barang.focus();
                // } else {
                //     btn_kode_barang.disabled = false;
                //     btn_kode_barang.focus();
                // }
                cerobongBawah_bentuk.disabled = false;
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_cerobongAtas_model.addEventListener("focus", function () {
    if (cerobongAtas_model.value != "" && id_cerobongAtas_model.value != "") {
        btn_cerobongAtas_model.blur();
        cerobongBawah_bentuk.focus();
    }
});

cerobongBawah_bentuk.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (cerobongBawah_bentuk && cerobongBawah_bentuk.value.trim() !== "") {
            cerobongBawah_bentuk.value =
                cerobongBawah_bentuk.value.toUpperCase();
            if (
                cerobongBawah_bentuk.value == "C" ||
                cerobongBawah_bentuk.value == "S"
            ) {
                if (proses == 1) {
                    cerobongBawah_panjang.value = 0;
                    cerobongBawah_lebar.value = 0;
                    cerobongBawah_diameter.value = 0;
                    cerobongBawah_diameter.value = 0;
                    cerobongBawah_tinggi.value = 0;
                }
                if (cerobongBawah_bentuk.value == "S") {
                    cerobongBawah_lebar.disabled = true;
                    cerobongBawah_tinggi.disabled = true;
                    cerobongBawah_diameter.disabled = true;
                    cerobongBawah_panjang.disabled = false;
                    cerobongBawah_panjang.focus();
                } else {
                    cerobongBawah_lebar.disabled = true;
                    cerobongBawah_tinggi.disabled = true;
                    cerobongBawah_panjang.disabled = true;
                    cerobongBawah_diameter.disabled = false;
                    cerobongBawah_diameter.focus();
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Pemberitahuan",
                    text: "Bentuk Cerobong Atas Besar Harus [C]ircular / [S]quare!",
                });
                cerobongBawah_bentuk.value = "";
                cerobongBawah_bentuk.focus();
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Bentuk Cerobong Atas Besar Harus [C]ircular / [S]quare!",
            });
        }
    }
});

cerobongBawah_panjang.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        cerobongBawah_lebar.disabled = false;
        cerobongBawah_lebar.focus();
    }
});

cerobongBawah_lebar.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        cerobongBawah_tinggi.disabled = false;
        cerobongBawah_tinggi.focus();
    }
});

cerobongBawah_diameter.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        cerobongBawah_tinggi.disabled = false;
        cerobongBawah_tinggi.focus();
    }
});

cerobongBawah_tinggi.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        e.preventDefault();
        if (this.value == "") {
            this.value = 0;
        }
        btn_cerobongBawah_model.disabled = false;
        btn_cerobongBawah_model.focus();
    }
});

btn_cerobongBawah_model.addEventListener("click", async function (e) {//harusnya beda dengan body_bentuk
    e.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Model",
            html: '<table id="ModelTable" class="display" style="width:100%"><thead><tr><th>Nama Model</th><th>Id_Model</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            preConfirm: () => {
                const selectedData = $("#ModelTable")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#ModelTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: "getDataModelCerobongBawahJBB",
                            dataType: "json",
                            type: "POST",
                            data: {
                                cerobongBawah_bentuk: cerobongBawah_bentuk.value,
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Model",
                            },
                            {
                                data: "Kode_Model",
                            },
                        ],
                    });
                    $("#ModelTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                cerobongBawah_model.value = selectedRow.Nama_Model.trim();
                // console.log(id_cerobongBawah_model.value, selectedRow.Kode_Model);
                id_cerobongBawah_model.value = selectedRow.Kode_Model.trim();
                // if (proses == 1) {
                //     nama_barang.value = "O-" + id_Model.value.trim() + "-";
                //     nama_barang.disabled = false;
                //     nama_barang.focus();
                // } else {
                //     btn_kode_barang.disabled = false;
                //     btn_kode_barang.focus();
                // }
                cerobongBawah_bentuk.disabled = false;
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btn_cerobongBawah_model.addEventListener("focus", function () {
    if (cerobongBawah_model.value != "" && id_cerobongBawah_model.value != "") {
        btn_cerobongBawah_model.blur();
        cerobongBawah_bentuk.focus();
    }
});

//#endregion
