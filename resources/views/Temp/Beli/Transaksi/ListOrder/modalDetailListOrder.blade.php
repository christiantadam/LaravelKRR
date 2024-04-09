<div class="modal fade" id="modalDetail_ListOrder">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="judul_ListOrder"></h5>
            </div>
            <div class="panel-body">
                <div id="loading_ListOrder">
                    <br>
                    <div class="loader" style="text-align: center;margin-left: 35%;"></div>
                    <br>
                </div>
                <div class="modal-body" id="DivDetailData_ListOrder">
                    <p class="RDZCard" id="NamaBarang_ListOrder"
                        onclick="Detail('Kategori_Barang','iconKategoriBarang');"></p>
                    <div id="Kategori_Barang" style="display: none;border: 1px solid;padding-left: 10px">
                        <p class="RDZCard2" id="KategoriUtama_ListOrder"></p>
                        <p class="RDZCard2" id="Kategori_ListOrder"></p>
                        <p class="RDZCard2" id="SubKategori_ListOrder"></p>
                    </div>
                    <p class="RDZCard" id="Qty_ListOrder"></p>
                    <p class="RDZCard" id="ketOrder_ListOrder"></p>
                    <p class="RDZCard" id="ketInternal_ListOrder"></p>
                    <p class="RDZCard" id="Divisi_ListOrder"></p>
                    <p class="RDZCard" id="Pemesan_ListOrder"></p>
                    <p class="RDZCard" id="Status_ListOrder"></p>
                    <p class="RDZCard" id="TglButuh_ListOrder"></p>
                    <p class="RDZCard" id="AccManager_ListOrder"></p>
                    <p class="RDZCard" id="Offered_ListOrder"></p>
                    <p class="RDZCard" id="Supplier_ListOrder"></p>

                    <p class="RDZCard" id="Total_ListOrder" onclick="Detail('Detail_Harga','iconHarga');"></p>
                    <div id="Detail_Harga" style="display: none;border: 1px solid;padding-left: 10px">
                        <p class="RDZCard2" id="Harga_ListOrder"></p>
                        <p class="RDZCard2" id="Subtotal_ListOrder"></p>
                        <p class="RDZCard2" id="PPN_ListOrder"></p>
                    </div>
                    <button type="button" class="btn btn-sm btn-default RDZButtonCard" data-dismiss="modal"
                        style="background-color:gray;color: white;">Tutup</button>
                </div>
            </div>
        </div>
    </div>
</div>
