{{-- This file is for testing features, not for production use. --}}
{{-- TEST BARCODE --}}
{{-- @extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/customer.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div id="qr-code-uji-coba">
            <input class="input" id="text-content" type="text"
                value="https://wa.me/+6289664290102" style="width:80%"><br>
            <input class="input" type="text" name="text-content2" id="text-content2" placeholder="url_Encode"><br>
            <div id="qrcode" style="width:200px; height:200px; margin-top:15px;">
            </div>
            <span id="text-qr"></span>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/qrcode.js') }}"></script>
    <style>
        #text-content2 {
            /* display: none; */
        }

        @media print {

            #text-content,
            #text-content2 {
                display: none !important;
            }

            #qrcode {
                display: block !important;
            }

            #text-qr {
                display: block;
                font-size: 18px;
            }
        }
    </style>
    <script type="text/javascript">
        var elText = document.getElementById("text-content");
        var elText2 = document.getElementById("text-content2");
        var textqr = document.getElementById("text-qr");

        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        elText2.addEventListener("change", function() {
            if (this.selectedIndex !== 0) {
                this.setCustomValidity("Tekan Enter!");
                this.reportValidity();
            }
        });

        elText2.addEventListener("keypress", function(event) {
            console.log(event.key);
            if (event.key == "Enter") {
                event.preventDefault();
                // elText2.value = encodeURIComponent(this.value);
                makeCode();
            }
        });

        function makeCode() {
            if (!elText.value) {
                alert("Input a text");
                elText.focus();
                return;
            }
            textqr.innerHTML = elText.value + '?text=' + encodeURIComponent(elText2.value);
            qrcode.makeCode(textqr.innerHTML);
        }

        $("#text-content").
        on("keydown", function(e) {
            if (e.keyCode == 13) {
                elText2.focus();
            }
        });
    </script>
@endsection --}}

{{-- TEST GOOGLE MAPS API --}}
{{-- <!DOCTYPE html>
<html>

<head>
    <title>My Current Location</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        #map {
            height: 500px;
            width: 100%;
        }
    </style>
</head>

<body>

    <h2>My Current Location</h2>
    <div id="map"></div>

    <script>
        let map;

        function initMap() {
            if (navigator.geolocation) {

                console.log(navigator.geolocation.getCurrentPosition);
                navigator.geolocation.getCurrentPosition(
                    function(position) {

                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        map = new google.maps.Map(document.getElementById("map"), {
                            zoom: 15,
                            center: userLocation,
                        });

                        new google.maps.Marker({
                            position: userLocation,
                            map: map,
                            title: "You are here"
                        });

                    },
                    function(error) {
                        console.log("ERROR CODE:", error.code);
                        console.log("ERROR MESSAGE:", error.message);

                        alert("Geolocation failed: " + error.message);
                    }
                );

            } else {
                alert("Browser does not support Geolocation");
            }
        }
    </script>

    <!-- Replace YOUR_API_KEY -->
    <script async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvhzkgzAVF7ybaVj2vtyGwK0ZvX6wSbuI&callback=initMap"></script>

</body>
</html> --}}
