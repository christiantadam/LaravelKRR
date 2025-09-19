@extends('layouts.appABM')
@section('content')
@section('title', 'Order Kerja Aktif Pada Mesin')
<style>
    .input-error {
        outline: 1px solid red;
        text-decoration-color: red;
    }
</style>
{{-- <link href="{{ asset('css/ABM/OrderKerjaYangAktifPadaMesin.css') }}" rel="stylesheet"> --}}
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            {{-- button untuk munculin create Order Kerja --}}
            {{-- <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahOrderKerja" type="button">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Order Kerja</div>
            </button> --}}
            <div class="card">
                <div class="card-header">Daftar Order Kerja Pada Mesin</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="card border-dark p-2 mb-3">
                        <div class="p-2">
                            <div class="d-flex" style="gap: 0.5%;width: 100%">
                                <div class="form-group"style="flex: 0.5">
                                    <label for="typeMesin">Type Mesin</label>
                                    <div class="input-group">
                                        <select name="typeMesin" id="typeMesin" class="form-control"disabled>
                                            <option disabled selected>-- Pilih Type Mesin --</option>
                                            @foreach ($listTypeMesin as $list)
                                                <option value="{{ $list->Id_Type_Mesin }}">{{ $list->Type_Mesin }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group"style="flex: 0.5">
                                    <label for="namaMesin">Nama Mesin</label>
                                    <div class="input-group">
                                        <select name="namaMesin" id="namaMesin" class="form-control"disabled>
                                            <option disabled selected>-- Pilih Mesin --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <label for="orderLama">Order Lama</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="orderLama" name="orderLama" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="orderBaru">Order Baru</label>
                            <div class="input-group">
                                <select name="orderBaru" id="orderBaru" class="form-control" disabled>
                                    <option disabled selected>-- Pilih Order --</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-primary" type="button" id="button_koreksi">Koreksi</button>
                            <button class="btn btn-success" type="button" id="button_proses" disabled>Proses</button>
                        </div>
                    </div>
                    <table id="table_mesinOrderKerja" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Nama Mesin</th>
                                <th>Nomor OK</th>
                                <th>Nama Barang</th>
                                {{-- <th>Action</th> --}}
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/ABM/Transaksi/OrderKerjaYangAktifPadaMesin.js') }}"></script>
@endsection
