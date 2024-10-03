@extends('layouts.appSales')
@section('content')
@section('title', 'ACC SP')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Surat Pesanan Belum ACC Manager</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_SP" class="table table-bordered table-striped SP_datatable" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Nomor SP</th>
                                    <th>Nama Customer </th>
                                    <th>Nama Sales</th>
                                    <th>Tanggal Pesan</th>
                                    {{-- <th>Action</th> --}}
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($data as $item)
                                    <tr>
                                        <td class="RDZPaddingTable RDZCenterTable">
                                            <input type="checkbox" name="selected[]" value="{{ $item->IDSuratPesanan }}">
                                            <a class="DetailSP"
                                                data-id="{{ $item->IDSuratPesanan }}">{{ $item->IDSuratPesanan }}</a>
                                        </td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaCust }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaSales }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">
                                            {{ date('m-d-Y', strtotime($item->Tgl_Pesan)) }}</td>
                                        {{-- <td class="acs-td-button">
                                            <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                                action="{{ url('SuratPesananManager/' . $item->IDSuratPesanan . '/up') }}"
                                                method="POST" enctype="multipart/form-data">
                                                {{ csrf_field() }}
                                                <button type="submit" class="btn btn-sm btn-success"><span>&#x2713;</span>
                                                    Setujui</button>
                                            </form>
                                        </td> --}}
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="checkbox_all" value="option2">
                            <label class="form-check-label" for="checkbox2">Pilih Semua</label>
                        </div>
                        <div class="col" style="gap: 5px; grid-template-columns: auto ;display: grid;">
                            <form onsubmit="return confirm('Apakah Anda Yakin untuk menyetujui semua surat pesanan?');"
                                id="form_submitAll" action="{{ url('/SuratPesananManager/upall') }}" method="POST"
                                enctype="multipart/form-data">
                                {{-- {{ url('/SuratPesananManager/upall') }} --}}
                                {{ csrf_field() }}
                                {{-- <button class="btn btn-sm btn-success" id="button_submitAll"><span>&#x2713;</span>
                                    Setujui Semua</button> --}}
                            </form>
                            <form
                                onsubmit="return confirm('Apakah Anda Yakin untuk menyetujui surat pesanan yang sudah dipilih?');"
                                id="form_submitSelected" action="{{ url('/SuratPesananManager/upall') }}" method="POST"
                                enctype="multipart/form-data">
                                {{-- {{ url('/SuratPesananManager/upall') }} --}}
                                {{ csrf_field() }}
                                <button class="btn btn-sm btn-success" id="button_submitSelected"><span>&#x2713;</span>
                                    Setujui Surat Pesanan yang Dipilih</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function() {
            $('#table_SP').DataTable({
                order: [
                    [0, 'desc']
                ]
            });
        });
    </script>
    <script src="{{ asset('js/Sales/AccManagerSP.js') }}"></script>
@endsection
