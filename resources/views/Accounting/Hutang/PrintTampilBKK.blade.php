<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Voucher</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            margin: 0 auto;
            padding: 20px;
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

        .content th {
            background-color: #f2f2f2;
        }

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
            <table>
                <tr>

                    <td>Name</td>
                    <td>:</td>
                    <td></td>
                    <td>Date</td>
                    <td>:</td>
                    <td></td>
                    <td>Voucher</td>
                    <td>:</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>:</td>
                    <td></td>
                    <td>Paid To</td>
                    <td>:</td>
                    <td></td>
                    <td>Posted On</td>
                    <td>:</td>
                    <td></td>
                </tr>
            </table>
            <table style="margin-top: 20px;">
                <thead>
                    <tr>
                        <th>C.O.A</th>
                        <th>Account Name</th>
                        <th>Description</th>
                        <th>CEK/BG No.</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data rows will go here -->
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" style="text-align: right;">TOTAL =</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="signature">
            <div>
                <p>Receiver</p>
                <br>
                <p>____________________</p>
            </div>
            <div>
                <p>Cashier</p>
                <br>
                <p>____________________</p>
            </div>
        </div>
        <div class="note">
            <p>Note :</p>
        </div>
    </div>
</body>

</html>
