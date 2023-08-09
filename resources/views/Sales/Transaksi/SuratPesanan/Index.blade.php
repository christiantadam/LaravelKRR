@extends('layouts.appSales') @section('content')
    @include('Sales.Transaksi.SuratPesanan.DetailSP') {{-- <script type="text/javascript"> $(function() { var table = $('.SP_datatable').DataTable({ processing: true, serverSide: true, ajax: "{{ url('SuratPesanan') }}", column: [{ data: 'IDSuratPesanan', name: 'IDSuratPesanan' }, { data: 'NamaCust', name: 'NamaCust' }, { data: 'JnsSuratPesanan', name: 'JnsSuratPesanan' }, { data: 'Tgl_Pesan', name: 'Tgl_Pesan' }, { data: 'action', name: 'action', orderable: false, searchable: false }, ] }); }); </script> --}} {{-- <script> $(document).ready(function() { $('#search-btn').click(function() { var search = $('#search').val(); $.ajax({ url: 'SuratPesanan', type: 'GET', data: { search: search }, success: function(data) { $('#data').html(data); } }); }); }); </script> --}}
    <script>
        $(document).ready(function() {
            $('#table_SP').DataTable({
                order: [
                    [0, 'desc']
                ],
            });
        });
    </script>
    <link href="{{ asset('css/permohonan-s-p.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0"> {{-- button untuk munculin create billing --}} <button
                    class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('SuratPesanan/create')">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah SP</div>
                </button>
                <div class="card"> {{-- @if (Auth::user()->status == 1) --}} <div class="card-header">Surat Pesanan Belum ACC Manager</div>
                    {{-- <form> <select id="pagination"> <option value="5" @if ($items == 5) selected @endif>5</option> <option value="10" @if ($items == 10) selected @endif>10</option> <option value="25" @if ($items == 25) selected @endif>25</option> </select> </form> <form action="{{ route('suratpesanan.index') }}" method="get"> <div> <input type="text" name="search" class="" placeholder="Search" value="{{ request('search') }}"> </div> --}} {{-- <div> <select name="per_page" class=""> <option value="10" {{ request('per_page', 10) == 10 ? 'selected' : '' }}>10 per page </option> <option value="20" {{ request('per_page', 20) == 20 ? 'selected' : '' }}>20 per page </option> <option value="50" {{ request('per_page', 50) == 50 ? 'selected' : '' }}>50 per page </option> </select> </div> --}} {{-- <button type="submit" class="btn btn-primary"> <span class="material-symbols-outlined">search</span> </button> </form> --}} {{-- <form> <input type="text" id="search"> <button type="button" id="search-btn"> <span class="material-symbols-outlined">search</span> </button> </form> --}}
                    {{-- @else <div class="card-header">Home</div> @endif --}} <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_SP" class="table table-bordered table-striped SP_datatable" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Nomor SP</th>
                                    <th>Nama Customer</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </table> {{-- <div>{{ $data->links('pagination::bootstrap-5') }}</div> --}} {{-- ->appends($request->except('page')) --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
