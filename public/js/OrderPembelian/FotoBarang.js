// #region Variable
let btnBrowse = document.getElementById("btnBrowse");
let fotoInput = document.getElementById("fotoInput");
let previewImage = document.getElementById("previewImage");
let btnCari = document.getElementById("btnCari");
let kdBarang = document.getElementById("kdBarang");
let namaBarang = document.getElementById("namaBarang");
let ketBarang = document.getElementById("ketBarang");
let btnSimpan = document.getElementById("btnSimpan");
let btnHapus = document.getElementById("btnHapus");

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

// #endregion


// #region Event Listener

// browse gambar
btnBrowse.addEventListener("click", function () {
    // wajib cari barang dulu
    if (!kdBarang.value.trim()) {

        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Masukkan kode barang terlebih dahulu."
        });

        return;
    }

    // jika sudah ada gambar lama
    let defaultImage =
        "/images/tanyaken_apa.jpg";

    let hasExistingImage =
        !previewImage.src.includes(defaultImage);

    if (hasExistingImage) {

        Swal.fire({
            icon: "warning",
            title: "Gambar Sudah Ada",
            text:
                "Kode barang ini sudah memiliki gambar. Hapus gambar lama terlebih dahulu."
        });

        return;
    }

    fotoInput.click();
});


// preview gambar input
fotoInput.addEventListener("change", function (e) {
    let file = e.target.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (ev) {
            previewImage.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Cari Barang
btnCari.addEventListener("click", function () {
    let kode = kdBarang.value.trim();

    if (!kode) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Kode barang harus diisi"
        });
        return;
    }

    kode = kode.padStart(9, "0");
    kdBarang.value = kode;

    fetch(`/FotoBarang/${kode}`)
        .then(response => response.json())
        .then(res => {
            if (!res.success) {
                Swal.fire({
                    icon: "warning",
                    title: "Data Tidak Ditemukan",
                    text: res.message
                });

                namaBarang.value = "";
                ketBarang.value = "";
                previewImage.src = "/images/tanyaken_apa.jpg";

                return;
            }

            namaBarang.value = res.data.nama_brg ?? "";
            ketBarang.value = res.data.ket ?? "";

            // tampilkan gambar
            if (res.data.foto) {
                previewImage.src =
                    `data:image/jpeg;base64,${res.data.foto}`;

            } else {
                previewImage.src =
                    "/images/tanyaken_apa.jpg";
            }
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Terjadi kesalahan."
            });

            previewImage.src =
                "/images/tanyaken_apa.jpg";
        });
});


// Simpan
btnSimpan.addEventListener("click", function () {
    if (!kdBarang.value.trim()) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Kode barang harus diisi."
        });

        return;
    }

    if (!fotoInput.files[0]) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Pilih gambar terlebih dahulu."
        });

        return;
    }

    let formData = new FormData();

    formData.append("Kd_Barang", kdBarang.value);
    formData.append("Foto", fotoInput.files[0]);

    fetch("/FotoBarang", {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken
        },
        body: formData
    })
    .then(response => response.json())
    .then(res => {

        Swal.fire({
            icon: res.success
                ? "success"
                : "error",
            title: res.success
                ? "Berhasil"
                : "Gagal",
            text: res.message
        });
    })
    .catch(error => {
        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Gagal menyimpan data."
        });
    });
});


// Hapus Foto
btnHapus.addEventListener("click", function () {
    let kode = kdBarang.value.trim();

    if (!kode) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Kode barang kosong."
        });

        return;
    }

    Swal.fire({
        title: "Yakin?",
        text: "Foto akan dihapus.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal"
    })
    .then((result) => {

        if (!result.isConfirmed) return;
        fetch(`/FotoBarang/${kode}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": csrfToken
            }
        })
        .then(response => response.json())
        .then(res => {

            Swal.fire({
                icon: res.success
                    ? "success"
                    : "error",
                title: res.success
                    ? "Berhasil"
                    : "Gagal",
                text: res.message
            });

            if (res.success) {
                previewImage.src =
                    "/images/tanyaken_apa.jpg";
            }
        })
        .catch(error => {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Gagal menghapus data."
            });
        });
    });
});

// #endregion
