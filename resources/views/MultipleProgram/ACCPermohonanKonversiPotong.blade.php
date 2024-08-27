@extends('layouts.appJumboBag')
@section('title', 'ACC Permohonan Konversi Potong')

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <script>
                let successMessage = '';
                let errorMessage = '';
            </script>
            @if (Session::has('success'))
                <script>
                    successMessage = "{{ Session::get('success') }}";
                </script>
            @elseif (Session::has('error'))
                <script>
                    errorMessage = "{{ Session::get('error') }}";
                </script>
            @endif
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">ACC Permohonan Konversi Potong</div>
                    <div class="card-body">
                        <form id="copyKodeBarangForm" action="{{ route('CopyKodeBarang.store') }}" method="POST">
                            @csrf
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
@endsection
