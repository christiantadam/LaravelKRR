@extends('layouts.appSales') @section('content')
    @include('Sales/Master/Customer/DetailCustomer')
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script> {{-- toaster --}}
    <script>
        $(document).ready(function() {
            $('#table_Customer').DataTable({
                order: [
                    [0, 'desc']
                ],
            });
        });
    </script>
    <script>
        @if (session()->has('success'))
            toastr.success('{{ session('success') }}', 'BERHASIL!');
        @endif
    </script>
    <link href="{{ asset('css/customer.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <script src="{{ asset('js/Sales/Customer.js') }}"></script>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0"> {{-- button untuk munculin new window untuk create customer --}} <button
                    class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('Customer/create')">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Customer</div>
                </button>
                <div class="card">
                    {{-- @if (Auth::user()->status == 1) --}}
                    <div class="card-header">Customer</div>
                    {{-- @else
                        <div class="card-header">Home</div>
                    @endif --}}
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_Customer" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>IdCustomer</th>
                                    <th>Nama Customer </th>
                                    <th>Kota Kirim</th>
                                    <th>Negara</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($data as $item)
                                    <tr>
                                        <td class="RDZPaddingTable RDZCenterTable"><a class="DetailCustomer"
                                                data-id="{{ $item->IDCust }}">{{ $item['IDCust'] }}</a> </td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item['NamaCust'] . " (" . $item['AlamatKirim'] . ")"}} </td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item['KotaKirim'] }}</td>
                                        <td class="RDZPaddingTable RDZCenterTable">{{ $item['Negara'] }}</td>
                                        <td class="acs-td-button"><button class="btn btn-sm btn-primary"
                                                onclick="openNewWindow('{{ url('Customer/' . $item->IDCust . '/edit') }}')"
                                                href=""><span>&#x270E;</span>Edit</button>
                                            <form onsubmit="return confirm('Apakah Anda Yakin ?');"
                                                action="{{ route('customer.destroy', $item->IDCust) }}" method="POST"
                                                enctype="multipart/form-data"> {{ csrf_field() }} <button type="submit"
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
@endsection
