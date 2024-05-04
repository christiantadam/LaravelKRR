@extends('layouts.appUtility')
@section('title', 'Gambar Project')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Gambar Project</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <label class="">Filter</label>
                        <div class=" d-flex gap-2 align-items-center">
                            <h6 class="mt-2">Bulan</h6>
                            <input type="number" name="tanggal_dibutuhkan" pattern="[0-9]" min="0" id="bulan"
                                class="input ">
                            <h6 class="mt-2">Tanggal</h6>
                            <input type="number" pattern="[0-9]" name="tanggal_dibutuhkan" min="0" id="tahun"
                                class="input ml-1">

                            <button id="refreshButton" class="btn btn-primary">Refresh</button>
                        </div>
                        <div id="div_tablePO" class="acs-form3 mt-3">
                            <table class="table" id="tabel_gambar_project">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox" id="">
                                            <input type="checkbox" name="agree" id="checkbox_project">
                                        </th>
                                        <th scope="col">Nama Project</th>
                                        <th scope="col">Nama Mesin </th>
                                        <th scope="col">Tanggal Mulai</th>
                                        <th scope="col">Tanggal Selesai</th>
                                        <th scope="col">Keterangan</th>
                                        <th scope="col">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
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
    <script src="{{ asset('js/Utility/Project/TambahGambarProject.js') }}"></script>
@endsection
