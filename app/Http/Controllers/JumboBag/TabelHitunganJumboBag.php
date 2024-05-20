<?php

namespace App\Http\Controllers\JumboBag;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Session;

class TabelHitunganJumboBag extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.TabelHitungan', compact('access'));

    }

    public function getDataCustomerJBB(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'Nama_Customer',
            1 => 'Kode_Customer'
        );

        $totalData = DB::connection('ConnJumboBag')->table('CUSTOMER')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnJumboBag')->table('CUSTOMER')
            ->select(
                'Kode_Customer',
                'Nama_Customer'
            );

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('Kode_Customer', 'LIKE', "%{$search}%")
                ->orWhere('Nama_Customer', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['Kode_Customer'] = $dataorder->Kode_Customer;
                $nestedData['Nama_Customer'] = $dataorder->Nama_Customer;
                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );

        return response()->json($json_data);
    }

    public function create()
    {
        dd('Masuk Create');

    }

    public function store(Request $request)
    {
        dd('Masuk Store');

    }

    public function show($id)
    {
        dd('Masuk Show');

    }

    public function edit($id)
    {
        dd('Masuk Edit');

    }

    public function update(Request $request, $id)
    {
        dd('Masuk Update');

    }

    public function destroy($id)
    {
        dd('Masuk Destroy');

    }
}
