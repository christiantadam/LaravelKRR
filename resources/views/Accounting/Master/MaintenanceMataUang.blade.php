@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Mata Uang')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance MataUang</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('MaintenanceMataUang') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="row">
                                    <div class="col-md-4">
                                        <label for="idMataUang">Id Mata Uang </label>
                                    </div>
                                    <div class="col-md-7">
                                        <select name="nama_select" id="idMataUang" name="idMataUang" class="form-control">
                                            <option disabled selected>-- Pilih Id. Mata Uang --</option>
                                            @foreach ($maintenanceMataUang as $mmu)
                                            <option value="{{ $mmu->Id_MataUang }}">{{ $mmu->Id_MataUang }} | {{ $mmu->Nama_MataUang }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <p><div class="row">
                                    <div class="col-md-4">
                                        <label for="namaMataUang">Nama Mata Uang </label>
                                    </div>
                                    <div class="col-md-7">
                                        <input type="text" id="namaMataUang" name="namaMataUang" class="form-control">
                                    </div>
                                </div>
                                <p><div class="row">
                                    <div class="col-md-4">
                                        <label for="symbol">Symbol </label>
                                    </div>
                                    <div class="col-md-7">
                                        <input type="text" id="symbol" name="symbol" class="form-control">
                                    </div>
                                </div>

                                <br>
                                <div class="row">
                                    <input type="submit" name="isi" id="btnIsi" value="Isi" class="btn btn-primary" onclick="clickIsi()">
                                    <input type="submit" name="koreksi" id="btnKoreksi" value="Koreksi" class="btn btn-warning" onclick="clickKoreksi()">
                                    <input type="submit" name="hapus" id="btnHapus" value="Hapus" class="btn btn-danger" onclick="clickHapus()">
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
<script src="{{ asset('js/Master/MaintenanceMataUang.js') }}"></script>
@endsection
