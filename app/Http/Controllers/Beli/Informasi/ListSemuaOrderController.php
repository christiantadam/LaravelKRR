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
        $result = (new HakAksesController)->HakAksesFitur('List Semua Order');
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
            0 => 'NO_ORDER',
            1 => 'STATUS_PO',
            2 => 'TglAprMGR',
            3 => 'STATUS_BELI',
            4 => 'NO_PO',
            5 => 'NM_BARANG',
            6 => 'SUB_KATEGORI',
            7 => 'QTY_PO',
            8 => 'TGL_PO',
            9 => 'NM_USER',
            10 => 'No_BTTB',
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
                'NO_ORDER',
                'STATUS_PO',
                'TglAprMGR',
                'STATUS_BELI',
                'NO_PO',
                'NM_BARANG',
                'SUB_KATEGORI',
                'QTY_PO',
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
                ->orWhere('NM_BARANG', 'LIKE', "%{$search}%")
                ->orWhere('SUB_KATEGORI', 'LIKE', "%{$search}%")
                ->orWhere('QTY_PO', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['NO_ORDER'] = $dataorder->NO_ORDER;
                $nestedData['STATUS_PO'] = $dataorder->STATUS_PO;
                $nestedData['TglAprMGR'] = $dataorder->TglAprMGR;
                $nestedData['STATUS_BELI'] = $dataorder->STATUS_BELI;
                $nestedData['NO_PO'] = $dataorder->NO_PO;
                $nestedData['NM_BARANG'] = $dataorder->NM_BARANG;
                $nestedData['SUB_KATEGORI'] = $dataorder->SUB_KATEGORI;
                $nestedData['QTY_PO'] = $dataorder->QTY_PO;
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
