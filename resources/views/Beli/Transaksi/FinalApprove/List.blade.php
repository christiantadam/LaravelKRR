@extends('layouts.appOrderPembelian')
@section('title', 'Final Approve Pembelian')
@section('content')
@include('Beli/Transaksi/FinalApprove/modalDetailFinal')
<link rel="stylesheet" href="{{ asset('css/orderPembelianStyling.css') }}">
<script src="{{ asset('js/OrderPembelian/FinalApprove/FinalApprove.js') }}"></script>


<script>
$(document).ready(function () {
    $('#table_Approve').DataTable({
        order: [[4, 'asc']],
        columnDefs: [{ orderable: false, targets: 0 }]
    });
});
</script>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List Final Approve</div>

                <form class="form" method="POST" action="{{ url('/FinalApprove') }}">
                    @csrf


                    <div id="DataCheckbox"></div>

                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        @if (session('danger'))
                            <div class="alert alert-danger">
                                {{ session('danger') }}
                            </div>
                        @endif

                        <table id="table_Approve" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th class="text-center">
                                        <input type="checkbox" id="CheckedAll" class="RDZCheckBoxSize">
                                    </th>
                                    <th>No. Trans</th>
                                    <th class="text-center">
                                        Tanggal<br>
                                        <small>(MM-DD-YYYY)</small>
                                    </th>
                                    <th>Nama Barang</th>
                                    <th>Divisi</th>
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($data as $item)
                                <tr>
                                    <td class="text-center">
                                        <input type="checkbox"
                                               value="{{ $item->No_trans }}"
                                               id="{{ $item->No_trans }}"
                                               onclick="x('{{ $item->No_trans }}')"
                                               style="width:20px;height:20px;">
                                    </td>
                                    <td>
                                        <a class="DetailFinal"
                                           data-id="{{ $item->No_trans }}"
                                           href="{{ route('finalapprove.update', $item->No_trans) }}">
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
                                    <td>{{ $item->Kd_div }}</td>
                                    <td>{{ $item->Nama }}</td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    <div class="card-footer RDZApproveRejectButton">
                        <button type="button" class="btn btn-md btn-primary" id="btnFinalApprove">
                            Final Approve
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>


<script>

$(".DetailFinal").on('auxclick', function (e) {
    if (e.button === 1) e.preventDefault();
});


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

    table.rows({ search: 'applied' }).every(function () {
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


$('#CheckedAll').on('click', function () {
    let table = $('#table_Approve').DataTable();
    let checked = this.checked;

    table.rows({ search: 'applied' }).nodes().to$()
        .find('input[type="checkbox"]')
        .prop('checked', checked);

    searchData(checked);
});


function getCheckedCount() {
    return document.querySelectorAll(
        '#DataCheckbox input[name="checkedBOX[]"]'
    ).length;
}

document.getElementById('btnFinalApprove')
    .addEventListener('click', function () {

    let total = getCheckedCount();

    if (total === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Tidak ada data',
            text: 'Pilih minimal 1 data untuk Final Approve'
        });
        return;
    }

    Swal.fire({
        icon: 'question',
        title: 'Final Approve?',
        html: `<b>${total}</b> data akan di-final approve`,
        showCancelButton: true,
        confirmButtonText: 'Ya, lanjutkan',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#0d6efd'
    }).then((res) => {
        if (res.isConfirmed) {
            let form = document.querySelector('form.form');

            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'action';
            input.value = 'Approve';

            form.appendChild(input);
            form.submit();
        }
    });
});
</script>
@endsection
