@extends('layouts.appJumboBag')
@section('title', 'Estimasi Harga')

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <script>
                let successMessage = '';
                let errorMessage = '';
            </script>
            @if (Session::has('success'))
                <script>
                    successMessage = "{{ Session::get('success') }}";
                </script>
            @elseif (Session::has('error'))
                <script>
                    errorMessage = "{{ Session::get('error') }}";
                </script>
            @endif
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Estimasi Harga</div>
                    <div class="card-body">
                        <form id="PermohonanReturForm" action="{{ route('EstimasiHarga.store') }}" method="POST">
                            @csrf
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <div class="form-group">
                                        <label for="customer">Customer</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="id_customer" name="id_customer" required>
                                            <input type="text" class="form-control" style="width: 50%" id="customer" name="customer" required>
                                            <button class="btn" type="button" id="button_customer">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="kodeBarang">Kode Barang</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="tanggal" name="tanggal" required>
                                            <input type="text" class="form-control" style="width: 50%" id="kodeBarangAsal" name="kodeBarangAsal" required>
                                            <button class="btn" type="button" id="button_kodebarang">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <button id="btn_ok" style="width: 100px" class="btn btn-primary mx-2">OK</button>
                                    <button id="btn_clear" style="width: 100px" class="btn btn-warning mx-2">Clear</button>
                                </div>
                            </div>
                            <div>
                                <table id="tabel" class="table">
                                    <thead>
                                        <tr>
                                            <th>Kode Komponen</th>
                                            <th>Nama Komponen</th>
                                            <th>Berat</th>
                                            <th>Index</th>
                                            <th>Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-flex align-items-start">
                                <div class="me-4">
                                    <label for="space" style="visibility: hidden;">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</label>
                                    <label id="keterangan" for="text"></label>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="form-group">
                                        <label for="berat_total">Berat Total</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="berat_total" name="berat_total" required>
                                            <label for="space" style="visibility: hidden;">AA</label>
                                            <button id="btn_hitung" style="width: 130px" class="btn btn-success">Hitung Harga</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="harga_material">Harga Material</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="harga_material" name="harga_material" required>
                                        </div>
                                    </div>
                                    <div class="form-group d-flex flex-column align-items-left">
                                        <label for="jumlah_order" class="mb-2">Ongkos Kerja (No PPN) / Menit</label>
                                        <div class="d-flex align-items-center">
                                            <input type="text" style="width: 100%" class="form-control me-1" id="ongkos1" name="ongkos1" required>
                                            <p class="mb-0 mx-1">&nbsp;x&nbsp;</p>
                                            <input type="text" style="width: 100%" class="form-control me-1" id="ongkos2" name="ongkos2" required>
                                            <p class="mb-0 mx-1">&nbsp;=&nbsp;</p>
                                            <input type="text" style="width: 100%" class="form-control" id="ongkos3" name="ongkos3" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="total_harga">Total Harga</label>
                                        <input type="text" class="form-control" id="total_harga" name="total_harga" required>
                                    </div>
                                </div>
                            </div>


                            {{-- <div class="d-flex justify-content-between">
                                <div>
                                    <button id="btn_isi" style="width: 100px" class="btn btn-primary">Isi</button>
                                    <button id="btn_koreksi" style="width: 100px"class="btn btn-warning">Koreksi</button>
                                    <button id="btn_hapus" style="width: 100px"class="btn btn-danger">Hapus</button>
                                </div>
                                <div>
                                    <button id="btn_proses" style="width: 100px"class="btn btn-success">Proses</button>
                                    <button id="btn_batal" style="width: 100px"class="btn">Batal</button>
                                </div>
                            </div> --}}
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/EstimasiHarga.js') }}"></script>
@endsection
