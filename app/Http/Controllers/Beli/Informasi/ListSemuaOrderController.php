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
            5 => 'TGL_PO',
            6 => 'KODE_BARANG',
            7 => 'NM_BARANG',
            8 => 'SUB_KATEGORI',
            9 => 'SUPPLIER',
            10 => 'PriceUnit',
            11 => 'PPN',
            12 => 'QTY_PO',
            13 => 'SATUAN',
            14 => 'PAY_TERM',
            15 => 'NM_USER',
            16 => 'NM_DIVISI',
            17 => 'No_BTTB',
            18 => 'TGL_DATANG',
            19 => 'NOTELINE',
            20 => 'Ket_Internal',
        );

        // No. Order {{--0--}}
        // Status Order  {{--1--}}
        // Tgl. Approve Mgr. {{--2--}}
        // Status Beli {{--3--}}
        // No. PO {{--4--}}
        // Tgl. PO {{--5--}}
        // Kode Barang {{--6--}}
        // Nama Barang {{--7--}}
        // Sub Kategori {{--8--}}
        // Supplier {{--9--}}
        // Price Unit {{--10--}}
        // PPN (%) {{--11--}}
        // Qty. PO {{--12--}}
        // Satuan {{--13--}}
        // Payment Term {{--14--}}
        // Nama User {{--15--}}
        // Nama Divisi {{--16--}}
        // No. BTTB {{--17--}}
        // Tgl. Datang {{--18--}}
        // Keterangan Order {{--19--}}
        // Keterangan Internal {{--20--}}

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
                'TGL_PO',
                'KODE_BARANG',
                'NM_BARANG',
                'SUB_KATEGORI',
                'SUPPLIER',
                'PriceUnit',
                'PPN',
                'QTY_PO',
                'SATUAN',
                'PAY_TERM',
                'NM_USER',
                'NM_DIVISI',
                'No_BTTB',
                'TGL_DATANG',
                'NOTELINE',
                'Ket_Internal',
            );

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('NO_ORDER', 'LIKE', "%{$search}%")
                ->orWhere('STATUS_PO', 'LIKE', "%{$search}%")
                ->orWhere('TglAprMGR', 'LIKE', "%{$search}%")
                ->orWhere('STATUS_BELI', 'LIKE', "%{$search}%")
                ->orWhere('NO_PO', 'LIKE', "%{$search}%")
                ->orWhere('TGL_PO', 'LIKE', "%{$search}%")
                ->orWhere('KODE_BARANG', 'LIKE', "%{$search}%")
                ->orWhere('NM_BARANG', 'LIKE', "%{$search}%")
                ->orWhere('SUB_KATEGORI', 'LIKE', "%{$search}%")
                ->orWhere('SUPPLIER', 'LIKE', "%{$search}%")
                ->orWhere('PriceUnit', 'LIKE', "%{$search}%")
                ->orWhere('PPN', 'LIKE', "%{$search}%")
                ->orWhere('QTY_PO', 'LIKE', "%{$search}%")
                ->orWhere('SATUAN', 'LIKE', "%{$search}%")
                ->orWhere('PAY_TERM', 'LIKE', "%{$search}%")
                ->orWhere('NM_USER', 'LIKE', "%{$search}%")
                ->orWhere('NM_DIVISI', 'LIKE', "%{$search}%")
                ->orWhere('No_BTTB', 'LIKE', "%{$search}%")
                ->orWhere('TGL_DATANG', 'LIKE', "%{$search}%")
                ->orWhere('NOTELINE', 'LIKE', "%{$search}%")
                ->orWhere('Ket_Internal', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['NO_ORDER'] = $dataorder->NO_ORDER ?? null;
                $nestedData['STATUS_PO'] = $dataorder->STATUS_PO ?? null;
                $nestedData['TglAprMGR'] = $dataorder->TglAprMGR ?? null;
                $nestedData['STATUS_BELI'] = $dataorder->STATUS_BELI ?? null;
                $nestedData['NO_PO'] = $dataorder->NO_PO ?? null;
                $nestedData['TGL_PO'] = $dataorder->TGL_PO ?? null;
                $nestedData['KODE_BARANG'] = $dataorder->KODE_BARANG ?? null;
                $nestedData['NM_BARANG'] = $dataorder->NM_BARANG ?? null;
                $nestedData['SUB_KATEGORI'] = $dataorder->SUB_KATEGORI ?? null;
                $nestedData['SUPPLIER'] = $dataorder->SUPPLIER ?? null;
                $nestedData['PriceUnit'] = $dataorder->PriceUnit ?? null;
                $nestedData['PPN'] = $dataorder->PPN ?? null;
                $nestedData['QTY_PO'] = $dataorder->QTY_PO ?? null;
                $nestedData['SATUAN'] = $dataorder->SATUAN ?? null;
                $nestedData['PAY_TERM'] = $dataorder->PAY_TERM ?? null;
                $nestedData['NM_USER'] = $dataorder->NM_USER ?? null;
                $nestedData['NM_DIVISI'] = $dataorder->NM_DIVISI ?? null;
                $nestedData['No_BTTB'] = $dataorder->No_BTTB ?? null;
                $nestedData['TGL_DATANG'] = $dataorder->TGL_DATANG ?? null;
                $nestedData['NOTELINE'] = $dataorder->NOTELINE ?? null;
                $nestedData['Ket_Internal'] = $dataorder->Ket_Internal ?? null;
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
