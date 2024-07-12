@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Status Supplier')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Status Supplier</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('MaintenanceStatusSupplier') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div>
                                    <table style="width: 100%" id="tabelStatusSupplier" name="tabelStatusSupplier">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>id. Supp</th>
                                            <th>Nama Supplier</th>
                                            <th>Saldo</th>
                                            <th>Saldo Rp</th>
                                            <th>Jns Supp</th>
                                            <th>Jns Bayar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                    </table>
                                </div>

                                <p><div class="container fluid">
                                    <p><div class="row">
                                        <div class="col-md-2 ">
                                            <label for="idSupplier">ID/Nm.Supplier</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="idSupplier" id="idSupplier" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" name="namaSupplier" id="namaSupplier" class="form-control" style="width: 100%">
                                        </div>
                                        <div>
                                            <select id="idMataUang" name="idMataUang" class="form-control">
                                                {{-- <option disabled selected>-- Pilih Id/Nm. Supp --</option>
                                                @foreach ($maintenanceStatusSupplier as $mss)
                                                <option value="{{ $mss->NO_SUP }}">{{ $mss->NO_SUP }} | {{ $mss->NM_SUP }}</option>
                                                @endforeach --}}
                                            </select>
                                        </div>
                                    </div>

                                    <p><div class="row" onchange="fillColumns()">
                                        <div class="col-md-2">
                                            <label for="id" >Jenis Supplier</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="idJenisSupplier" id="idJenisSupplier" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" name="namaJenisSupplier" id="namaJenisSupplier" class="form-control" style="width: 100%">
                                        </div>
                                    </div>

                                    <p><div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Jenis Bayar</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="jenisbayar" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-6">
                                            <h6>[H] -- Hutang</h6>
                                            <h6>[T] -- Tunai</h6>
                                            <h6>[A] -- Angkutan</h6>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-1">
                                            <input type="submit" name="isi" value="Isi" id="btnIsi" class="btn btn-primary">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="koreksi" value="Koreksi" id="btnKoreksi" class="btn btn-warning" onclick="clickKoreksi()">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="proses" value="Proses" id="btnProses" class="btn btn-success" style="display: none" onclick="clickKoreksi()">
                                        </div>
                                        <div class="col-9">
                                            <input type="submit" name="batal" id="btnBatal" value="Batal" class="btn btn-danger d-flex ml-auto" style="display: none" onclick="clickBatal()">
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
<script src="{{ asset('js/Master/MaintenanceStatusSupplier.js') }}"></script>
@endsection
