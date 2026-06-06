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
let btnFoto = document.getElementById("btnFoto");
let cameraInput = document.getElementById("cameraInput");
let cameraModal = document.getElementById("cameraModal");
let cameraVideo = document.getElementById("cameraVideo");
let cameraCanvas = document.getElementById("cameraCanvas");
let btnTakePhoto = document.getElementById("btnTakePhoto");
let btnCloseCamera = document.getElementById("btnCloseCamera");
let stream = null;

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

let gambarDariDB = false;
let selectedFile = null;

// #endregion

// #region Function

function closeCameraModal() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    cameraVideo.srcObject = null;
    cameraModal.style.display = "none";
}

// endregion

// #region Event Listener

// tutup modal kamera
document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && cameraModal.style.display === "flex") {
            closeCameraModal();
        }
    }
);

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

    // jika sudah simpan gambar, tidak bisa browse
    if (gambarDariDB) {
        Swal.fire({
            icon: "warning",
            title: "Gambar Sudah Ada",
            text: "Kode barang ini sudah memiliki gambar. Hapus gambar lama terlebih dahulu."
        });

        return;
    }

    fotoInput.click();
});


// preview gambar input
fotoInput.addEventListener("change", function (e) {
    let file = e.target.files[0];

    if (file) {
        selectedFile = file;

        let reader = new FileReader();
        reader.onload = function (ev) {
            previewImage.src = ev.target.result;
            gambarDariDB = false;
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
                gambarDariDB = true;

            } else {
                previewImage.src = "/images/tanyaken_apa.jpg";
                gambarDariDB = false;
            }
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Terjadi kesalahan."
            });

            previewImage.src = "/images/tanyaken_apa.jpg";
        });
});

// Enter pada kode barang
kdBarang.addEventListener(
    "keydown",
    function (e) {

        if (e.key === "Enter") {
            e.preventDefault();
            kdBarang.value = kdBarang.value
                .trim()
                .padStart(9, "0");

            btnCari.click();
        }
    }
);


// buka kamera
btnFoto.addEventListener("click", async function () {
        // wajib cari barang dulu
        if (!kdBarang.value.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text:
                    "Masukkan kode barang terlebih dahulu."
            });
            return;
        }

        // jika gambar sudah ada di DB
        if (gambarDariDB) {
            Swal.fire({
                icon: "warning",
                title: "Gambar Sudah Ada",
                text: "Kode barang ini sudah memiliki gambar. Hapus gambar lama terlebih dahulu."
            });
            return;
        }

        // menggunakan device mobile
        const isMobile = /Android|webOS|iPhone|iPad/i
            .test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth <= 1366);

        console.log("isMobile:", isMobile);

        if (isMobile) {
            cameraInput.click();
            return;
        }

        // desktop / laptop
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Browser tidak mendukung akses kamera."
                });
                return;
            }

            // buka webcam langsung
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

            cameraVideo.srcObject = stream;
            cameraModal.style.display = "flex";

        } catch (err) {
            console.error("Camera Error:", err);

            let message = "Tidak dapat akses kamera.";

            if (err.name === "NotFoundError") {
                message = "Laptop / PC ini tidak memiliki webcam.";

            } else if (err.name === "Izin Kamera Ditolak!") {
                message = "Beri akses pada Kamera.";

            } else if (err.name === "NotReadableError"
            ) {
                message = "Kamera sedang digunakan aplikasi lain.";
            }

            Swal.fire({
                icon: "error",
                title:
                    "Error Kamera",
                html: `
                    <b>${err.name}</b><br>
                    ${message}
                `
            });
        }
    }
);

// preview hasil kamera
cameraInput.addEventListener("change", function (e) {
    let file = e.target.files[0];

    if (file) {
        selectedFile = file;

        let reader = new FileReader();
        reader.onload = function (ev) {
            previewImage.src = ev.target.result;
            gambarDariDB = false;
        };
        reader.readAsDataURL(file);
    }
});

btnTakePhoto.addEventListener("click", function () {
        const ctx = cameraCanvas.getContext("2d");
        cameraCanvas.width = cameraVideo.videoWidth;
        cameraCanvas.height = cameraVideo.videoHeight;

        ctx.drawImage(
            cameraVideo,
            0,
            0
        );

        cameraCanvas.toBlob(
            function (blob) {

                selectedFile =
                    new File(
                        [blob],
                        "camera.jpg",
                        {
                            type:
                                "image/jpeg"
                        }
                    );

                previewImage.src = URL.createObjectURL(blob);

                gambarDariDB = false;
            },
            "image/jpeg",
            0.9
        );

        // matikan kamera
        if (stream) {
            stream.getTracks()
                .forEach(track =>
                    track.stop()
                );
        }

        cameraModal.style.display = "none";
    }
);

btnCloseCamera.addEventListener("click", function () {
        closeCameraModal();
    }
);

cameraModal.addEventListener("click", function (e) {
        if (e.target === cameraModal) {
            closeCameraModal();
        }
    }
);


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

    if (!selectedFile) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Pilih gambar terlebih dahulu."
        });

        return;
    }

    let formData = new FormData();

    formData.append("Kd_Barang", kdBarang.value);
    formData.append("Foto", selectedFile);

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
                previewImage.src = "/images/tanyaken_apa.jpg";

                fotoInput.value = "";
                cameraInput.value = "";

                selectedFile = null;
                gambarDariDB = false;
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
