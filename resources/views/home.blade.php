@extends('layouts.app')

@section('content')

@if (Session::has('status'))
<script>
    Swal.fire({
        icon: 'info',
        title: 'Informasi',
        text: '{{ Session::get('status') }}',
    });
</script>
@endif

<link href="{{ asset('css/home.css') }}" rel="stylesheet">
<script src="{{ asset('js/home.js') }}"></script>
@include('modalTambahPengumuman')
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-11 RDZMobilePaddingLR0">
            <div id="homeContainer">
                <h1 id="homeTitle">
                    <span id="homeText">HOME</span>
                    <span id="searchIcon">🔍</span>
                </h1>

                <button
                    class="btn-pengumuman"
                    data-bs-toggle="modal"
                    data-bs-target="#modalPengumuman">
                    ANNOUNCEMENT
                </button>
            </div>

            <div class="acs-grid-container">
                @foreach ($AccessProgram as $item)
                    @php
                        $modifiedNamaProgram = str_replace("\n", '<br>', $item->NamaProgram);
                        $namaIconProgram = str_replace("\n", '_', $item->NamaProgram);
                        $routeProgram = $item->RouteProgram ?? $item->NamaProgram;
                    @endphp

                    <a class="acs-link" href="{{ url($routeProgram) }}">
                        <div class="acs-card">
                            <h2 class="acs-txt-card">
                                {!! $modifiedNamaProgram !!}
                            </h2>
                            <img
                                src="{{ asset('/images/' . $namaIconProgram . '.png') }}"
                                class="acs-img-card"
                                alt="">
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    </div>
</div>


{{-- ================= MODAL PENGUMUMAN ================= --}}
<div class="modal fade" id="modalPengumuman" tabindex="-1">
    <div class="modal-dialog modal-xxl modal-dialog-scrollable">
        <div class="modal-content announcement-modal">

            <div class="modal-header position-relative">
                <h5 class="modal-title w-100 text-center m-0">📢 PENGUMUMAN</h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>
            </div>

            <div class="modal-body">

                <div class="announcement-list">
                    @forelse ($pengumuman as $p)
                    <div class="announcement-item">
                        <div class="announcement-header">
                            <div class="announcement-title">
                                <b>{{ strtoupper($p->judul_pesan) }}</b>
                            </div>
                            <div class="announcement-meta">
                                ID: {{ $p->id }}
                            </div>
                        </div>

                        <div class="announcement-meta">
                            Berlaku Hingga:
                            {{ \Carbon\Carbon::parse($p->tgl_akhir)->format('d M Y') }}
                        </div>
                        <div class="announcement-meta">
                            Pengirim : {{ $p->penulis }}
                        </div>
                        <div class="announcement-meta">
                            Waktu Membuat Pengumuman :
                            {{ \Carbon\Carbon::parse($p->wkt_tulis)->format('d M Y H:i') }}
                        </div>
                        <div class="announcement-content">
                            {!! nl2br(e($p->isi_pesan)) !!}
                        </div>
                    </div>

                    @empty
                    <div class="text-center py-5 text-muted">
                        Tidak ada pengumuman saat ini
                    </div>
                    @endforelse
                </div>
            </div>

            <!-- Floating Add Button di dalam modal -->
            <button
                class="fab-button"
                onclick="openTambahPengumuman()">
                    +
            </button>

        </div>
    </div>
</div>
@endsection


<script>
    function openTambahPengumuman(){
    const modalPengumuman = bootstrap.Modal.getInstance(
        document.getElementById('modalPengumuman')
    );

    modalPengumuman.hide();
    const modalTambah = new bootstrap.Modal(
        document.getElementById('tambahPengumumanModal')
    );
    modalTambah.show();
}
</script>
