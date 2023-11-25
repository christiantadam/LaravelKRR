@extends('layouts.appEDP') @section('content')
@section('title', 'Add Computer')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/computer.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif
            <div class="card">
                <div class="card-header">Add Computer</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div>
                        <form method="POST" action="{{ url('Computer') }}">
                            {{ csrf_field() }}
                            <input type="hidden" name="jenisStore" value="CreateComputer">
                            <div class="permohonan-do-form">
                                <div class="acs-form">
                                    <div class="acs-form1">
                                        <div class="acs-div-filter">
                                            <label for="KodeComputer">Kode Computer</label>
                                            <input type="text" name="KodeComputer" id="KodeComputer"
                                                placeholder="Kode Computer" class="input">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="NamaUser">Nama User</label>
                                            <input type="text" name="NamaUser" id="NamaUser" placeholder="Nama User"
                                                class="input">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="ipAddress">IP Address</label>
                                            <div class="acs-div-filter1">
                                                <input type="text" name="ipAddress" id="ipAddress"
                                                    placeholder="IP Address" class="input" style="width: 65%;"
                                                    oninput="validateIpAddress()">
                                                <div id="result"></div>
                                                <div id="error"></div>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Processor">Processor</label>
                                            <div class="acs-div-filter2">
                                                <select name="Processor" id="Processor" class="input">
                                                    <option selected disabled>-- Pilih Jenis Processor--</option>
                                                    @foreach ($processor as $data)
                                                        <option value="{{ $data->Id_Proc }}">
                                                            {{ $data->Id_Proc . ' - ' . $data->Processor }}</option>
                                                    @endforeach
                                                </select>
                                                <button type="button" onclick="openModal('modal AddProcessor')" class="btn btn-primary">Add Processor</button>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Memory">Memory</label>
                                            <div class="acs-div-filter2">
                                                <select name="Memory" id="Memory" class="input">
                                                    <option selected disabled>-- Pilih Jenis Memory--</option>
                                                    @foreach ($memory as $data)
                                                        <option value="{{ $data->Id_Memory }}">
                                                            {{ $data->Id_Memory . ' - ' . $data->Kapasitas }}</option>
                                                    @endforeach
                                                </select>
                                                <button type="button" onclick="openModal('modal AddMemory')" class="btn btn-primary">Add Memory</button>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="HardDisk">Hard Disk</label>
                                            <div class="acs-div-filter2">
                                                <select name="HardDisk" id="HardDisk" class="input">
                                                    <option selected disabled>-- Pilih Jenis Hard Disk--</option>
                                                    @foreach ($harddisk as $data)
                                                        <option value="{{ $data->Id_HDD }}">
                                                            {{ $data->Id_HDD . ' - ' . $data->Kapasitas }}</option>
                                                    @endforeach
                                                </select>
                                                <button type="button" onclick="openModal('modal AddHardDisk')" class="btn btn-primary">Add Hard Disk</button>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="OperatingSystem">Operating System</label>
                                            <div class="acs-div-filter2">
                                                <select name="OperatingSystem" id="OperatingSystem" class="input">
                                                    <option selected disabled>-- Pilih Jenis Operating System--</option>
                                                    @foreach ($typeos as $data)
                                                        <option value="{{ $data->Is_OS }}">
                                                            {{ $data->Is_OS . ' - ' . $data->Sistem_Operas }}</option>
                                                    @endforeach
                                                </select>
                                                <button type="button" onclick="openModal('modal AddOperatingSystem')" class="btn btn-primary">Add Operating System</button>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="GraphicCard">Graphic Card</label>
                                            <div class="acs-div-filter2">
                                                <select name="GraphicCard" id="GraphicCard" class="input">
                                                    <option selected disabled>-- Pilih Jenis Graphic Card--</option>
                                                    @foreach ($vga as $data)
                                                        <option value="{{ $data->Id_VGA }}">
                                                            {{ $data->Id_VGA . ' - ' . $data->Kapasitas_VGA }}</option>
                                                    @endforeach
                                                </select>
                                                <button type="button" onclick="openModal('modal AddGraphicCard')" class="btn btn-primary">Add Graphic Card</button>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="Monitor">Monitor</label>
                                            <div class="acs-div-filter2">
                                                <select name="Monitor" id="Monitor" class="input">
                                                    <option selected disabled>-- Pilih Jenis Monitor--</option>
                                                    @foreach ($monitor as $data)
                                                        <option value="{{ $data->Id_Monitor }}">
                                                            {{ $data->Id_Monitor . ' - ' . $data->Monitor_Size }}
                                                        </option>
                                                    @endforeach
                                                </select>
                                                <button type="button" onclick="openModal('modal AddMonitor')" class="btn btn-primary">Add Monitor</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="acs-div-btn">
                                <button id="submit_btn" class="btn btn-primary">
                                    <span>Submit</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/EDP/Computer.js') }}"></script>
@include('EDP.Master.Computer.DetailComputer')
@endsection
