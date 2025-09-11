@extends('Circular.layouts.app')

@section('title')
    Kegiatan Mesin Per Hari
@endsection

@section('content')
    <style>
        label {
            text-align: end;
        }
    </style>

    <div class="card mb-3">
        <div class="card-header">
            Kegiatan Mesin per Hari
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <div class="row">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="tanggal">Tanggal</label>
                </div>

                <div class="col-md-2">
                    <input type="date" id="tanggal1" class="form-control form-control-sm" disabled>
                </div>

                <div class="col-md-2">
                    <input type="date" id="tanggal2" class="form-control form-control-sm" style="display: none"
                        disabled>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="id_log">ID Log</label>
                </div>

                <div class="col-md-10">
                    <select id="id_log" class="form-select form-select-sm" disabled>
                        <option></option>
                    </select>
                </div>

                <div class="col-md-1">
                    <input type="hidden" id="id_type_mesin" class="form-control form-control-sm" disabled>
                </div>

                <div class="col-md-1">
                    <input type="hidden" id="id_mesin" class="form-control form-control-sm" disabled>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="status_log">Status Log Mesin</label>
                </div>

                <div class="col-md-4">
                    <select id="status_log" class="form-select form-select-sm" disabled>
                        <option></option>
                        @foreach ($listStatusLog as $d)
                            <option value="{{ $d->id_status }}">
                                {{ $d->id_status . ' | ' . $d->Keterangan }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="type_mesin">Type Mesin</label>
                </div>

                <div class="col-md-4">
                    <select id="type_mesin" class="form-select form-select-sm" disabled>
                        <option></option>
                        @foreach ($listTypeMesin as $d)
                            <option value="{{ $d->IdType_Mesin }}">
                                {{ $d->IdType_Mesin . ' | ' . $d->Type_Mesin }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-3">
                    <select id="nama_mesin" class="form-select form-select-sm" disabled>
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="id_order">Nama Order</label>
                </div>

                <div class="col-md-9">
                    <div class="input-group input-group-sm">
                        <input type="text" id="id_order" class="form-control" style="width: 10%" disabled>
                        <input type="text" id="nama_order" class="form-control" style="width: 90%" disabled>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="shift">Shift</label>
                </div>

                <div class="col-md-2">
                    <select id="shift" class="form-select form-select-sm" disabled>
                        <option></option>
                        <option value="P">P | Pagi</option>
                        <option value="S">S | Sore</option>
                        <option value="M">M | Malam</option>
                    </select>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="jam_kerja">Jam Kerja</label>
                </div>

                <div class="col-md-3">
                    <div class="input-group input-group-sm">
                        <input type="time" id="jam_kerja_awal" class="form-control" disabled>
                        <label class="input-group-text">S / D</label>
                        <input type="time" id="jam_kerja_akhir" class="form-control" disabled>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="nama_karyawan">Nama Karyawan</label>
                </div>

                <div class="col-md-7">
                    <select id="nama_karyawan" class="form-select form-select-sm" disabled>
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="rpm">Actual RPM</label>
                </div>

                <div class="col-md-2">
                    <input type="text" id="rpm" class="form-control form-control-sm" placeholder="0" min="0"
                        disabled>
                </div>

                <div class="col-md-1"></div>

                <div class="col-md-2 d-flex justify-content-end">
                    <label for="shuttle">Jumlah Shuttle</label>
                </div>

                <div class="col-md-2 d-flex justify-content-end">
                    <input type="text" id="shuttle" class="form-control form-control-sm" placeholder="0"
                        min="0" disabled>
                </div>
            </div>

            <div class="card mt-3"></div>

            <div class="row mt-3" style="display: none">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="status_plc"><b>Status PLC:</b></label>
                </div>

                <div class="col-md-2" style="display: flex">
                    <label id="label_plc"><b>Non Active</b></label>
                </div>

                <div class="col-md-1">
                    <input type="text" id="status_plc" class="form-control form-control-sm" disabled>
                </div>

                <div class="col-md-2 d-flex justify-content-end">
                    <label for="id_plc">ID PLC</label>
                </div>

                <div class="col-md-1 d-flex justify-content-end">
                    <input type="text" id="id_plc" class="form-control form-control-sm" disabled>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="counter_awal">Counter Awal</label>
                </div>

                <div class="col-md-2">
                    <input type="text" id="counter_awal" class="form-control form-control-sm" placeholder="0"
                        min="0" disabled>
                </div>

                <div class="col-md-1"></div>

                <div class="col-md-2 d-flex justify-content-end">
                    <label for="counter_akhir">Counter Akhir</label>
                </div>

                <div class="col-md-2 d-flex justify-content-end">
                    <input type="number" id="counter_akhir" class="form-control form-control-sm" placeholder="0"
                        min="0" disabled>
                </div>
            </div>

            <div class="row mt-2">
                <div class="col-md-2 d-flex justify-content-end">
                    <label for="meter_manual">Meter Manual</label>
                </div>

                <div class="col-md-2">
                    <input type="number" id="meter_manual" class="form-control form-control-sm" placeholder="0"
                        min="0" disabled>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center flex-wrap">
                    <button type="button" id="btn_isi" class="btn btn-success mx-1 my-1">Tambah</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning mx-1 my-1">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger mx-1 my-1">Hapus</button>
                    <button type="button" id="btn_proses" class="btn btn-primary mx-1 my-1"
                        style="margin-left: 1.5rem !important" disabled>Proses</button>
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script>
        const url_MesinOrder = "{{ url('/pagination/get-mesin-order') }}";
        const url_DaftarPegawai = "{{ url('/pagination/get-pegawai') }}";
        const url_IdLog = "{{ url('/pagination/get-log-mesin') }}";
    </script>

    @include('circular.transaksi.modalpegawai')
    <script src="{{ asset('js/Circular/transaksi/kegiatanMesin.js') }}"></script>
@endsection
