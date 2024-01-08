@extends('layouts.appExtruder')
@section('content')

<div id="tropodo_order_acc" class="form" data-aos="fade-up">
    <form>
        <table class="table table-hover mt-3">
            <thead>
                <tr>
                    <th scope="col">Identifikasi Order</th>
                    <th scope="col">Id Order</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>temp</td>
                    <td>temp</td>
                </tr>
                <tr>
                    <td>temp</td>
                    <td>temp</td>
                </tr>
                <tr>
                    <td>temp</td>
                    <td>temp</td>
                </tr>
            </tbody>
        </table>

        <table class="table table-hover mt-5" style="table-layout: fixed;">
            <colgroup>
                <col style="width: 300px;">
                <col style="width: 125px;">
                <col style="width: 125px;">
                <col style="width: 125px;">
                <col style="width: 125px;">
                <col style="width: 125px;">
                <col style="width: 125px;">
            </colgroup>
            <thead>
                <tr>
                    <th>Nama Type</th>
                    <th class="text-center">Qty Primer</th>
                    <th class="text-center">Sat Primer</th>
                    <th class="text-center">Qty Sekunder</th>
                    <th class="text-center">Sat Sekunder</th>
                    <th class="text-center">Qty Tertier</th>
                    <th class="text-center">Sat Tertier</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Data 1</td>
                    <td class="text-center">10</td>
                    <td class="text-center">kg</td>
                    <td class="text-center">5</td>
                    <td class="text-center">kg</td>
                    <td class="text-center">3</td>
                    <td class="text-center">kg</td>
                </tr>
                <tr>
                    <td>Data 2</td>
                    <td class="text-center">8</td>
                    <td class="text-center">kg</td>
                    <td class="text-center">4</td>
                    <td class="text-center">kg</td>
                    <td class="text-center">2</td>
                    <td class="text-center">kg</td>
                </tr>
                <tr>
                    <td>Data 3</td>
                    <td class="text-center">15</td>
                    <td class="text-center">kg</td>
                    <td class="text-center">6</td>
                    <td class="text-center">kg</td>
                    <td class="text-center">1</td>
                    <td class="text-center">kg</td>
                </tr>
            </tbody>
        </table>

        <div class="float-end mt-3">
            <button type="submit" class="btn btn-outline-success">Proses</button>
            <button type="button" class="btn btn-outline-danger">Keluar</button>
        </div>
    </form>
</div>

@endsection