<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanMesinMPJTanpaOKModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog" style="max-width: 90%">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahKegiatanMesinMPJTanpaOKLabel">Tambah Kegiatan Mesin</h5>
                <button type="button" class="close" id="closeTambahKegiatanMesinMPJTanpaOKModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.1">
                            <label for="tanggalLogMesinMPJTanpaOK">Tanggal Log</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggalLogMesinMPJTanpaOK"
                                    name="tanggalLogMesinMPJTanpaOK">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="kodeBarangHasilTanpaOK">Kode Barang Hasil</label>
                            <div class="input-group">
                                <input type="text" name="kodeBarangHasilTanpaOK" id="kodeBarangHasilTanpaOK"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="namaMesinMPJTanpaOK">Nama Mesin</label>
                            <div class="input-group">
                                <select name="namaMesinMPJTanpaOK" id="namaMesinMPJTanpaOK"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="shiftMPJTanpaOK">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shiftMPJTanpaOK" id="shiftMPJTanpaOK" class="form-control"
                                    placeholder="[A] [B] [C]">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="ukuranKainTanpaOK">Ukuran</label>
                            <div class="input-group">
                                <input type="text" name="ukuranKainTanpaOK" id="ukuranKainTanpaOK"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="rajutanKainTanpaOK">Rajutan</label>
                            <div class="input-group">
                                <input type="text" name="rajutanKainTanpaOK" id="rajutanKainTanpaOK"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="denierKainTanpaOK">Denier</label>
                            <div class="input-group">
                                <input type="number" name="denierKainTanpaOK" id="denierKainTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="namaBarangHasilTanpaOK">Nama Barang Hasil</label>
                    <div class="input-group">
                        <div id="namaBarangHasilTanpaOK" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">

                        <div class="form-group"style="flex: 0.18">
                            <label for="stdWaktuTanpaOK">Standard Waktu (LBR/MNT)</label>
                            <div class="input-group">
                                <input type="number" name="stdWaktuTanpaOK" id="stdWaktuTanpaOK" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="bahanBakuKgMPJTanpaOK">Bahan Baku (KG)</label>
                            <div class="input-group">
                                <input type="number" name="bahanBakuKgMPJTanpaOK" id="bahanBakuKgMPJTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="hasilLBRMPJTanpaOK">Hasil (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="hasilLBRMPJTanpaOK" id="hasilLBRMPJTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanWAKGTanpaOK">Afalan WA (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalanWAKGTanpaOK" id="afalanWAKGTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanWALBRTanpaOK">Afalan WA (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalanWALBRTanpaOK" id="afalanWALBRTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanWEKGTanpaOK">Afalan WE (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalanWEKGTanpaOK" id="afalanWEKGTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanWELBRTanpaOK">Afalan WE (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalanWELBRTanpaOK" id="afalanWELBRTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanPotongKGTanpaOK">Afalan Potong (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalanPotongKGTanpaOK" id="afalanPotongKGTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanPotongLBRTanpaOK">Afalan Potong (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalanPotongLBRTanpaOK" id="afalanPotongLBRTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanCutterKGTanpaOK">Afalan Cutter (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalanCutterKGTanpaOK" id="afalanCutterKGTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanCutterLBRTanpaOK">Afalan Cutter (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalanCutterLBRTanpaOK" id="afalanCutterLBRTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.18">
                            <label for="rentangJamKerjaTanpaOK">Rentang Jam Kerja</label>
                            <div class="d-flex" style="align-items: center">
                                <input type="time" name="jamKerjaAwalTanpaOK" id="jamKerjaAwalTanpaOK"
                                    class="flatpickr-form-control" style="flex:0.425">
                                <span style="flex:0.15;text-align: center">s/d</span>
                                <input type="time" name="jamKerjaAkhirTanpaOK" id="jamKerjaAkhirTanpaOK"
                                    class="flatpickr-form-control" style="flex:0.425">
                                <input type="number" name="jamKerjaTanpaOK" id="jamKerjaTanpaOK"
                                    style="display: none">
                                <input type="number" name="jamIstirahatTanpaOK" id="jamIstirahatTanpaOK"
                                    style="display: none">
                            </div>
                        </div>

                        <div class="form-group"style="flex: 0.08;align-content:end">
                            <div class="input-group">
                                <input type="checkbox" name="jenisShiftTanpaOK" id="jenisShiftTanpaOK" class="form-check">
                                <label for="jenisShiftTanpaOK" class="form-check-label">Short Shift</label>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18">
                            <label for="jamGangguanMesinTanpaOK">Jam Gangguan Mesin (MNT)</label>
                            <div class="input-group">
                                <input type="number" name="jamGangguanMesinTanpaOK" id="jamGangguanMesinTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18">
                            <label for="jamGangguanLainTanpaOK">Jam Gangguan Lain (MNT)</label>
                            <div class="input-group">
                                <input type="number" name="jamGangguanLainTanpaOK" id="jamGangguanLainTanpaOK"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="totalAfalanTanpaOK">Total Afalan (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="totalAfalanTanpaOK" id="totalAfalanTanpaOK"
                                    class="form-control" min="0" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="hasilKotorTanpaOK">Hasil Kotor (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="hasilKotorTanpaOK" id="hasilKotorTanpaOK"
                                    class="form-control" min="0" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2" id="div_alasanEditMPJTanpaOK">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 1">
                            <label for="alasanEditTanpaOK">Alasan Edit</label>
                            <div class="input-group">
                                <input type="text" name="alasanEditTanpaOK" id="alasanEditTanpaOK"
                                    class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProsesMPJTanpaOK">Proses</button>
            </div>
        </div>
    </div>
</div>
