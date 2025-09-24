<!-- Modal untuk Tambah Permohonan Order Kerja -->
<div class="modal fade" id="tambahKegiatanMesinMPJModal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog" style="max-width: 90%">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="tambahKegiatanMesinMPJLabel">Tambah Kegiatan Mesin</h5>
                <button type="button" class="close" id="closeTambahKegiatanMesinMPJModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.1">
                            <label for="tanggalLogMesinMPJ">Tanggal Log</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="tanggalLogMesinMPJ"
                                    name="tanggalLogMesinMPJ">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="namaMesinMPJ">Nama Mesin</label>
                            <div class="input-group">
                                <select name="namaMesinMPJ" id="namaMesinMPJ"></select>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="shiftMPJ">Shift</label>
                            <div class="input-group">
                                <input type="text" name="shiftMPJ" id="shiftMPJ" class="form-control"
                                    placeholder="[A] [B] [C]">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="orderKerja">Order Kerja</label>
                            <div class="input-group">
                                <input type="text" name="orderKerja" id="orderKerja" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18">
                            <label for="stdWaktu">Standard Waktu (LBR/MNT)</label>
                            <div class="input-group">
                                <input type="number" name="stdWaktu" id="stdWaktu" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="bahanBakuKgMPJ">Bahan Baku (KG)</label>
                            <div class="input-group">
                                <input type="number" name="bahanBakuKgMPJ" id="bahanBakuKgMPJ" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="hasilLBRMPJ">Hasil (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="hasilLBRMPJ" id="hasilLBRMPJ" class="form-control"
                                    min="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="orderAktifMPJ">Order Kerja</label>
                    <div class="input-group">
                        <div id="orderAktifMPJ" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanWAKG">Afalan WA (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalanWAKG" id="afalanWAKG" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanWALBR">Afalan WA (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalanWALBR" id="afalanWALBR" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanWEKG">Afalan WE (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalanWEKG" id="afalanWEKG" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanWELBR">Afalan WE (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalanWELBR" id="afalanWELBR" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanPotongKG">Afalan Potong (KG)</label>
                            <div class="input-group">
                                <input type="number" name="afalanPotongKG" id="afalanPotongKG" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="afalanPotongLBR">Afalan Potong (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="afalanPotongLBR" id="afalanPotongLBR"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="totalAfalan">Total Afalan (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="totalAfalan" id="totalAfalan" class="form-control"
                                    min="0" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="hasilKotor">Hasil Kotor (LBR)</label>
                            <div class="input-group">
                                <input type="number" name="hasilKotor" id="hasilKotor" class="form-control"
                                    min="0" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.18">
                            <label for="jamKerja">Jam Kerja Total (MNT)</label>
                            <div class="input-group">
                                <input type="number" name="jamKerja" id="jamKerja" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18">
                            <label for="jamIstirahat">Jam Istirahat Total (MNT)</label>
                            <div class="input-group">
                                <input type="number" name="jamIstirahat" id="jamIstirahat" class="form-control"
                                    min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18">
                            <label for="jamGangguanMesin">Jam Gangguan Mesin (MNT)</label>
                            <div class="input-group">
                                <input type="number" name="jamGangguanMesin" id="jamGangguanMesin"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.18">
                            <label for="jamGangguanLain">Jam Gangguan Lain (MNT)</label>
                            <div class="input-group">
                                <input type="number" name="jamGangguanLain" id="jamGangguanLain"
                                    class="form-control" min="0">
                            </div>
                        </div>
                        {{-- <div class="form-group"style="flex: 0.12">
                            <label for="loadTime">Load Time (MNT)</label>
                            <div class="input-group">
                                <input type="number" name="loadTime" id="loadTime" class="form-control"
                                    min="0" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.12">
                            <label for="operationTime">Operating Time (MNT)</label>
                            <div class="input-group">
                                <input type="number" name="operationTime" id="operationTime" class="form-control"
                                    min="0" readonly>
                            </div>
                        </div> --}}
                    </div>
                </div>
                {{-- <div class="py-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 0.2">
                            <label for="rataLembarPerMenit">Kecepatan Rata-Rata Real (LBR/MNT)</label>
                            <div class="input-group">
                                <input type="number" name="rataLembarPerMenit" id="rataLembarPerMenit"
                                    class="form-control" min="0" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.14">
                            <label for="operationTimeRatio">Operating Time Ratio (%)</label>
                            <div class="input-group">
                                <input type="number" name="operationTimeRatio" id="operationTimeRatio"
                                    class="form-control" min="0" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.14">
                            <label for="operationSpeedRatio">Operating Speed Ratio (%)</label>
                            <div class="input-group">
                                <input type="number" name="operationSpeedRatio" id="operationSpeedRatio"
                                    class="form-control" min="0" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.14">
                            <label for="netOperationRatio">Net Operation Ratio (%)</label>
                            <div class="input-group">
                                <input type="number" name="netOperationRatio" id="netOperationRatio"
                                    class="form-control" min="0" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 0.14">
                            <label for="netOperationRatio">Net Operation Ratio (%)</label>
                            <div class="input-group">
                                <input type="number" name="netOperationRatio" id="netOperationRatio"
                                    class="form-control" min="0" readonly>
                            </div>
                        </div>
                    </div>
                </div> --}}
                <div class="py-2" id="div_alasanEditMPJ">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group"style="flex: 1">
                            <label for="alasanEdit">Alasan Edit</label>
                            <div class="input-group">
                                <input type="text" name="alasanEdit" id="alasanEdit" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success" id="button_modalProsesMPJ">Proses</button>
            </div>
        </div>
    </div>
</div>
