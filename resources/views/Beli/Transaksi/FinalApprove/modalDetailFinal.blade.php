<div class="modal fade" id="modalFinalApprove" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog" style="max-width: 60%">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelFinalApprove">Detail No. Trans</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span>x</span>
                </button>
            </div>
            <div class="modal-body">
                <div style="display:flex; flex-direction: row; gap: 5px">
                    <div style="flex-direction: column; width: 50%;">
                        <div class="form-group">
                            <label for="final_namaBarang">Nama Barang</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_namaBarang" name="final_namaBarang"
                                    readonly>
                            </div>
                        </div>
                        <button class="btn btn-info" id="final_btnShowDetail">Show Kategori Barang</button>
                        <!-- Tombol di halaman utama -->
                        <button type="button" class="btn btn-warning" id="btnDownloadAttachment">
                            Download Attachment
                        </button>

                        <!-- Modal Preview Dokumentasi -->
                        <div class="modal fade" id="modalDokumentasi" tabindex="-1" style="padding-top: 10px;">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h5 class="modal-title">Dokumentasi</h5>
                                    </div>

                                    <div class="modal-body text-center">
                                        <iframe id="dok_preview" style="width:100%; height:500px; display:none;"></iframe>
                                        <div id="dok_keterangan" style="display:none;"></div>
                                    </div>

                                    <div class="modal-footer">
                                        <a id="btnDownloadPreview" class="btn btn-primary" target="_blank">
                                            Download
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div id="final_detailBarang" class="mt-2"
                            style="display:none;border: 1px solid black;padding-left: 10px">
                            <p class="RDZCard2" id="final_kategoriUtama"></p>
                            <p class="RDZCard2" id="final_kategori"></p>
                            <p class="RDZCard2" id="final_subKategori"></p>
                        </div>
                        <div class="form-group mt-4">
                            <label for="final_pembelianTerakhir">Pembelian Terakhir</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_pembelianTerakhir"
                                    name="final_pembelianTerakhir" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_supplier">Supplier</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_supplier" name="final_supplier"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_hargaUnit">Harga Unit</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_hargaUnit" name="final_hargaUnit"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_total">Total</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_total" name="final_total" readonly>
                            </div>
                        </div>
                    </div>
                    <div style="flex-direction: column; width: 50%;">
                        <div class="form-group">
                            <label for="final_qtyOrder">Qty. Order</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_qtyOrder" name="final_qtyOrder"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_divisi">Divisi</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_divisi" name="final_divisi"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_user">User</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_user" name="final_user" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_status">Status</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_status" name="final_status"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_diskon">Diskon</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_diskon" name="final_diskon"
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="final_ppn">PPN</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="final_ppn" name="final_ppn" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="final_ketOrder">Ket. Order</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="final_ketOrder"
                            name="final_ketOrder"readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="final_ketInternal">Ket. Internal</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="final_ketInternal" name="final_ketInternal"
                            readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    window.dokumentasiBase64 = @json($dokumentasi ?? null);
    window.dokumentasiExt = @json($ext ?? null);
</script>
