@extends('layouts.appEDP')
@section('title', 'Maintenance TTD User')
@section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/EDP/MaintenanceUserWeb.css') }}" rel="stylesheet">

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance TTD User</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_userWeb" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-light">
                                <tr>
                                    <th>Nomor User</th>
                                    <th>Nama User</th>
                                    <th>Actions</th>
                                    <th>ttd</th>
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
    <div class="modal fade" id="modalTambahTTD" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabelTambahTTD">Tambah TTD</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span>x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="py-2">
                        <label for="mmu_gambarTTD">Upload Gambar TTD</label>
                        <div class="input-group">
                            <input type="file" class="form-control-file" id="mmu_gambarTTD" name="mmu_gambarTTD"
                                accept="image/*" readonly>
                        </div>
                    </div>
                    <div class="py-2">
                        <label>Preview Gambar TTD</label>
                        <div id="imagePreview" style="padding: 10px;">
                            <img id="previewImg" src="#" alt="Preview Image"
                                style="width: 100%; border: 1px solid black;display:none;">
                        </div>
                        <br>
                        <button type="button" class="btn btn-secondary" id="clearImage" style="width:100px">Clear</button>
                    </div>
                    <div class="d-flex" style="justify-content: end;width: 100%">
                        <button class="btn btn-info" id="mmu_buttonSave">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="ttdModal" tabindex="-1">
        <div class="modal-dialog modal-md modal-dialog-centered custom-modal-width">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">Tanda Tangan Digital</h6>
                    <button type="button" class="close" data-dismiss="modal">x</button>
                </div>

                <div class="modal-body text-center">
                    <canvas id="ttdCanvas" width="200" height="100"
                        style="border:1px solid #ccc; touch-action:none;"></canvas>
                </div>
                <input type="hidden" id="ttd_base64" name="ttd_base64">
                <div class="modal-footer">
                    <button class="btn btn-secondary btn-sm" onclick="clearTTD()" id="btn_clearTTD">Clear</button>
                    <button class="btn btn-success btn-sm" id="btn_simpanTTD">Simpan</button>
                    {{-- <button class="btn btn-success btn-sm" onclick="saveTTD()" id="btn_simpanTTD">Simpan</button> --}}
                </div>
            </div>
        </div>
    </div>

    {{-- <style>
        .custom-modal-width {
            max-width: 60%;
            max-height: 60%;
        }
    </style> --}}

    <script>
        let canvas, ctx, drawing = false;

        function initCanvas() {
            canvas = document.getElementById("ttdCanvas");
            if (!canvas) return;

            ctx = canvas.getContext("2d");

            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#000";

            // MOUSE
            canvas.onmousedown = e => {
                drawing = true;
                ctx.beginPath();
                ctx.moveTo(e.offsetX, e.offsetY);
            };

            canvas.onmousemove = e => {
                if (!drawing) return;
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            };

            canvas.onmouseup = () => drawing = false;
            canvas.onmouseleave = () => drawing = false;

            // TOUCH
            canvas.addEventListener("touchstart", e => {
                e.preventDefault();
                drawing = true;
                let t = e.touches[0];
                let rect = canvas.getBoundingClientRect();
                ctx.beginPath();
                ctx.moveTo(t.clientX - rect.left, t.clientY - rect.top);
            });

            canvas.addEventListener("touchmove", e => {
                e.preventDefault();
                if (!drawing) return;
                let t = e.touches[0];
                let rect = canvas.getBoundingClientRect();
                ctx.lineTo(t.clientX - rect.left, t.clientY - rect.top);
                ctx.stroke();
            });

            canvas.addEventListener("touchend", () => drawing = false);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function clearTTD() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let ttd_base64 = document.getElementById("ttd_base64");
            ttd_base64.value = null;;
            // let img = document.getElementById("ttd_preview");
            // img.src = base64;
            // img.style.display = "none";
        }

        // function saveTTD() {
        //     let base64 = canvas.toDataURL("image/png");
        //     const ttd_base64;
        //     ttd_base64.value = base64;


        //     // let img = document.getElementById("ttd_preview");
        //     // img.src = base64;
        //     // img.style.display = "block";

        //     $("#ttdModal").modal("hide");
        //     // bootstrap.Modal.getInstance(
        //     //     document.getElementById("ttdModal")
        //     // ).hide();
        // }

        function openTTD() {
            // const modal = new bootstrap.Modal(document.getElementById("ttdModal"));
            // modal.show();

            // inisialisasi canvas SETELAH modal muncul
            setTimeout(initCanvas, 200);
        }
    </script>
    {{-- @include('EDP/Master/modalTambahTTD') --}}
    <script type="text/javascript" src="{{ asset('js/EDP/MaintenanceTTDUser.js') }}"></script>
@endsection
