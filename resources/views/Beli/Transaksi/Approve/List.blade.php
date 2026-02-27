@extends('layouts.appOrderPembelian')

@section('title', 'Approve Pembelian')

@section('content')
    @include('Beli/Transaksi/Approve/modalDetailApprove')

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="{{ asset('js/OrderPembelian/Approve/Approve.js') }}"></script>

    <script>
        $(document).ready(function() {
            $('#table_Approve').DataTable({
                searching: true,
                order: [
                    [1, 'desc']
                ],
                columnDefs: [{
                        orderable: false,
                        targets: 0
                    },
                    {
                        visible: false,
                        targets: [5, 6]
                    }
                ]
            });
        });
    </script>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">List Approve</div>

                    <form class="form" method="POST" action="{{ url('/Approve') }}">
                        @csrf

                        {{-- hidden input collector --}}
                        <div id="DataCheckbox"></div>

                        <div class="card-body">
                            @if (session('danger'))
                                <div class="alert alert-danger">
                                    {{ session('danger') }}
                                </div>
                            @endif

                            <table id="table_Approve" class="table table-bordered" style="width:100%">
                                <thead class="thead-dark">
                                    <tr>
                                        <th class="text-center">
                                            <input type="checkbox" id="CheckedAll" style="width:20px;height:20px;">
                                        </th>
                                        <th>No. Trans</th>
                                        <th class="text-center">
                                            Tanggal<br>
                                            <small>(MM-DD-YYYY)</small>
                                        </th>
                                        <th>Barang</th>
                                        <th>User</th>
                                        <th>Keterangan Internal</th>
                                        <th>Keterangan Order</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($data as $index => $item)
                                        <tr>
                                            <td class="text-center">
                                                <input type="checkbox" value="{{ $item->No_trans }}"
                                                    id="{{ $item->No_trans }}" onclick="x('{{ $item->No_trans }}')"
                                                    style="width:20px;height:20px;">
                                            </td>
                                            <td>
                                                <a class="DetailApprove" data-id="{{ $item->No_trans }}"
                                                    href="{{ route('approve.update', $item->No_trans) }}">
                                                    {{ $item->No_trans }}
                                                </a>
                                            </td>
                                            <td class="text-center">
                                                {{ date('m-d-Y', strtotime($item->Tgl_order)) }}
                                            </td>
                                            <td>
                                                {{ $item->NAMA_BRG }}
                                                <span style="background:#00ff00;padding:2px 6px;">
                                                    {{ $item->Qty }} {{ $item->Nama_satuan }}
                                                </span>
                                            </td>
                                            <td>{{ $item->Nama }}</td>
                                            <td>{{ $item->Ket_Internal }}</td>
                                            <td>{{ $item->keterangan }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                        <div class="card-footer d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-primary" id="btnApprove">
                                Approve
                            </button>
                            <button type="button" class="btn btn-danger" id="btnReject">
                                Reject
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

    <script>
        function x(No_trans) {
            let cb = document.getElementById(No_trans);
            let box = document.getElementById("DataCheckbox");

            if (cb.checked) {
                if (!document.getElementById("ID" + No_trans)) {
                    box.innerHTML +=
                        "<input type='hidden' id='ID" + No_trans +
                        "' name='checkedBOX[]' value='" + No_trans + "'>";
                }
            } else {
                let el = document.getElementById("ID" + No_trans);
                if (el) el.remove();
            }
        }


        function searchData(checked) {
            let table = $('#table_Approve').DataTable();
            let box = document.getElementById("DataCheckbox");

            if (!checked) {
                box.innerHTML = "";
                return;
            }

            table.rows({
                search: 'applied'
            }).every(function() {
                let row = this.node();
                let cb = row.querySelector('input[type="checkbox"]');

                if (cb && cb.checked) {
                    let no = cb.value;
                    if (!document.getElementById("ID" + no)) {
                        box.innerHTML +=
                            "<input type='hidden' id='ID" + no +
                            "' name='checkedBOX[]' value='" + no + "'>";
                    }
                }
            });
        }


        $('#CheckedAll').on('click', function() {
            let table = $('#table_Approve').DataTable();
            let checked = this.checked;

            table.rows({
                    search: 'applied'
                }).nodes().to$()
                .find('input[type="checkbox"]')
                .prop('checked', checked);

            searchData(checked);
        });


        function getCheckedCount() {
            return document.querySelectorAll(
                '#DataCheckbox input[name="checkedBOX[]"]'
            ).length;
        }

        function submitWithAction(action) {
            let total = getCheckedCount();

            if (total === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Tidak ada data',
                    text: 'Pilih minimal 1 data'
                });
                return;
            }

            Swal.fire({
                icon: 'question',
                title: action + ' Data?',
                html: `<b>${total}</b> data akan di-${action.toLowerCase()}`,
                showCancelButton: true,
                confirmButtonText: 'Ya, lanjutkan',
                cancelButtonText: 'Batal',
                confirmButtonColor: action === 'Approve' ? '#0d6efd' : '#dc3545'
            }).then((res) => {
                if (res.isConfirmed) {
                    let form = document.querySelector('form.form');

                    let input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'action';
                    input.value = action;

                    form.appendChild(input);
                    form.submit();
                }
            });
        }

        document.getElementById('btnApprove')
            .addEventListener('click', () => submitWithAction('Approve'));

        document.getElementById('btnReject')
            .addEventListener('click', () => submitWithAction('Reject'));
    </script>
@endsection
