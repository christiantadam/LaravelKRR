@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Maintenance Divisi')
@if (Session::has('success'))
    <div class="alert alert-success">
        {{ Session::get('success') }}
    </div>
@elseif (Session::has('error'))
    <div class="alert alert-danger">
        {{ Session::get('error') }}
    </div>
@endif
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">
                    Maintenance Divisi
                </div>
                <div class="card-body">
                    <form id="maintenanceDivisi" action="{{ url('MaintenanceDivisi') }}" method="POST">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method" id="methodForm">
                        <div class="row">
                            <div class="col-lg-2">
                                <span class="custom-alignment">Kode Divisi:</span>
                            </div>

                            <div class="col-lg-4">
                                <select class="form-select" name="KodeDivisi"
                                    style="width: 36vh;
                                height: 6vh;" id="kddivisi">
                                    <option disabled selected>Pilih Divisi</option>
                                    @foreach ($divisi as $d)
                                        <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi }} -- {{ $d->NamaDivisi }}
                                        </option>
                                    @endforeach
                                </select>
                                <input type="text" name="IdDivisi" class="form-control" id="IdDivisi"
                                    style="display: none" maxlength="3">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-2">
                                <span class="custom-alignment">Nama Divisi:</span>
                            </div>

                            <div class="col-lg-6">
                                <input type="text" name="nama_divisi" class="form-control" id="NamaDivisi" readonly>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-lg-8" style="text-align-last: center;">
                                <div class="justify-content-center">
                                    <button type="button" class="btn btn-success custom-btn" id="isi"
                                        onclick="Isidiklik()"><u>I</u>SI</button>
                                    <button type="button" class="btn btn-warning custom-btn" id="koreksi"
                                        onclick="koreksidiklik()"><u>K</u>OREKSI</button>
                                    <button type="button" class="btn btn-danger custom-btn" id="hapus"
                                        onclick="hapusdiklik()"><u>H</u>APUS</button>
                                    <button type="button" class="btn btn-danger custom-btn" id="batal"
                                        style="display: none" onclick="bataldiklik()"><u>B</u>atal</button>
                                    <button type="button" class="btn btn-primary custom-btn" id="proses"
                                        onclick="prosesdiklik()"><u>P</u>ROSES</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="{{ asset('js/Andre-WorkShop/Workshop/MaintenanceDivisi.js') }}"></script>
@endsection
