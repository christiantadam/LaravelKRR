<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Voucher</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 210mm;
            margin: 0 auto;
            padding: 10mm;
        }

        .header,
        .footer {
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            margin: 20px 0;
        }

        .content table {
            width: 100%;
            border-collapse: collapse;
        }

        .content table,
        .content th,
        .content td {
            border: 1px solid black;
        }

        .content th,
        .content td {
            padding: 8px;
            text-align: left;
        }

        /* .content th {
            background-color: #f2f2f2;
        } */

        .signature {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }

        .signature div {
            text-align: center;
        }

        .note {
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h3 style="text-align: left;">Payment Voucher</h3>
            <h2 style="text-align: left;">PT. KETRA RAJASA RAYA</h2>
        </div>
        <div class="content">
            <table style="border:none !important">
                <tr style="border:none !important">
                    <td style="width: 80px; border:none !important">Name</td>
                    <td style="width: 5px; border:none !important">:</td>
                    <td style="width: 140px; border:none !important"></td>
                    <td style="width: 80px; border:none !important">Date</td>
                    <td style="width: 5px; border:none !important">:</td>
                    <td style="border:none !important"></td>
                    <td style="width: 80px; border:none !important">Voucher</td>
                    <td style="width: 5px; border:none !important">:</td>
                    <td style="border:none !important"></td>
                </tr>
                <tr>
                    <td style="width: 80px; border:none !important">Description</td>
                    <td style="width: 5px; border:none !important">:</td>
                    <td style="width: 140px; border:none !important"></td>
                    <td style="width: 80px; border:none !important">Paid To</td>
                    <td style="width: 5px; border:none !important">:</td>
                    <td style="border:none !important"></td>
                    <td style="width: 80px; border:none !important">Posted On</td>
                    <td style="width: 5px; border:none !important">:</td>
                    <td style="border:none !important"></td>
                </tr>
            </table>
            <table style="margin-top: 20px; border:none !important">
                <thead style="border:none !important">
                    <tr style="border:none !important">
                        <th style="border:none !important; border-bottom: 1px solid black !important">C.O.A</th>
                        <th style="border:none !important; border-bottom: 1px solid black !important">Account Name</th>
                        <th style="border:none !important; border-bottom: 1px solid black !important">Description</th>
                        <th style="border:none !important; border-bottom: 1px solid black !important">CEK/BG No.</th>
                        <th style="border:none !important; border-bottom: 1px solid black !important">Amount</th>
                    </tr>
                </thead>
                <tbody style="border:none !important; border-bottom: 1px solid black !important">
                    <td style="border:none !important; border-bottom: 1px solid black !important"></td>
                    <td style="border:none !important; border-bottom: 1px solid black !important"></td>
                    <td style="border:none !important; border-bottom: 1px solid black !important"></td>
                    <td style="border:none !important; border-bottom: 1px solid black !important"></td>
                    <td style="border:none !important; border-bottom: 1px solid black !important"></td>
                </tbody>
                <tfoot style="border:none !important">
                    <tr style="border:none !important">
                        <td colspan="4" style="text-align: right; border:none !important">TOTAL =</td>
                        <td style="border:none !important"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="content">
            <table style="border:none !important">
                <thead style="border:none !important">
                    <tr style="border:none !important">
                        <td style="text-align: center !important; width: 80px; border:none !important">Receiver</td>
                        <td style="text-align: center !important; width: 80px; border:none !important">Cashier</td>
                        <td style="border:none !important"></td>
                        <td style="border:none !important"></td>
                    </tr>
                    <tr style="border:none !important">
                        <td style="border:none !important">&nbsp;</td>
                        <td style="border:none !important">&nbsp;</td>
                        <td
                            style="width: 80px; text-align: right !important; font-style: italic; border:none !important">
                            Note :</td>
                        <td style="border:none !important">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                        </td>
                        <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                        </td>
                        <td style="border:none !important">&nbsp;</td>
                        <td style="border:none !important">&nbsp;</td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</body>
<script src="{{ asset('js/Accounting/Hutang/BKKKRR2.js') }}"></script>

</html>
