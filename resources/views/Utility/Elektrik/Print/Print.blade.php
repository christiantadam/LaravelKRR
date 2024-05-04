@extends('layouts.appUtility')
@section('title', 'Print Elektrik')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Print Elektrik</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <label class="">Filter</label>
                        <div class="row-24 d-flex mt-4">

                            <label for="">Tanggal</label>
                            <input type="date" name="tanggal_dibutuhkan" id="tanggal" class="input mb-3 ml-1">
                            <label for=""class="ml-3">S/D</label>
                            <input type="date" name="tanggal_dibutuhkan" id="sampaiDengan" class="input mb-3 ml-1 ">
                            <label for="" class="ml-3">Divisi Pelapor</label>
                            <select name="divisi_pelapor" id="divisi_pelapor" class="form-select mb-2 ml-1"
                                style="width: 250px;">
                                <option selected disabled>Pilih Divisi Pelapor</option>..</option>
                                @foreach ($divisi as $divisi_pelapor)
                                    <option value="{{ $divisi_pelapor->Id_divisi }}">
                                        {{ $divisi_pelapor->Nama_divisi }}</option>
                                @endforeach
                                </option>
                            </select>
                            <button type="button" style="" class="btn btn-primary ml-3"
                                id="refreshButton">Refresh</button>
                        </div>
                        <div class="table-responsive mt-4">
                            <table class="table" id="tabel_print">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox"></th>
                                        <th scope="col">Tanggal</th>
                                        <th scope="col">Div. Pelapor </th>
                                        <th scope="col">Pelapor</th>
                                        <th scope="col">Penerima Laporan</th>
                                        <th scope="col">Jam Lapor</th>
                                        <th scope="col">Jam Perbaikan</th>
                                        <th scope="col">Jam Selesai</th>
                                        <th scope="col">Type Gangguan</th>
                                        <th scope="col">Penyebab</th>
                                        <th scope="col">Penyelesaian</th>
                                        <th scope="col">Keterangan</th>
                                        <th scope="col">Teknisi</th>

                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div class="previewTitle mt-2 d-flex justify-content-between align-items-center">
                            <h3 class="text-center mb-0">Main Report</h3>
                            <!-- Add a print button -->
                            <button type="button" class="btn btn-secondary mt-3" onclick="window.print()">Print
                                Preview</button>
                        </div>
                        <div id="previewSection" class="mt-4 d-flex justify-content-center">
                            <div id="previewData">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src="{{ asset('js/Utility/Elektrik/Print.js') }}"></script>
@endsection
