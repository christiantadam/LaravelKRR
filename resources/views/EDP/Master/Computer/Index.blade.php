@extends('layouts.appEDP')
@section('content')
@section('title', 'Komputer')
<script>
    $(document).ready(function() {
        var table = $('#table_Computer').DataTable({
            "columns": [{
                    "width": "20%"
                }, // Kode Komputer
                {
                    "width": "30%"
                }, // Nama User
                {
                    "width": "30%"
                }, // IP Address
                {
                    "width": "20%"
                } // Action
            ]
        });

        // Handle row clicks
        $('#table_Computer tbody').on('click', 'tr', function() {
            // Get the data from the clicked row
            var data = table.row(this).data();

            if ($(event.target).is('button')) {
                return; // Do nothing if the click was on a button
            }
            // Update the modal content with the computer details
            $('#modalComputerContent').html();
            // Make an AJAX request to the Laravel back end
            $.ajax({
                url: '/Computer/' + data[0], // Replace with the actual route
                method: 'GET',
                success: function(response) {
                    // Update the modal content with the response data
                    console.log(response);
                    var KapasitasMemory = response[0][0].KapasitasMemory !== null ?
                        response[0][0].KapasitasMemory : "-";
                    var Processor = response[0][0].Processor !== null ? response[0][0]
                        .Processor : "-";
                    var KapasitasHardDisk = response[0][0].KapasitasHardDisk !== null ?
                        response[0][0].KapasitasHardDisk : "-";
                    var Sistem_Operas = response[0][0].Sistem_Operas !== null ? response[0][
                        0
                    ].Sistem_Operas : "-";
                    var Monitor_Size = response[0][0].Monitor_Size !== null ? response[0][0]
                        .Monitor_Size : "-";
                    var Kapasitas_VGA = response[0][0].Kapasitas_VGA !== null ? response[0][
                        0
                    ].Kapasitas_VGA : "-";
                    $('#modalComputerContent').html(
                        '<p style=text-align:center><strong> Specification for ' +
                        data[0] +
                        '</strong> </p>' +
                        // '<p><strong>User:</strong> ' + data[1] + '</p>' +
                        '<p><strong>Processor:</strong> ' + Processor +
                        '</p>' +
                        '<p><strong>Hard Disk:</strong> ' + KapasitasHardDisk +
                        '</p>' +
                        '<p><strong>Memory:</strong> ' + KapasitasMemory +
                        '</p>' +
                        '<p><strong>Operating System:</strong> ' + Sistem_Operas +
                        '</p>' +
                        '<p><strong>Monitor Size:</strong> ' + Monitor_Size +
                        '</p>' +
                        '<p><strong>VGA Capacity:</strong> ' + Kapasitas_VGA +
                        '</p>'
                    );

                    // Open the modal
                    openModal('modal Computer');
                },
                error: function(error) {
                    console.error('Error fetching data:', error);
                }
            });
            // Open the modal
            openModal('modal Computer');
        });
        $('#table_Computer tbody').on('click', 'button', function(event) {
            event.stopPropagation(); // Stop the event from reaching the parent tr
        });
    });
</script>
<link href="{{ asset('css/computer.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            {{-- button untuk munculin create billing --}}
            <button class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('Computer/create')">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Komputer</div>
            </button>
            <div class="card">
                {{-- @if (Auth::user()->status == 1) --}}
                <div class="card-header">Komputer || ON PROGRESS, PERLU PERBAIKAN PADA CONTROLLER, JAVASCRIPT, DAN SP_4384_EDP_MaintenanceKomputer</div>
                {{-- @else
                        <div class="card-header">Home</div>
                    @endif --}}
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <table id="table_Computer" class="table" style="width:100%">
                        <thead class="thead-light">
                            <tr>
                                <th>Kode Komputer</th>
                                <th>Nama User </th>
                                <th>IP Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($data as $item)
                                <tr class="clickable-row">
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->Kode_Comp }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->NamaUser }}</td>
                                    <td class="RDZPaddingTable RDZCenterTable">{{ $item->IPv4 }}</td>
                                    <td class="acs-td-button"><button class="btn btn-sm btn-primary"
                                            onclick="openNewWindow('{{ url('Computer/' . $item->Kode_Comp . '/edit') }}')"
                                            href=""><span>&#x270E;</span>Edit</button>
                                        <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                            action="{{ route('computer.destroy', $item->Kode_Comp) }}" method="POST"
                                            enctype="multipart/form-data">
                                            {{ csrf_field() }}
                                            <button type="submit"
                                                class="btn btn-sm btn-danger"><span>&#x1F5D1;</span>Hapus</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@include('EDP.Master.Computer.DetailComputer')
@endsection
