@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Bank')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Bank</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('MaintenanceBank') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="idBank">Id. Bank</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="idBank" name="idBank" class="form-control" style="width: 100%" disabled>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="namaBank">Nama Bank</label>
                                    </div>
                                    <div class="col-md-3">
                                        <select id="namaBankselect" name="namaBankselect" class="form-control" style="width: 400px;" disabled>
                                            <option disabled selected>-- Pilih Bank --</option>
                                            @foreach ($maintenanceBank as $mb)
                                            <option value="{{ $mb->Id_Bank }}">{{ $mb->Nama_Bank }}</option>
                                            @endforeach
                                        </select>
                                        <input type="text" id="isiNamaBank" name="isiNamaBank" style="display: none;" class="form-control" id="isiNamaBank">
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="jenisBankSelect" >Jenis Bank </label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" name="jenisBankSelect" value="I" id="jenisBankSelect">
                                        <label for="jenisBankSelect">Interent</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="radio" name="jenisBankSelect" value="E" id="jenisBankSelect">
                                        <label for="jenisBankSelect">Eksterent</label>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="statusAktif">Status Aktif</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="checkbox" name="statusAktif" id="statusAktif" disabled>
                                        <label for="checkbox">Aktif</label>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="kodePerkiraanSelect">Kode Perkiraan </label>
                                    </div>
                                    <div class="col-md-2" style="padding-right: 20px">
                                        <input type="text" id="ketKodePerkiraan" name="ketKodePerkiraan" class="form-control" style="width: 100%" disabled>
                                    </div>
                                    <div class="col-md-4">
                                        <select name="kodePerkiraanSelect" id="kodePerkiraanSelect" class="form-control" disabled>

                                        </select>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="noRekening">No Rekening </label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" name="norekening" id="noRekening" class="form-control" style="width: 100%" disabled>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="saldoBank">Saldo Bank </label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" name="saldoBank" id="saldoBank" class="form-control" style="width: 100%" disabled>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="alamat">Alamat </label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" name="alamat" id="alamat" class="form-control" style="width: 100%" disabled>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="kota">Kota </label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" name="kota" id="kota" class="form-control" style="width: 100%" disabled>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="telp">Telp </label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" name="telp" id="telp" class="form-control" style="width: 100%" disabled>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="person">Person </label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" name="person" id="person" class="form-control" style="width: 100%" disabled>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="hp">HP </label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="hp" name="hp" id="hp" class="form-control" style="width: 100%" disabled>
                                    </div>
                                </div>
                                <p><br><div class="d-flex">
                                    <input type="submit" name="isi" id="btnIsi" value="Isi" class="btn btn-primary" onclick="clickIsi()">
                                    <input type="submit" name="koreksi" id="btnKoreksi" value="Koreksi" class="btn btn-warning" onclick="clickKoreksi()">
                                    <input type="submit" name="hapus"  id="btnHapus" value="Hapus" class="btn btn-danger" onclick="clickHapus()">
                                    <input type="submit" name="proses" id="btnProses" value="Proses" class="btn btn-success" disabled>
                                    <input type="submit" name="batal" id="btnBatal" value="Batal" class="btn btn-danger" style="display: none" onclick="clickBatal()">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Master/MaintenanceBank.js') }}"></script>
@endsection



