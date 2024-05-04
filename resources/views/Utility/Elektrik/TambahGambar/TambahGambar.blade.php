@extends('layouts.appUtility')
@section('title', 'Gambar Elektrik')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Gambar Elektrik</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class=" col-md-15 mt-2">
                            <label for="tanggal">Filter</label>
                            <div class="d-flex gap-2 align-items-center mb-4">
                                <input type="hidden" id="idTambahGambar">
                                <h6 class="mt-2">Tanggal</h6>
                                <input type="date" class="form-control" id="bulan" name="date1"
                                    style="width:150px">
                                <h6 class="mt-2">S/D</h6>
                                <input type="date" class="form-control" id="sampaiDengan" name="date2"
                                    style="width:150px">
                                <h6 class="mt-2" style="white-space: nowrap;">Divisi Pelapor </h6>
                                <select class="form-select" aria-label="Default select example" name="divisi_pelapor"
                                    id="divisi_pelapor2">
                                    <option selected value="0">Pilih Divisi Pelapor</option>
                                    @foreach ($divisi as $divisi_pelapor)
                                        <option value="{{ $divisi_pelapor->Id_divisi }}">
                                            {{ $divisi_pelapor->Nama_divisi }}</option>
                                    @endforeach
                                </select>
                                <button id="refreshButton" class="btn btn-primary">Refresh</button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table" id="tabel_gambar">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox" id="">
                                            <input type="checkbox" name="agree" id="checkbox_tabel">
                                        </th>
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
                        <div class="form">
                            <div class="row-24 d-flex">
                                <div class="col-5">
                                    @for ($i = 3; $i <= 6; $i++)
                                        <label for="gambar{{ $i }}" id="namagambar{{ $i }}"
                                            class="btn btn-link btn-{{ $i }} mt-2">Pilih
                                            Gambar
                                            {{ $i }}</label>
                                        <input type="file" id="gambar{{ $i }}"
                                            name="gambar{{ $i }}" style="display: none;" accept="image/*">
                                        </form>
                                        <div class="ketgambar">Ket. Gambar {{ $i }}</div>
                                        <input type="text" name="ketgambar{{ $i }}"
                                            id="ketgambar{{ $i }}" class="mb-1">
                                        <div id="imagePreviewContainer{{ $i }}">
                                            <img id="imagePreview{{ $i }}" src=""
                                                alt="Preview {{ $i }}"
                                                style="display: none; max-width: 100%; height: auto;">
                                        </div>
                                    @endfor
                                </div>
                                <div class="col-5">
                                    @for ($i = 7; $i <= 10; $i++)
                                        <label for="gambar{{ $i }}" id="namagambar{{ $i }}"
                                            class="btn btn-link btn-{{ $i }} mt-2">Pilih
                                            Gambar
                                            {{ $i }}</label>
                                        <input type="file" id="gambar{{ $i }}"
                                            name="gambar{{ $i }}" style="display: none;" accept="image/*">
                                        <div id="imagePreviewContainer{{ $i }}">
                                            <div class="ketgambar">Ket. Gambar {{ $i }}</div>
                                            <input type="text" name="ketgambar{{ $i }}"
                                                id="ketgambar{{ $i }}" class="mb-1">
                                            <img id="imagePreview{{ $i }}" src=""
                                                alt="Preview {{ $i }}"
                                                style="display: none; max-width: 100%; height: auto;">
                                        </div>
                                    @endfor
                                </div>
                                <div class="col-2">
                                    <button type="button" class="btn btn-primary w-100 mt-3"
                                        id="inputButton">Input</button>
                                    <button type="button"
                                        class="btn btn-primary w-100 mt-2"id="koreksiButton">Koreksi</button>


                                    <button type="button"
                                        class="btn btn-primary w-100 mt-5"id="prosesButton">Proses</button>
                                    <button type="button"
                                        class="btn btn-primary w-100 mt-2"id="batalButton">Batal</button>

                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src="{{ asset('js/Utility/Elektrik/TambahGambar.js') }}"></script>
@endsection
