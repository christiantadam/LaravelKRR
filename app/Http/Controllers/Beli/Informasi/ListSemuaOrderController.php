<?php

namespace App\Http\Controllers\Beli\Informasi;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Session;

class ListSemuaOrderController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Daftar Harga');
        // dd($result);
        if ($result > 0) {
            return view('Beli.Informasi.ListSemuaOrder', compact('access'));
        } else {
            abort(403);
        }
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function getAllOrder(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'Tgl_order',
            1 => 'NO_ORDER',
            2 => 'STATUS_PO',
            3 => 'TglAprMGR',
            4 => 'STATUS_BELI',
            5 => 'NO_PO',
            6 => 'TGL_PO',
            7 => 'NM_USER',
            8 => 'No_BTTB',
        );

        $totalData = DB::connection('ConnPurchase')->table('VW_5409_ORDER_MOVEMENT')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnPurchase')->table('VW_5409_ORDER_MOVEMENT')
            ->select(
                'Tgl_order',
                'NO_ORDER',
                'STATUS_PO',
                'TglAprMGR',
                'STATUS_BELI',
                'NO_PO',
                'TGL_PO',
                'NM_USER',
                'No_BTTB',
            );

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('NO_ORDER', 'LIKE', "%{$search}%")
                ->orWhere('STATUS_PO', 'LIKE', "%{$search}%")
                ->orWhere('TglAprMGR', 'LIKE', "%{$search}%")
                ->orWhere('STATUS_BELI', 'LIKE', "%{$search}%")
                ->orWhere('NO_PO', 'LIKE', "%{$search}%")
                ->orWhere('TGL_PO', 'LIKE', "%{$search}%")
                ->orWhere('NM_USER', 'LIKE', "%{$search}%")
                ->orWhere('No_BTTB', 'LIKE', "%{$search}%")
                ->orWhere('Tgl_order', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['Tgl_order'] = $dataorder->Tgl_order;
                $nestedData['NO_ORDER'] = $dataorder->NO_ORDER;
                $nestedData['STATUS_PO'] = $dataorder->STATUS_PO;
                $nestedData['TglAprMGR'] = $dataorder->TglAprMGR;
                $nestedData['STATUS_BELI'] = $dataorder->STATUS_BELI;
                $nestedData['NO_PO'] = $dataorder->NO_PO;
                $nestedData['TGL_PO'] = $dataorder->TGL_PO;
                $nestedData['NM_USER'] = $dataorder->NM_USER;
                $nestedData['No_BTTB'] = $dataorder->No_BTTB;
                $csrfToken = Session::get('_token');
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

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
