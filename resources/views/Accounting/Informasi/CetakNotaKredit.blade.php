@extends('layouts.appAccounting')
@section('content')
@section('title', 'Cetak Nota Kredit')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-7 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Cetak Nota Kredit</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('CetakNotaKredit') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <div class="d-flex">
                                    <div class="col-md-4">
                                        <label for="tanggal">Tanggal</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="date" id="tanggal" name="tanggal" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-4">
                                        <label for="namaCustomerSelect">Customer</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="namaCustomerSelect" name="namaCustomerSelect" class="form-control">

                                        </select>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-4">
                                        <label for="notaKredit">Nota Kredit</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" id="notaKredit" name="notaKredit" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <div class="col-md-5">
                                    <input type="hidden" id="statusPPN" name="statusPPN" class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-5">
                                    <input type="hidden" id="jnsNotaKredit" name="jnsNotaKredit" class="form-control" style="width: 100%">
                                </div>

                                <br><div class="mb-3">
                                    <div class="row">
                                        <div class="col-2">
                                            <input type="submit" id="btnCetak" name="btnCetak" value="Cetak" class="btn btn-primary">
                                        </div>
                                        <div class="col-2">
                                            <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar" class="btn btn-primary">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="{{ asset('js/Informasi/CetakNotaKredit.js') }}"></script>
@endsection
