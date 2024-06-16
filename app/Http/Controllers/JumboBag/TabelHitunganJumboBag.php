<?php

namespace App\Http\Controllers\JumboBag;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Support\Facades\Auth;
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
        // dd($request->all());
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $checkAvailabilityNamaBarang = DB::connection('ConnJumboBag')
            ->table('KODE_BARANG')
            ->where('Kode_Customer', $request->id_customer)
            ->count(); //SP_1273_JBB_CHECK_CUST_KDBRG
        // dd($checkAvailabilityNamaBarang);
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
                )
                ->where('Kode_Customer', $request->id_customer);

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

    // public function GetDataTglUpdateTH($kodeBarang)
    // {
    //     $kodeBarangDecode = urldecode($kodeBarang);
    //     $data = DB::connection('ConnJumboBag')->table('KODE_BARANG')->where('Kode_Barang', $kodeBarangDecode)->select('Tgl_Update')->get();
    //     return response()->json($data);
    // }

    // public function GetDataHeadTH($kodeBarang)
    // {
    //     $kodeBarangDecode = urldecode($kodeBarang);
    //     $data = DB::connection('ConnJumboBag')->table('VW_PRG_1273_JBB_LIST_HEADTH')->where('Kode_Barang', $kodeBarangDecode)->get();
    //     return response()->json($data);
    // }

    // public function GetDataRincianTH($kodeBarang, $namaCustomer)
    // {
    //     $kodeBarangDecode = urldecode($kodeBarang);
    //     $namaCustomerDecode = urldecode($namaCustomer);
    //     // dd($kodeBarang, $kodeBarangDecode, $namaCustomer, $namaCustomerDecode);
    //     $data = DB::connection('ConnJumboBag')->table('VW_PRG_1273_JBB_LIST_KDBRG_RINCIANTH')->where('Kode_Barang', $kodeBarangDecode)->where('Nama_Customer', $namaCustomerDecode)->orderBy('Kode_Komponen', 'asc')->orderBy('Kounter_Komponen', 'asc')->get();
    //     return response()->json($data);
    // }

    public function GetDataKoreksi($kodeBarang, $namaCustomer)
    {
        $kodeBarangDecode = urldecode($kodeBarang);
        $namaCustomerDecode = urldecode($namaCustomer);
        // dd($kodeBarang, $kodeBarangDecode, $namaCustomer, $namaCustomerDecode);
        $dataTglUpdateTH = DB::connection('ConnJumboBag')->table('KODE_BARANG')->where('Kode_Barang', $kodeBarangDecode)->select('Tgl_Update')->get();
        $dataHeadTH = DB::connection('ConnJumboBag')->table('VW_PRG_1273_JBB_LIST_HEADTH')->where('Kode_Barang', $kodeBarangDecode)->get();
        $dataRincianTH = DB::connection('ConnJumboBag')->table('VW_PRG_1273_JBB_LIST_KDBRG_RINCIANTH')->where('Kode_Barang', $kodeBarangDecode)->where('Nama_Customer', $namaCustomerDecode)->orderBy('Kode_Komponen', 'asc')->orderBy('Kounter_Komponen', 'asc')->get();
        $data = [$dataTglUpdateTH, $dataHeadTH, $dataRincianTH];
        return response()->json($data);
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

    function loadDataRincianTableHitunganJumboBag($KodeBarang, $NamaCustomer)
    {
        $data = DB::connection('ConnJumboBag')->select('exec SP_1273_JBB_LIST_KDBRG_RINCIANTH @KodeBarang = ?, @NamaCustomer = ?', [$KodeBarang, $NamaCustomer]);
        return response()->json($data);
    }

    public function create()
    {
        dd('Masuk Create');

    }

    public function store(Request $request)
    {
        // dd('Masuk Store', $request->all());
        if ($request->mode_insert == "Master") {
            try {
                DB::connection('ConnJumboBag')->statement('exec SP_1273_JBB_INS_HEADTH @KodeBarang = ?,
            @BentukBB = ?,
            @ModelBB = ?,
            @KodeModelBB = ?,
            @PanjangBB = ?,
            @LebarBB = ?,
            @TinggiBB = ?,
            @DiameterBB = ?,
            @BentukCA = ?,
            @ModelCA = ?,
            @KodeModelCA = ?,
            @PanjangCA = ?,
            @LebarCA = ?,
            @TinggiCA = ?,
            @DiameterCA = ?,
            @BentukCB = ?,
            @ModelCB = ?,
            @KodeModelCB = ?,
            @PanjangCB = ?,
            @LebarCB = ?,
            @TinggiCB = ?,
            @DiameterCB = ?,
            @Reinforced = ?,
            @Warna = ?,
            @BeltRope = ?,
            @Loop = ?,
            @TinggiLoop = ?,
            @Swl = ?,
            @Sf1 = ?,
            @Sf2 = ?,
            @Lami = ?,
            @StatusLami = ?,
            @TebalLami = ?,
            @Inner = ?,
            @Tebalinner = ?,
            @Seal = ?,
            @Keterangan = ?,
            @StdWaktu = ?,
            @JmlReinf = ?,
            @JarakReinf = ?,
            @StatusPrinting = ?,
            @Usage_type = ?',
                    [
                        $request->input('KodeBarang'),
                        $request->input('BentukBB'),
                        $request->input('ModelBB'),
                        $request->input('KodeModelBB'),
                        $request->input('PanjangBB'),
                        $request->input('LebarBB'),
                        $request->input('TinggiBB'),
                        $request->input('DiameterBB'),
                        $request->input('BentukCA'),
                        $request->input('ModelCA'),
                        $request->input('KodeModelCA'),
                        $request->input('PanjangCA'),
                        $request->input('LebarCA'),
                        $request->input('TinggiCA'),
                        $request->input('DiameterCA'),
                        $request->input('BentukCB'),
                        $request->input('ModelCB'),
                        $request->input('KodeModelCB'),
                        $request->input('PanjangCB'),
                        $request->input('LebarCB'),
                        $request->input('TinggiCB'),
                        $request->input('DiameterCB'),
                        $request->input('Reinforced'),
                        $request->input('Warna'),
                        $request->input('BeltRope'),
                        $request->input('Loop'),
                        $request->input('TinggiLoop'),
                        $request->input('Swl'),
                        $request->input('Sf1'),
                        $request->input('Sf2'),
                        $request->input('Lami'),
                        $request->input('StatusLami'),
                        $request->input('TebalLami'),
                        $request->input('Inner'),
                        $request->input('Tebalinner'),
                        $request->input('Seal') ?? null,
                        $request->input('Keterangan'),
                        $request->input('StdWaktu'),
                        $request->input('JmlReinf'),
                        $request->input('JarakReinf'),
                        $request->input('StatusPrinting'),
                        $request->input('Usage_type'),
                    ]
                );

                DB::connection('ConnJumboBag')->statement('exec SP_1273_JBB_INS_KDBRG @KodeCustomer = ?,
            @KodeBarang = ?,
            @Tanggal = ?,
            @Tgl_Update = ?,
            @User_Login = ?',
                    [
                        $request->input('KodeCustomer'),
                        $request->input('KodeBarang'),
                        $request->input('Tanggal'),
                        $request->input('Tgl_Update'),
                        Auth::user()->NomorUser
                    ]
                );
                return response()->json(['success' => 'Record Master dan Kode Barang inserted successfully.']);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }

        } else if ($request->mode_insert == "BodyBesar") {
            switch ($request->mode_insert) {
                case "BodyBesar":
                    $kodeKomponen = "01BB00";
                    break;
                case "BodySampingI":
                case "BodySampingII":
                    $kodeKomponen = "02BS00";
                    break;
                case "TutupAtas":
                    $kodeKomponen = "03TA00";
                    break;
                case "TutupBawah":
                    $kodeKomponen = "04TB00";
                    break;
                case "CerobongAtas":
                    $kodeKomponen = "05CA00";
                    break;
                case "CerobongBawah":
                    $kodeKomponen = "06CB00";
                    break;
            }

            try {
                DB::connection('ConnJumboBag')->statement('exec SP_1273_JBB_INS_RINCIANTH
                @KodeBarang = ?,
                @KodeKomponen = ?,
                @StandartKomponen = ?,
                @Panjang = ?,
                @Lebar = ?,
                @WA = ?,
                @WE = ?,
                @Denier = ?,
                @Quantity = ?,
                @Berat = ?,
                @Harga = ?,
                @SubTotal = ?,
                @Kounter = ?',
                    [
                        $request->input('KodeBarang'),
                        $request->input('KodeKomponen'),
                        $kodeKomponen,
                        $request->input('Panjang'),
                        $request->input('Lebar'),
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        $request->input('Kounter'),
                    ]
                );
                return response()->json(['success' => 'Record Body Besar inserted successfully.']);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
        }

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
        if ($request->mode_update == "HeadUpdate") {
            try {
                DB::connection('ConnJumboBag')->statement('exec SP_1273_JBB_UDT_LOGIN_KDBRG @KodeBarang = ?,
            @Tgl_Update = ?,
            @User_Login = ?',
                    [
                        $id,
                        $request->input('Tgl_Update'),
                        Auth::user()->NomorUser
                    ]
                );

                DB::connection('ConnJumboBag')->statement('exec SP_1273_JBB_UDT_HEADTH @KodeBarang = ?,
            @BentukBB = ?,
            @ModelBB = ?,
            @KodeModelBB = ?,
            @PanjangBB = ?,
            @LebarBB = ?,
            @TinggiBB = ?,
            @DiameterBB = ?,
            @BentukCA = ?,
            @ModelCA = ?,
            @KodeModelCA = ?,
            @PanjangCA = ?,
            @LebarCA = ?,
            @TinggiCA = ?,
            @DiameterCA = ?,
            @BentukCB = ?,
            @ModelCB = ?,
            @KodeModelCB = ?,
            @PanjangCB = ?,
            @LebarCB = ?,
            @TinggiCB = ?,
            @DiameterCB = ?,
            @Reinforced = ?,
            @Warna = ?,
            @BeltRope = ?,
            @Loop = ?,
            @TinggiLoop = ?,
            @Swl = ?,
            @Sf1 = ?,
            @Sf2 = ?,
            @Lami = ?,
            @StatusLami = ?,
            @TebalLami = ?,
            @Inner = ?,
            @Tebalinner = ?,
            @Seal = ?,
            @Keterangan = ?,
            @StdWaktu = ?,
            @JmlReinf = ?,
            @JarakReinf = ?,
            @StatusPrinting = ?,
            @Usage_type = ?
            @UserUpdate = ?',
                    [
                        $id,
                        $request->input('BentukBB'),
                        $request->input('ModelBB'),
                        $request->input('KodeModelBB'),
                        $request->input('PanjangBB'),
                        $request->input('LebarBB'),
                        $request->input('TinggiBB'),
                        $request->input('DiameterBB'),
                        $request->input('BentukCA'),
                        $request->input('ModelCA'),
                        $request->input('KodeModelCA'),
                        $request->input('PanjangCA'),
                        $request->input('LebarCA'),
                        $request->input('TinggiCA'),
                        $request->input('DiameterCA'),
                        $request->input('BentukCB'),
                        $request->input('ModelCB'),
                        $request->input('KodeModelCB'),
                        $request->input('PanjangCB'),
                        $request->input('LebarCB'),
                        $request->input('TinggiCB'),
                        $request->input('DiameterCB'),
                        $request->input('Reinforced'),
                        $request->input('Warna'),
                        $request->input('BeltRope'),
                        $request->input('Loop'),
                        $request->input('TinggiLoop'),
                        $request->input('Swl'),
                        $request->input('Sf1'),
                        $request->input('Sf2'),
                        $request->input('Lami'),
                        $request->input('StatusLami'),
                        $request->input('TebalLami'),
                        $request->input('Inner'),
                        $request->input('Tebalinner'),
                        $request->input('Seal') ?? null,
                        $request->input('Keterangan'),
                        $request->input('StdWaktu'),
                        $request->input('JmlReinf'),
                        $request->input('JarakReinf'),
                        $request->input('StatusPrinting'),
                        $request->input('Usage_type'),
                        Auth::user()->NomorUser
                    ]
                );

                return response()->json(['success' => 'Record Head Table Hitungan updated successfully.']);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
        }
    }

    public function destroy($id)
    {
        try {
            $checkData = DB::connection('ConnJumboBag')->select(
                'exec SP_1273_JBB_CHECKKD_HEADTO @KodeBarang = ?',
                [
                    $id
                ]
            );
            if (!empty($checkData) && $checkData[0]->Ada > 0) {
                return response()->json(['error' => 'Data tidak dapat dihapus karena sudah ada tabel ordernya']);
            } else {
                DB::connection('ConnJumboBag')->select(
                    'exec SP_1273_JBB_DLT_All_RINCIANTH @KodeBarang = ?',
                    [
                        $id
                    ]
                );
                DB::connection('ConnJumboBag')->select(
                    'exec SP_1273_JBB_DLT_KDBRG @KodeBarang = ?',
                    [
                        $id
                    ]
                );
                DB::connection('ConnJumboBag')->select(
                    'exec SP_1273_JBB_DLT_HEADTH @KodeBarang = ?',
                    [
                        $id
                    ]
                );
                return response()->json(['success' => 'Record Table Hitungan deleted successfully.']);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
