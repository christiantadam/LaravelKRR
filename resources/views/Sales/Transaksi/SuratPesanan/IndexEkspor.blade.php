@extends('layouts.appSales') @section('content')
    @include('Sales.Transaksi.SuratPesanan.DetailSP') {{-- <script type="text/javascript"> $(function() { var table = $('.SP_datatable').DataTable({ processing: true, serverSide: true, ajax: "{{ url('SuratPesanan') }}", column: [{ data: 'IDSuratPesanan', name: 'IDSuratPesanan' }, { data: 'NamaCust', name: 'NamaCust' }, { data: 'JnsSuratPesanan', name: 'JnsSuratPesanan' }, { data: 'Tgl_Pesan', name: 'Tgl_Pesan' }, { data: 'action', name: 'action', orderable: false, searchable: false }, ] }); }); </script> --}} {{-- <script> $(document).ready(function() { $('#search-btn').click(function() { var search = $('#search').val(); $.ajax({ url: 'SuratPesanan', type: 'GET', data: { search: search }, success: function(data) { $('#data').html(data); } }); }); }); </script> --}}
    <script>
        $(document).ready(function() {
            // var dataArray = @json($data);
            // console.log(dataArray.data);
            $('#table_SP').DataTable({
                processing: true,
                serverSide: true,
                "ajax": {
                    "url": "{{ url('spekspor') }}",
                    "dataType": "json",
                    "type": "POST",
                    "data": {
                        _token: "{{ csrf_token() }}"
                    }
                },
                "columns": [{
                        "data": "IDSuratPesanan"
                    },
                    {
                        "data": "NamaCust"
                    },
                    {
                        "data": "Tgl_Pesan"
                    }
                ]
            });
        });
    </script>
    <link href="{{ asset('css/permohonan-s-p.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('SuratPesanan/create')">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah SP</div>
                </button>
                <div class="card">
                    <div class="card-header">Surat Pesanan Belum ACC Manager</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="mb-2">
                            <label for="search">Search:</label>
                            <input type="text" id="search" class="form-control" placeholder="Search...">
                        </div>
                        <table id="table_SP" class="table table-bordered table-striped SP_datatable" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Nomor SP</th>
                                    <th>Nama Customer</th>
                                    <th>Tanggal Pesan</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
