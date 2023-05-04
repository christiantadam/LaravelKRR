@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <h1 style="text-align: center">HOME</h1>
                <div class="acs-grid-container">

                @foreach($AccessProgram as $item)
                <div class="acs-card" onclick="OpenNewTab('{{ url($item->NamaProgram) }}');">
                        <h2 class="acs-txt-card">{{$item->NamaProgram}}</h2>
                        <img src="{{ asset('/images/'.$item->NamaProgram.'.png') }}" alt="" class="acs-img-card">
                    </div>
                @endforeach
                    <!-- <div class="acs-card" onclick="OpenNewTab('{{ url('Sales') }}');">
                        <h2 class="acs-txt-card">SALES</h2>
                        <img src="{{ asset('/images/Sales.png') }}" alt="" class="acs-img-card">
                    </div>
                    <div class="acs-card" onclick="OpenNewTab('{{ url('Beli') }}');">
                        <h2 class="acs-txt-card">BELI</h2>
                        <img src="{{ asset('/images/OrderPembelian.png') }}" alt="" class="acs-img-card">
                    </div>
                    <div class="acs-card" onclick="OpenNewTab('{{ url('Inventory') }}');">
                        <h2 class="acs-txt-card">INVENTORY</h2>
                        <img src="{{ asset('/images/Inventory.png') }}" alt="" class="acs-img-card">
                    </div>
                    <div class="acs-card" onclick="OpenNewTab('{{ url('Utility') }}');">
                        <h2 class="acs-txt-card">UTILITY</h2>
                        <img src="{{ asset('/images/Utility.png') }}" alt="" class="acs-img-card">
                    </div>
                    <div class="acs-card" onclick="OpenNewTab('{{ url('EDP') }}');">
                        <h2 class="acs-txt-card">EDP</h2>
                        <img src="{{ asset('/images/EDP.png') }}" alt="" class="acs-img-card">
                    </div>
                    <div class="acs-card" onclick="OpenNewTab('{{ url('EDP') }}');">
                        <h2 class="acs-txt-card">MENU</h2>
                        <img src="{{ asset('/images/EDP.png') }}" alt="" class="acs-img-card">
                    </div>
                    <div class="acs-card" onclick="OpenNewTab('{{ url('EDP') }}');">
                        <h2 class="acs-txt-card">MENU</h2>
                        <img src="{{ asset('/images/EDP.png') }}" alt="" class="acs-img-card">
                    </div>
                    <div class="acs-card" onclick="OpenNewTab('{{ url('EDP') }}');">
                        <h2 class="acs-txt-card">MENU</h2>
                        <img src="{{ asset('/images/EDP.png') }}" alt="" class="acs-img-card">
                    </div> -->
                </div>
            </div>
        </div>
    </div>
@endsection
