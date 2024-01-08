@extends('layouts.WORKSHOP.GPS.appGPS')
@section('content')

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="card">
          <div class="card-header">Turning</div>
          <div class="card-body RDZOverflow RDZMobilePaddingLR0">
            <div class="row">
              <div class="col-6">
                <label for="month">Bulan:</label>
                <input type="number" id="month" min="1" max="12">
                <label for="year">Tahun:</label>
                <input type="number" id="year" min="1900" max="2100">
              </div>
              <div class="col-6">
                <button class="btn btn-primary" id="abcdef" onclick="generateCalendar()">OK</button>
              </div>
            </div>
            <div class="mb-3">
              <div class="row">
                <button class="btn" onclick="Gantitap('turning1')" id="turning1">  </button>
                <button class="btn" onclick="Gantitap('turning2')" id="turning2">  </button>
                <button class="btn" onclick="Gantitap('turning3')" id="turning3">  </button>
              </div>
            </div>
            <div id="kalenderturning1" style="display: none">
                <h1>turning1</h1>
              <div id="JenisBulan1" style="display: none"> {{-- bulan 31 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>
                    <div id='30' style="width: 125px; text-align: center; padding-left: 10px;">
                      30

                    </div>
                    <div id='31' style="width: 125px; text-align: center; padding-left: 10px;">
                      31

                    </div>

                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan2" style="display: none"> {{-- bulan 30 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>
                    <div id='30' style="width: 125px; text-align: center; padding-left: 10px;">
                      30

                    </div>


                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan3" style="display: none"> {{-- bulan 29 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>
                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>


                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan4" style="display: none"> {{-- bulan 28 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row" style="justify-content: right">
                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="kalenderturning2" style="display: none">
                <h1>turning2</h1>
              <div id="JenisBulan1turning2" style="display: none"> {{-- bulan 31 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>
                    <div id='30' style="width: 125px; text-align: center; padding-left: 10px;">
                      30

                    </div>
                    <div id='31' style="width: 125px; text-align: center; padding-left: 10px;">
                      31

                    </div>

                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan2turning2" style="display: none"> {{-- bulan 30 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>
                    <div id='30' style="width: 125px; text-align: center; padding-left: 10px;">
                      30

                    </div>


                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan3turning2" style="display: none"> {{-- bulan 29 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>
                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>


                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan4turning2" style="display: none"> {{-- bulan 28 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row" style="justify-content: right">
                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="kalenderturning3" style="display: none">
                <h1>turnng3</h1>
              <div id="JenisBulan1turning3" style="display: none"> {{-- bulan 31 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>
                    <div id='30' style="width: 125px; text-align: center; padding-left: 10px;">
                      30

                    </div>
                    <div id='31' style="width: 125px; text-align: center; padding-left: 10px;">
                      31

                    </div>

                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan2turning3" style="display: none"> {{-- bulan 30 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>
                    <div id='30' style="width: 125px; text-align: center; padding-left: 10px;">
                      30

                    </div>


                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan3turning3" style="display: none"> {{-- bulan 29 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>
                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row">
                    <div id='29' style="width: 125px; text-align: center; padding-left: 10px;">
                      29

                    </div>


                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="JenisBulan4turning3" style="display: none"> {{-- bulan 28 --}}
                <div style="padding-top:10px">
                  <div class="row">
                    <div id='1' style="width: 125px; text-align: center; padding-left: 10px;">
                      1

                    </div>
                    <div id='2' style="width: 125px; text-align: center; padding-left: 10px;">
                      2
                    </div>

                    <div id='3' style="width: 125px; text-align: center; padding-left: 10px;">
                      3

                    </div>
                    <div id='4' style="width: 125px; text-align: center; padding-left: 10px;">
                      4

                    </div>
                    <div id='5' style="width: 125px; text-align: center; padding-left: 10px;">
                      5

                    </div>
                    <div id='6' style="width: 125px; text-align: center; padding-left: 10px;">
                      6

                    </div>
                    <div id='7' style="width: 125px; text-align: center; padding-left: 10px;">
                      7

                    </div>

                  </div>
                  <div class="row">
                    <div id='8' style="width: 125px; text-align: center; padding-left: 10px;">
                      8

                    </div>
                    <div id='9' style="width: 125px; text-align: center; padding-left: 10px;">
                      9

                    </div>
                    <div id='10' style="width: 125px; text-align: center; padding-left: 10px;">
                      10

                    </div>
                    <div id='11' style="width: 125px; text-align: center; padding-left: 10px;">
                      11

                    </div>
                    <div id='12' style="width: 125px; text-align: center; padding-left: 10px;">
                      12

                    </div>
                    <div id='13' style="width: 125px; text-align: center; padding-left: 10px;">
                      13

                    </div>
                    <div id='14' style="width: 125px; text-align: center; padding-left: 10px;">
                      14

                    </div>

                  </div>
                  <div class="row">
                    <div id='15' style="width: 125px; text-align: center; padding-left: 10px;">
                      15

                    </div>
                    <div id='16' style="width: 125px; text-align: center; padding-left: 10px;">
                      16

                    </div>
                    <div id='17' style="width: 125px; text-align: center; padding-left: 10px;">
                      17

                    </div>
                    <div id='18' style="width: 125px; text-align: center; padding-left: 10px;">
                      18

                    </div>
                    <div id='19' style="width: 125px; text-align: center; padding-left: 10px;">
                      19

                    </div>

                    <div id='20' style="width: 125px; text-align: center; padding-left: 10px;">
                      20

                    </div>
                    <div id='21' style="width: 125px; text-align: center; padding-left: 10px;">
                      21

                    </div>

                  </div>
                  <div class="row">
                    <div id='22' style="width: 125px; text-align: center; padding-left: 10px;">
                      22

                    </div>
                    <div id='23' style="width: 125px; text-align: center; padding-left: 10px;">
                      23

                    </div>
                    <div id='24' style="width: 125px; text-align: center; padding-left: 10px;">
                      24

                    </div>
                    <div id='25' style="width: 125px; text-align: center; padding-left: 10px;">
                      25

                    </div>
                    <div id='26' style="width: 125px; text-align: center; padding-left: 10px;">
                      26

                    </div>
                    <div id='27' style="width: 125px; text-align: center; padding-left: 10px;">
                      27

                    </div>
                    <div id='28' style="width: 125px; text-align: center; padding-left: 10px;">
                      28

                    </div>

                  </div>
                  <div class="row" style="justify-content: right">
                    <div class="col-3 keterangan">
                      <p style="color:red">xxxxx -> : FULL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/Turning.js') }}"></script>
@endsection
