@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Bank')

@include('Accounting.Master.ModalMaintenanceBank')
<style>
    .custom-modal-width {
        max-width: 90%; /* Adjust the percentage as needed */
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#modalBank"
                id="tambahButtonBank" type="button">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Bank</div>
            </button>
            <div class="card">
                <div class="card-header">Maintenance Bank</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div style="overflow: auto;">
                        <table id="table_Bank" class="table table-bordered" style="width:100%;white-space: nowrap;">
                            <thead class="table-primary">
                                <tr>
                                    <th>Id Bank</th>
                                    <th>Nama Bank </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                {{-- <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('MaintenanceBank') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div style="display: flex;flex-direction:row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="idBank" style="width: 51%">Id. Bank</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" style="width: 100%"
                                                id="idBank" name="idBank">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="namaBank" style="width: 51%">Nama Bank</label>
                                        <div class="input-group">
                                            <select id="namaBankselect" name="namaBankselect" class="form-control"
                                                style="width: 400px;" disabled>
                                                <option disabled selected>-- Pilih Bank --</option>
                                                @foreach ($maintenanceBank as $mb)
                                                    <option value="{{ $mb->Id_Bank }}">{{ $mb->Nama_Bank }}</option>
                                                @endforeach
                                            </select>
                                            <input type="text" id="isiNamaBank" name="isiNamaBank"
                                                style="display: none;" class="form-control" id="isiNamaBank">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="idBank" style="width: 51%">Id. Bank</label>
                                        <div>
                                            <div class="col-auto">
                                                <input type="radio" name="jenisBankSelect" value="E"
                                                    id="jenisBankSelect">Eksterent
                                            </div>
                                            <div class="col-auto">
                                                <input type="radio" name="jenisBankSelect" value="I"
                                                    id="jenisBankSelect">Interent
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="statusAktif" style="width: 51%">Status Aktif</label>
                                        <div class="input-group">
                                            <input type="checkbox" name="statusAktif" id="statusAktif" disabled>Aktif
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="kodePerkiraanSelect" style="width: 100%;">Kode Perkiraan</label>
                                        <div class="input-group" style="display: flex; align-items: center;">
                                            <input type="hidden" id="ketKodePerkiraan" name="ketKodePerkiraan"
                                                class="form-control">
                                            <select name="kodePerkiraanSelect" id="kodePerkiraanSelect"
                                                class="custom-select" style="width: auto">

                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="noRekening" style="width: 51%">No. Rekening</label>
                                        <div class="input-group">
                                            <input type="text" name="noRekening" id="noRekening" class="form-control"
                                                disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="saldoBank" style="width: 51%">Saldo Bank</label>
                                        <div class="input-group">
                                            <input type="text" name="saldoBank" id="saldoBank" class="form-control"
                                                disabled>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="alamat" style="width: 51%">Alamat</label>
                                        <div class="input-group">
                                            <input type="text" name="alamat" id="alamat" class="form-control"
                                                disabled>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="kota" style="width: 51%">Kota</label>
                                        <div class="input-group">
                                            <input type="text" name="kota" id="kota" class="form-control"
                                                disabled>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="telp" style="width: 51%">Telp</label>
                                        <div class="input-group">
                                            <input type="text" name="telp" id="telp" class="form-control"
                                                disabled>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="person" style="width: 51%">Person</label>
                                        <div class="input-group">
                                            <input type="text" name="person" id="person" class="form-control"
                                                disabled>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="hp" style="width: 51%">HP</label>
                                        <div class="input-group">
                                            <input type="text" name="hp" id="hp" class="form-control"
                                                disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex">
                                <input type="submit" name="isi" id="btnIsi" value="Isi"
                                    class="btn btn-primary" onclick="clickIsi()">
                                <input type="submit" name="koreksi" id="btnKoreksi" value="Koreksi"
                                    class="btn btn-warning" onclick="clickKoreksi()">
                                <input type="submit" name="hapus" id="btnHapus" value="Hapus"
                                    class="btn btn-danger" onclick="clickHapus()">
                                <input type="submit" name="proses" id="btnProses" value="Proses"
                                    class="btn btn-success" disabled>
                                <input type="submit" name="batal" id="btnBatal" value="Batal"
                                    class="btn btn-danger" style="display: none" onclick="clickBatal()">
                            </div>
                        </form>
                    </div>
                </div> --}}
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Master/MaintenanceBank.js') }}"></script>
@endsection
