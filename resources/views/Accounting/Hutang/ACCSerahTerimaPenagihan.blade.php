@extends('layouts.appAccounting')
@section('content')
@section('title', 'ACC Serah Terima Penagihan')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance ACC Serah Terima Penagihan</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <table class="table">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>ID. Penagihan</th>
                                        <th>Nama Supplier</th>
                                        <th>Jenis Dok.</th>
                                        <th>Sts. Pajak</th>
                                        <th>Mata Uang</th>
                                        <th>Nilai Penagihan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <p>
                            <div class="mb-3">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="checkbox_all" value="option2">
                                    <label class="form-check-label" for="checkbox2">Pilih Semua</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="checkbox2" value="option2">
                                    <label class="form-check-label" for="checkbox2">BATAL Serah Terima</label>
                                </div>
                                <div style="text-align: right;">
                                    <input type="submit" id="btn_proses" name="proses" value="Proses" class="btn btn-success" style="width: 150px">
                                    {{-- <input type="submit" name="keluar" value="Keluar" class="btn btn-primary"> --}}
                                </div>
                            </div>
                        </form>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Hutang/MaintenancePenagihan.js') }}"></script>
@endsection
