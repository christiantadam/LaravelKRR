@extends('layouts.appUtility')
@section('title', 'Input Project')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input Project</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form">
                            <div class="row-12 d-flex">
                                <div class="col-5">
                                    <div class="col-8">
                                        <input type="hidden" id="id">
                                        <div class="nama_pelapor">Nama Project</div>
                                        <input type="text" name="nama_pelapor" id="nama_project"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor">Nama Mesin</div>
                                        <input type="text" name="nama_pelapor" id="nama_mesin" class="form-control mb-2"
                                            placeholder="">
                                        <div class="nama_pelapor">Merk Mesin</div>
                                        <input type="text" name="nama_pelapor" id="merk_mesin" class="form-control mb-2"
                                            placeholder="">
                                        <div class="nama_pelapor">Lokasi Mesin</div>
                                        <input type="text" name="nama_pelapor" id="lokasi_mesin"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor">Tahun Pembuatan</div>
                                        <input type="text" name="nama_pelapor" id="tahun_pembuatan"
                                            class="form-control mb-2" placeholder="">
                                        <div class="jam_lapor">Tanggal Mulai</div>
                                        <input type="date" class="form-control mb-2" name="tanggal_dibutuhkan"
                                            id="tanggal_mulai" class="input mb-3">
                                        <div class="jam_lapor">Tanggal Selesai</div>
                                        <input type="date" class="form-control mb-2" name="tanggal_dibutuhkan"
                                            id="tanggal_selesai" class="input mb-3">
                                        <div class="nama_pelapor">Keterangan Kerusakan</div>
                                        <input type="text" name="nama_pelapor" id="keterangan_kerusakan"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor">Perbaikan</div>
                                        <input type="text" name="nama_pelapor" id="perbaikan" class="form-control mb-2"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row-4">
                                        <div class="div">
                                            <label>Keterangan</label>
                                            <label>
                                                <input type="radio" name="keterangan" value="Progress"
                                                    id="keterangan_progress" checked>
                                                Progress
                                            </label>
                                            <label>
                                                <input type="radio" name="keterangan" value="Selesai"
                                                    id="keterangan_selesai">
                                                Selesai
                                            </label>
                                        </div>


                                        <form id="uploadForm1" action="/upload" method="post" enctype="multipart/form-data"
                                            class=" ">
                                            <label for="gambar1" class="btn btn-link ">Pilih Gambar 1</label>
                                            <input type="file" id="gambar1" name="fileInput1" style="display: none;"
                                                accept="image/*">
                                        </form>

                                        <div id="imagePreviewContainer1">
                                            <img id="hasil_gambar1" src="" alt="Preview 1"
                                                style="display: none; max-width: 100%; max-height: 250px;">
                                        </div>
                                        <div class="nama_pelapor">Ket. Gambar 1</div>
                                        <input type="text" name="ket_gambar1" id="ket_gambar1" class="form-control mb-2"
                                            placeholder="">

                                        <form id="uploadForm2" action="/upload" method="post"
                                            enctype="multipart/form-data" class="mt-3">
                                            <label for="gambar2" class="btn btn-link">Pilih Gambar 2</label>
                                            <input type="file" id="gambar2" name="fileInput2"
                                                style="display: none;" accept="image/*">
                                        </form>

                                        <div id="imagePreviewContainer2">
                                            <img id="hasil_gambar2" src="" alt="Preview 2"
                                                style="display: none; max-width: 100%; max-height: 250px;">
                                        </div>
                                        <div class="nama_pelapor">Ket. Gambar 2</div>
                                        <input type="text" name="nama_pelapor" id="ket_gambar2"
                                            class="form-control mb-2" placeholder="">
                                    </div>
                                </div>
                                <div class="col-3 d-grid gap-2 d-md-block d-flex mt-5">
                                    <button type="button" class="btn btn-primary w-50 mt-3"
                                        id="inputButton">Input</button>
                                    <button type="button"
                                        class="btn btn-primary w-50 mt-2"id="koreksiButton">Koreksi</button>
                                    <button type="button"
                                        class="btn btn-primary w-50 mt-2"id="hapusButton">Hapus</button>
                                    <button type="button"
                                        class="btn btn-primary w-50 mt-5"id="prosesButton">Proses</button>
                                    <button type="button"
                                        class="btn btn-primary w-50 mt-2 mb-5"id="batalButton">Batal</button>
                                    {{-- <button type="button" class="btn btn-primary  w-50 mt-5" id="PrintData">Print
                                        Data</button> --}}
                                </div>

                            </div>
                            <div class="mb-5">
                                <button type="button" class="btn btn-primary mt-3 float-end" id="PrintData">Print
                                    Data</button>
                            </div>
                        </div>
                        <label class="mt-3">Filter</label>
                        <div class=" d-flex gap-2 align-items-center">
                            <h6 class="mt-2">Bulan</h6>
                            <input type="number" name="tanggal_dibutuhkan" pattern="[0-9]" min="0"
                                id="bulan" class="input form-control">
                            <h6 class="mt-2">Tahun</h6>
                            <input type="number" pattern="[0-9]" name="tanggal_dibutuhkan" min="0"
                                id="tahun" class="input ml-1 form-control">
                            <button id="refreshButton" class="btn btn-primary">Refresh</button>
                            <h6 class="mt-2">Status</h6>
                            <select id="filter" class="form-select ml-1">
                                <option value="">Pilih Semua</option>
                                <option value="Progress">Progress</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                        </div>
                        <div id="div_table_project" class="table-responsive mt-3">
                            <table class="table" id="tabel_input_project">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox" id="">
                                            Aksi </th>
                                        <th scope="col">Nama Project</th>
                                        <th scope="col">Nama Mesin </th>
                                        <th scope="col">Tanggal Mulai</th>
                                        <th scope="col">Tanggal Selesai</th>
                                        <th scope="col">Keterangan Kerusakan</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">User</th>

                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src="{{ asset('js/Utility/Project/InputProject.js') }}"></script>
@endsection
