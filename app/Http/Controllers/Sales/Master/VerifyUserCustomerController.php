<?php

namespace App\Http\Controllers\Sales\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class VerifyUserCustomerController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Master.VerifyUserCustomer.Index', compact('access'));
    }

    public function show($id, Request $request)
    {
        // ===============================
        // GET DATA USER
        // ===============================
        if ($id == 'getDataUser') {

            $dataUser = DB::connection('ConnSales')
                ->select('exec SP_4384_SLS_VERIFY_USER @XKode = ?', [0]);

            return datatables($dataUser)->make(true);
        }

        // ============
        // AUTO VERIFY
        // ============
        if ($id == 'updateVerification') {
            DB::connection('ConnPublicWeb')->beginTransaction();

            try {
                $idUser = $request->idUser;
                $npwp = preg_replace('/[^0-9]/', '', $request->npwp);

                // cari customer dari NPWP
                $customer = DB::connection('ConnSales')
                    ->table('T_Customer')
                    ->select('IDCust')
                    ->whereRaw("
                        REPLACE(REPLACE(REPLACE(NPWP,'.',''),'-',''),' ','') = ?
                    ", [$npwp])
                    ->first();

                if (!$customer) {
                    throw new \Exception('NPWP tidak terdaftar di customer');
                }

                // cek mapping
                $exists = DB::connection('ConnPublicWeb')
                    ->table('CustomerUserPublic')
                    ->where('IdUser', $idUser)
                    ->where('IDCust', $customer->IDCust)
                    ->exists();

                if (!$exists) {
                    DB::connection('ConnPublicWeb')
                        ->table('CustomerUserPublic')
                        ->insert([
                            'IDCust' => $customer->IDCust,
                            'IdUser' => $idUser
                        ]);
                }

                // update user
                DB::connection('ConnPublicWeb')
                    ->table('UserPublic')
                    ->where('IdUser', $idUser)
                    ->update([
                        'Verification' => 1
                    ]);

                DB::connection('ConnPublicWeb')->commit();

                return response()->json([
                    'success' => 'User berhasil diverifikasi'
                ]);

            } catch (\Exception $e) {
                DB::connection('ConnPublicWeb')->rollBack();

                return response()->json([
                    'error' => $e->getMessage()
                ]);
            }
        }

        // ===============================
        // Get List User Customer
        // ===============================
        if ($id == 'getCustomerList') {
            $data = DB::connection('ConnPublicWeb')
                ->table('UserPublic')
                ->select('IdUser', 'NamaUser', 'NamaPerusahaan')
                ->whereNotNull('NamaPerusahaan')
                ->get();

            return response()->json($data);
        }

        // ===============================
        // DETAIL USER
        // ===============================
        if ($id == 'getDetailUser') {
            $data = DB::connection('ConnPublicWeb')
                ->table('UserPublic')
                ->where('IdUser', $request->idUser)
                ->first();

            return response()->json($data);
        }

        // ==============
        // MANUAL VERIFY
        // ==============
        if ($id == 'manualVerify') {
            DB::connection('ConnPublicWeb')->beginTransaction();

            try {
                DB::connection('ConnPublicWeb')
                    ->table('UserPublic')
                    ->where('IdUser', $request->idUser)
                    ->update([
                        'NamaUser' => $request->namaUser,
                        'Email' => $request->email,
                        'NamaPerusahaan' => $request->namaPerusahaan,
                        'AlamatPerusahaan' => $request->alamatPerusahaan,
                        'NoHP' => $request->noHP,
                        'NPWP' => $request->npwp,
                        'Verification' => 1,
                    ]);

                // mapping ke customer jika NPWP ada
                $npwp = preg_replace('/[^0-9]/', '', $request->npwp);

                if ($npwp) {

                    $customer = DB::connection('ConnSales')
                        ->table('T_Customer')
                        ->select('IDCust')
                        ->whereRaw("
                            REPLACE(REPLACE(REPLACE(NPWP,'.',''),'-',''),' ','') = ?
                        ", [$npwp])
                        ->first();

                    if ($customer) {

                        $exists = DB::connection('ConnPublicWeb')
                            ->table('CustomerUserPublic')
                            ->where('IdUser', $request->idUser)
                            ->where('IDCust', $customer->IDCust)
                            ->exists();

                        if (!$exists) {
                            DB::connection('ConnPublicWeb')
                                ->table('CustomerUserPublic')
                                ->insert([
                                    'IDCust' => $customer->IDCust,
                                    'IdUser' => $request->idUser
                                ]);
                        }
                    }
                }

                DB::connection('ConnPublicWeb')->commit();

                return response()->json([
                    'success' => 'User berhasil diverifikasi manual'
                ]);

            } catch (\Exception $e) {

                DB::connection('ConnPublicWeb')->rollBack();

                return response()->json([
                    'error' => $e->getMessage()
                ]);
            }
        }

        // ===============================
        // pengecekan customer dengan T_Customer
        // ===============================
        if ($id == 'cekCustomer') {

            try {
                $user = DB::connection('ConnPublicWeb')
                    ->table('UserPublic')
                    ->where('IdUser', $request->idUser)
                    ->first();

                if (!$user) {
                    throw new \Exception('User tidak ditemukan');
                }

                $npwp = preg_replace('/[^0-9]/', '', $user->NPWP);

                $customer = DB::connection('ConnSales')
                    ->table('T_Customer')
                    ->select('IDCust')
                    ->whereRaw("
                        REPLACE(REPLACE(REPLACE(NPWP,'.',''),'-',''),' ','') = ?
                    ", [$npwp])
                    ->first();

                if ($customer) {
                    $exists = DB::connection('ConnPublicWeb')
                        ->table('CustomerUserPublic')
                        ->where('IdUser', $request->idUser)
                        ->where('IDCust', $customer->IDCust)
                        ->exists();

                    if (!$exists) {
                        DB::connection('ConnPublicWeb')
                            ->table('CustomerUserPublic')
                            ->insert([
                                'IDCust' => $customer->IDCust,
                                'IdUser' => $request->idUser
                            ]);
                    }
                }

                return response()->json([
                    'status' => 'mapped'
                ]);

            } catch (\Exception $e) {

                return response()->json([
                    'error' => $e->getMessage()
                ]);
            }
        }

        if ($id == 'getAvailableCustomer') {
            $idUser = $request->idUser;

            // ambil yang sudah di-mapping
            $mapped = DB::connection('ConnPublicWeb')
                ->table('CustomerUserPublic')
                ->pluck('IDCust');

            $query = DB::connection('ConnSales')
                ->table('T_Customer')
                ->select([
                    'IDCust',
                    'NamaCust',
                    'Alamat',
                    'AlamatKirim',
                    'Kota',
                    'KotaKirim',
                    'NPWP'
                ])
                ->when($mapped->isNotEmpty(), function ($q) use ($mapped) {
                    $q->whereNotIn('IDCust', $mapped);
                });

            return datatables($query)->make(true);
        }

        if ($id == 'getConnectedCustomer') {
            $mapping = DB::connection('ConnPublicWeb')
                ->table('CustomerUserPublic')
                ->get();

            if ($mapping->isEmpty()) {
                return datatables(collect([]))->make(true);
            }

            // ambil semua IDCust
            $idcustList = $mapping->pluck('IDCust')->map(fn($id) => (int)$id)->toArray();

            // ambil data customer dari ConnSales
            $customers = DB::connection('ConnSales')
                ->table('T_Customer')
                ->whereIn('IDCust', $idcustList)
                ->get()
                ->keyBy(fn($item) => (int)$item->IDCust);

            // ambil semua user (biar bisa mapping nama user)
            $users = DB::connection('ConnPublicWeb')
                ->table('UserPublic')
                ->get()
                ->keyBy('IdUser');

            // mapping hasil
            $data = $mapping->map(function ($row) use ($customers, $users) {

                $idcust = (int) $row->IDCust;

                if (!isset($customers[$idcust])) return null;

                $cust = $customers[$idcust];
                $user = $users[$row->IdUser] ?? null;

                return [
                    'IDCust' => $idcust,
                    'NamaCust' => $cust->NamaCust,
                    'Kota' => $cust->Kota,
                    'NPWP' => $cust->NPWP,
                    'NamaUser' => $user->NamaUser ?? '',
                    'NamaPerusahaan' => $user->NamaPerusahaan ?? ''
                ];

            })->filter()->values();

            return datatables($data)->make(true);
        }

        if ($id == 'addCustomerManual') {
            DB::connection('ConnPublicWeb')->beginTransaction();

            try {

                $idUser = $request->idUser;
                $customers = $request->customers ?? [];

                if (!is_array($customers)) {
                    $customers = [$customers];
                }

                if (empty($customers)) {
                    throw new \Exception('Tidak ada customer dipilih');
                }

                foreach ($customers as $idcust) {

                    $exists = DB::connection('ConnPublicWeb')
                        ->table('CustomerUserPublic')
                        ->where('IdUser', $idUser)
                        ->where('IDCust', $idcust)
                        ->exists();

                    if (!$exists) {
                        DB::connection('ConnPublicWeb')
                            ->table('CustomerUserPublic')
                            ->insert([
                                'IDCust' => $idcust,
                                'IdUser' => $idUser
                            ]);
                    }
                }

                DB::connection('ConnPublicWeb')->commit();

                return response()->json([
                    'success' => 'Customer berhasil ditambahkan'
                ]);

            } catch (\Exception $e) {

                DB::connection('ConnPublicWeb')->rollBack();

                return response()->json([
                    'error' => $e->getMessage()
                ]);
            }
        }

        // ===============================
        // DEFAULT
        // ===============================
        return response()->json([
            'error' => 'Invalid action'
        ], 400);
    }
}
