@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Nomor Gambar')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">
                    Informasi Nomor Gambar
                </div>
                <div class="card-body">
                    <form action="#">
                        <div class="row">
                            <div class="col-lg-2">
                                <span class="custom-alignment">Kode Barang:</span>
                            </div>
                            <div class="col-lg-3">
                                <input type="text" name="kd_barang" class="form-control" id="kd_barang">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-2">
                                <span class="custom-alignment">Nama Barang:</span>
                            </div>
                            <div class="col-lg-8">
                                <input type="text" name="nama_barang" class="form-control" id="nama_barang">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-2">
                                <span class="custom-alignment">No. Barang:</span>
                            </div>
                            <div class="col-lg-3">
                                <input type="text" name="no_barang" class="form-control" id="no_barang">
                            </div>
                        </div>

                        {{-- <div class="float-end">
                            <button type="button" class="btn btn-primary" disabled id="btnproses"><u>P</u>ROSES</button>
                        </div> --}}
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Andre-WorkShop/Workshop/Informasi/NomorGambar.js') }}"></script>

@endsection
