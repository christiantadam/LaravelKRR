/**
 * Siapkan data untuk user testing form sortir benang ng
 * tanyakan besok bisanya pukul berapa
 *
 * hapus semua detail konversi ng agar bisa hapus master konversi ng,
 * jika sudah tidak ada maka data konversi bisa keluar di form
 *
 * data yang masuk ke sortir benang ng adalah konversi jenis HP
 * dengan nama type NG dan SaatLog tidak null
 *
 * - EXT-0000042891
 * Tanggal	2009-01-04 00:00:00.000
 * Shift	C
 *
 * - EXT-0000042885
 * Tanggal	2009-01-03 00:00:00.000
 * Shift	C
 *
 * - EXT-0000042871
 * Tanggal	2009-01-03 00:00:00.000
 * Shift	B
 *
 * - EXT-0000042887
 * Tanggal	2009-01-03 00:00:00.000
 * Shift	A
 *
 * - EXT-0000042854
 * Tanggal	2009-01-02 00:00:00.000
 * Shift	A
 */

/**
 * LAST : btnDivisi_Click() | frmCekStokKirim.vb
 *
 * User_id = 4384
 *
 * Dokumentasi Alur Kerja Form + Test Case terhadap database lokal
 * Bisa juga dipakai sebagai User Manual
 * https://docs.google.com/document/d/1dRO-LCljmRm9tND8NfYJJTtf_j88ZXvakePGIBnaaJA/edit?usp=sharing (Extruder.Net)
 * https://docs.google.com/document/d/1vxQOqKXhgnv6ZkSTaBGbSREuw_SvHyHKCJ64Teosxrw/edit?usp=sharing (Berat Komposisi 2)
 */

/**
 * Pengecekkan Kembali Aplikasi Warehouse Terima KRR2
 * - Scan Gelondongan (aman)
 * - Batal Gelondongan (aman)
 * - Scan Assesoris (masih ada error)
 */

//#region Form Komposisi Tropodo
// Sebelumnya dilakukan pengecekkan komposisi terlebih dahulu tapi sekarang tidak?..
// SP_5298_EXT_CEK_KOMPOSISI modeProses "hapus_detail"
fetchSelect("/Master/getCekKomposisi/" + slcKomposisi.value.trim(), (data) => {
    if (data[0].ada <= 0) {
        deleteDetailFetch(slcKomposisi.value, () => {
            let jmlh_bb = 0;
            for (let j = 0; j < listKomposisi.length; j++) {
                if (listKomposisi[j].StatusType == "BB") {
                    jmlh_bb += parseFloat(listKomposisi[j].JumlahTritier);
                }
            }

            insertDetailFetch(jmlh_bb, () => {
                alert("Data berhasil disimpan.");
                toggleButtons(1);
                disableDetail();
                modeProses = "";
            });
        });
    } else
        alert(
            "Komposisi tidak dapat dihapus, karena telah terpakai untuk konversi."
        );
});

// SP_5298_EXT_CEK_KOMPOSISI modeProses "hapus"
fetchSelect("/Master/getCekKomposisi/" + slcKomposisi.value.trim(), (data) => {
    if (data[0].ada <= 0) {
        deleteDetailFetch(slcKomposisi.value, () => {
            // SP_5298_EXT_DELETE_MASTER_KOMPOSISI
            fetchStmt(
                "/Master/delMasterKomposisi/" + slcKomposisi.value.trim(),
                () => {
                    toggleButtons(1);
                    disableDetail();
                    modeProses = "";
                    refetchKomposisi = true;
                    alert("Komposisi berhasil dihapus.");
                }
            );
        });
    } else
        alert(
            "Komposisi tidak dapat dihapus, karena telah terpakai untuk konversi."
        );
});
//#endregion

<script>
    $(document).ready(function(){" "}
    {
        // console.log(dataArray.data);
        $("#table_SP").DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: "{{ url('splokal') }}",
                dataType: "json",
                type: "POST",
                data: {
                    _token: "{{ csrf_token() }}",
                },
            },
            columns: [
                {
                    data: "IDSuratPesanan",
                },
                {
                    data: "NamaCust",
                },
                {
                    data: "Tgl_Pesan",
                },
                {
                    data: "Actions",
                },
            ],
        })
    }
    );
</script>;
