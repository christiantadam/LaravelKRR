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

    public function getDataNamaBarangJBB(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $checkAvailabilityNamaBarang = DB::connection('ConnJumboBag')->table('KODE_BARANG')->where('Kode_Customer', $request->id_customer)->count();
        if ($checkAvailabilityNamaBarang > 0) {
            $columns = array(
                0 => 'kode_barang',
                1 => 'tanggal'
            );

            $totalData = DB::connection('ConnJumboBag')->table('KODE_BARANG')
                ->where('Kode_Customer', $request->id_customer)
                ->count();

            $totalFiltered = $totalData;

            $limit = $request->input('length');
            $start = $request->input('start');
            $order = $columns[$request->input('order.0.column')];
            $dir = $request->input('order.0.dir');

            $query = DB::connection('ConnJumboBag')->table('KODE_BARANG')
                ->select(
                    'kode_barang',
                    'tanggal'
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
                    $nestedData['kode_barang'] = $dataorder->kode_barang;
                    $nestedData['tanggal'] = $dataorder->tanggal;
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
        } else {
            return response()->json('Tidak ada kode barang untuk customer yang dipilih!');
        }
    }

    public function getDataModelBodyJBB(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'Nama_Model',
            1 => 'Kode_Model'
        );

        $totalData = DB::connection('ConnJumboBag')->table('MODEL_BODY_BESAR')
            ->where('Bentuk', $request->body_bentuk)
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnJumboBag')->table('MODEL_BODY_BESAR')
            ->select(
                'Kode_Model',
                'Nama_Model'
            )
            ->where('Bentuk', $request->body_bentuk);

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('Kode_Model', 'LIKE', "%{$search}%")
                ->orWhere('Nama_Model', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['Kode_Model'] = $dataorder->Kode_Model;
                $nestedData['Nama_Model'] = $dataorder->Nama_Model;
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

    public function getDataModelCerobongAtasJBB(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'Nama_Model',
            1 => 'Kode_Model'
        );

        $totalData = DB::connection('ConnJumboBag')->table('MODEL_CEROBONG_ATAS')
            ->where('Bentuk', $request->cerobongAtas_bentuk)
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnJumboBag')->table('MODEL_CEROBONG_ATAS')
            ->select(
                'Kode_Model',
                'Nama_Model'
            )
            ->where('Bentuk', $request->cerobongAtas_bentuk);

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('Kode_Model', 'LIKE', "%{$search}%")
                ->orWhere('Nama_Model', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['Kode_Model'] = $dataorder->Kode_Model;
                $nestedData['Nama_Model'] = $dataorder->Nama_Model;
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

    public function getDataModelCerobongBawahJBB(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'Nama_Model',
            1 => 'Kode_Model'
        );

        $totalData = DB::connection('ConnJumboBag')->table('MODEL_CEROBONG_BAWAH')
            ->where('Bentuk', $request->cerobongBawah_bentuk)
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnJumboBag')->table('MODEL_CEROBONG_BAWAH')
            ->select(
                'Kode_Model',
                'Nama_Model'
            )
            ->where('Bentuk', $request->cerobongBawah_bentuk);

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('Kode_Model', 'LIKE', "%{$search}%")
                ->orWhere('Nama_Model', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['Kode_Model'] = $dataorder->Kode_Model;
                $nestedData['Nama_Model'] = $dataorder->Nama_Model;
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

    public function getDataWarnaBeltReinforcedJBB(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'Nama_Warna',
            1 => 'Kode_Warna'
        );

        $totalData = DB::connection('ConnJumboBag')->table('WARNA')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnJumboBag')->table('WARNA')
            ->select(
                'Kode_Warna',
                'Nama_Warna'
            );

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('Kode_Warna', 'LIKE', "%{$search}%")
                ->orWhere('Nama_Warna', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['Kode_Warna'] = $dataorder->Kode_Warna;
                $nestedData['Nama_Warna'] = $dataorder->Nama_Warna;
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

    public function getDataLamiReinforcedJBB(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'Nama_Lami',
            1 => 'Kode_Lami'
        );

        $totalData = DB::connection('ConnJumboBag')->table('LAMI')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnJumboBag')->table('LAMI')
            ->select(
                'Kode_Lami',
                'Nama_Lami'
            );

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('Kode_Lami', 'LIKE', "%{$search}%")
                ->orWhere('Nama_Lami', 'LIKE', "%{$search}%");
            $totalFiltered = $query->count();
        }

        $order = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($order)) {
            foreach ($order as $dataorder) {
                $nestedData['Kode_Lami'] = $dataorder->Kode_Lami;
                $nestedData['Nama_Lami'] = $dataorder->Nama_Lami;
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
