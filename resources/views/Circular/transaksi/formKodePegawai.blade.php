@extends('Circular.layouts.app')

@section('title')
    Maintenance Kode Pegawai
@endsection

@section('content')
    {{-- <div class="card mb-3"> --}}
        {{-- <div class="card-header">
            Maintenance Order
        </div> --}}

        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-12 RDZMobilePaddingLR0">
                    <div class="card">
                        <div class="card-header">Maintenance Kode Pegawai</div>
                        <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                            <div class="form-container col-md-12">
                                <form method="POST" action="">
                                    @csrf
                                    <div class="d-flex">
                                        <div class="col-md-1">
                                            <label for="tanggal">Tanggal</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="date" id="tanggal" class="form-control"
                                                style="width: 100%">
                                        </div>
                                        {{-- <div class="col-md-1">
                                            <button id="btnBrowse" class="btn btn-primary form-control">...</button>
                                        </div> --}}
                                    </div>
                                    <br>
                                    <table class="table" style="overflow-x: auto;" id="tableatas">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>ID. Bayar</th>
                                                <th>ID. TT</th>
                                                <th>Bank</th>
                                                <th>Nama Supplier</th>
                                                <th>Rincian Pembayaran</th>
                                                <th>Nilai Bayar</th>
                                                <th>Jenis Bayar</th>
                                                <th>Mata Uang</th>
                                                <th>Jumlah Bayar</th>
                                                <th>Mata Uang PO</th>
                                                <th>ID. Jenis Bayar</th>
                                                <th>ID. Mata Uang</th>
                                                <th>ID. Supplier</th>
                                                <th>Jenis Bank</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>

                                    <br>
                                    <div class="row">
                                        <div class="col">
                                            <div class="d-flex">
                                                <button class="btn" type="button" id="btn_group">Group BKK</button>
                                                <p>&nbsp;</p>
                                                <button class="btn" type="button" id="btn_refresh">Refresh BKK</button>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="d-flex">
                                                <button class="btn" type="button" id="btn_tampil">Tampil BKK</button>
                                                <div class="col-md-3 ml-auto">
                                                    <label for="id">ID. Pembayaran</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input id="id_pembayaran" type="text" name="id_pembayaran"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style="height:2px;">
                                    <div class="card-container" style="display: flex;">
                                        <div class="card" style="width: 50%;">
                                            <div class="card-body">
                                                <div class="col">
                                                    <div class="d-flex">
                                                        <div>
                                                            <input type="radio" name="radiogrup" value="radio_1"
                                                                id="radio_1">
                                                            <label for="radio_1">Detail BG/CEK/TRANSFER</label>
                                                        </div>
                                                        <div class="col-md-2 ml-auto">
                                                            <label for="id">ID. Detail</label>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <input id="id_detailkiri" type="text" name="id_detailkiri"
                                                                class="form-control" style="width: 100%">
                                                            <input id="bg_b" type="text" name="bg_b"
                                                                class="form-control" style="width: 100%; display: none">
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                                <div style="overflow-x: auto;">
                                                    <table style="width: 150%; table-layout: fixed;" id="tablekiri">
                                                        <colgroup>
                                                            <col style="width: 20%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                        </colgroup>
                                                        <thead class="table-dark">
                                                            <tr>
                                                                <th>ID. Detail</th>
                                                                <th>No. BG/CEK/TRANSFER</th>
                                                                <th>Jatuh Tempo</th>
                                                                <th>Cetak</th>
                                                                <th>ID. Bayar</th>
                                                                <th>Jumlah</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <!--CARD 2-->
                                        <div class="card" style="width: 50%;">
                                            <div class="card-body">
                                                <div class="col">
                                                    <div class="d-flex">
                                                        <div>
                                                            <input type="radio" name="radiogrup" value="radio_2"
                                                                id="radio_2">
                                                            <label for="radio_2">Detail PEMBAYARAN</label>
                                                        </div>
                                                        <div class="col-md-2 ml-auto">
                                                            <label for="id">ID. Detail</label>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <input id="id_detailkanan" type="text" name="id_detailkanan"
                                                                class="form-control" style="width: 100%">
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                                <div style="overflow-x: auto;">
                                                    <table style="width: 200%;" id="tablekanan">
                                                        {{-- <colgroup>
                                                            <col style="width: 20%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                            <col style="width: 25%;">
                                                        </colgroup> --}}
                                                        <thead class="table-dark">
                                                            <tr>
                                                                <th>ID. Detail</th>
                                                                <th>Rincian Bayar</th>
                                                                <th>Nilai Rincian</th>
                                                                <th>Kode Perkiraan</th>
                                                                <th>No BG</th>
                                                                <th>ID. Pembayaran</th>
                                                                <th>Keterangan</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr style="height:2px;">
                                    <div class="mb-3 d-flex justify-content-between">
                                        {{-- <button class="btn btn-primary" id="btn_isi" style="width: 130px">Isi</button>
                                        <button class="btn btn-warning" id="btn_koreksi"
                                            style="width: 130px">Koreksi</button>
                                        <button class="btn btn-danger" id="btn_hapus" style="width: 130px">Hapus</button> --}}
                                        <button class="btn btn-success" id="btn_proses" style="width: 130px">Simpan</button>
                                        <button class="btn btn-danger" id="btn_batal"
                                            style="width: 130px; margin-left: auto;">Batal</button>
                                    </div>

                                </form>
                                <br>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
@endsection

{{-- @section('custom_js')
    <script>
        const url_IdOrder = "{{ url('/pagination/get-id-order') }}";
        const url_KodeBarang = "{{ url('/pagination/get-barang') }}";
        const url_BenangWarp = "{{ url('/pagination/get-benang-warp') }}";
        const url_BenangStrip = "{{ url('/pagination/get-benang-strip') }}";
    </script>

    <script src="{{ asset('js/Circular/transaksi/orderMaster.js') }}"></script>
    @include('Circular/transaksi/modalBenang')
@endsection --}}
