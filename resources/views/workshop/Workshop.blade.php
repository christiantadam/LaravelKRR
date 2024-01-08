@extends('layouts.app')
@section('content')
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <h1 style="text-align: center">HOME</h1>
        <div class="acs-grid-container">
          <div class="acs-card" onclick="OpenNewTab('{{ url('HomeWorkshop') }}');">
            <h2 class="acs-txt-card">WORKSHOP</h2>
            <img src="{{ asset('/images/Workshop.png') }}" alt="" class="acs-img-card">
          </div>
          <div class="acs-card" onclick="OpenNewTab('{{ url('gps') }}');">
            <h2 class="acs-txt-card">GPS</h2>
            <img src="{{ asset('/images/Workshop.png') }}" alt="" class="acs-img-card">
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
