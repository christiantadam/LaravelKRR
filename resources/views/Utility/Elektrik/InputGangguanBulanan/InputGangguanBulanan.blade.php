@extends('layouts.appUtility')
@section('title', 'Gangguan Elektrik Bulanan')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Gangguan Elektrik Bulanan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form">
                            <div class="row-24 d-flex">
                                <div class="col-4">
                                    <input type="hidden" name="" id="id_bulanan">
                                    <div class="col-8">
                                        <label class="Bulan">Bulan</label>
                                        <input type="number" pattern="[0-9]" min="0" name="bulan" id="bulan"
                                            class="input form-control mb-3">
                                        <div class="nama">Nama Pengecek</div>
                                        <input type="text" name="nama" id="nama" class="form-control mb-2"
                                            placeholder="">
                                        <div class="pabrik">Pabrik Pengecek</div>
                                        <select name="pabrik" id="pabrik" class="form-select mb-2">
                                            <option selected disabled>Pilih Pabrik Pengecek</option>..</option>
                                            <option value="Mojosari">Mojosari </option>
                                            <option value="Tropodo">Tropodo </option>
                                            <option value="Mlora">Mlora </option>
                                        </select>
                                        <div class="masalah">Jenis Masalah</div>
                                        <input type="text" name="masalah" id="masalah" class="form-control mb-2"
                                            placeholder="">
                                        <label for="gambar1" class="btn btn-link btn-1 ">Gambar Gangguan</label>
                                        <input type="file" id="gambar1" name="gambar1" style="display: none;"
                                            accept="image/*">
                                        <div id="imagePreviewContainer1">
                                            <img id="imagePreview1" src="" alt="Preview 1"
                                                style="display: none; max-width: 100%; height: auto;">
                                        </div>
                                        <div class="div">
                                            <label for="status">Status</label>
                                        </div>
                                        <label>
                                            <input type="radio" name="status" value="Selesai" id="selesai" checked>
                                            Selesai
                                        </label>
                                        <label>
                                            <input type="radio" name="status" value="Belum Selesai" id="belum_selesai">
                                            Belum Selesai
                                        </label>
                                        <div class="solusi">Solusi</div>
                                        <input type="text" name="solusi" id="solusi" class="form-control mb-2"
                                            placeholder="">
                                        <label for="fileInput2" class="btn btn-link btn-2 ">Gambar Selesai</label>
                                        <input type="file" id="gambar2" name="fileInput" style="display: none;"
                                            accept="image/*">
                                        <div id="imagePreviewContainer2">
                                            <img id="imagePreview2" src="" alt="Preview 2"
                                                style="display: none; max-width: 100%; height: auto;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive mt-5">

                                <table class="table" id="table-elektrik-bulanan">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">
                                                Aksi</th>
                                            <th scope="col">Bulan </th>
                                            <th scope="col">Nama </th>
                                            <th scope="col">Pabrik</th>
                                            <th scope="col">Masalah</th>
                                            <th scope="col">Solusi</th>
                                            <th scope="col">Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <div class="row-12 d-flex flex-wrap">
                                <div class="col-12">
                                    <div class="d-flex  p-2 justify-content-end">
                                        <button type="button" id="ProsesButton"
                                            class="btn btn-primary  ml-2">Proses</button>
                                        <button type="button" id="InputButton" class="btn btn-primary  ml-2">Input</button>
                                        <button type="button" id="ChangeButton"
                                            class="btn btn-primary  ml-2">Ubah</button>
                                        <button type="button" id="DeleteButton"
                                            class="btn btn-primary  ml-2">Hapus</button>
                                        <button type="button" id="CancelButton"
                                            class="btn btn-primary  ml-2">Batal</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    <script src="{{ asset('js/Utility/Elektrik/InputGangguanBulanan.js') }}"></script>
@endsection
