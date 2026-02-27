@extends('layouts.app')
@section('content')
    @if (Session::has('status'))
        <script>
            Swal.fire({
                icon: 'info',
                title: 'Informasi',
                text: '{{ Session::get('status') }}',
            });
        </script>
    @endif
    <style>
        #homeContainer {
            text-align: center;
        }

        #homeTitle {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            position: relative;
        }

        #searchIcon {
            font-size: 24px;
        }

        #homeText,
        #searchIcon {
            transition: opacity 0.3s ease;
        }

        .search-input {
            width: 0;
            opacity: 0;
            padding: 8px 12px;
            font-size: 18px;
            border: 1px solid #ccc;
            border-radius: 6px;
            outline: none;
            transition: all 0.3s ease;
        }

        .search-input.active {
            width: 260px;
            opacity: 1;
        }
    </style>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-11 RDZMobilePaddingLR0">
                <div id="homeContainer">
                    <h1 id="homeTitle">
                        <span id="homeText">HOME</span>
                        <span id="searchIcon">🔍</span>
                    </h1>
                </div>
                <div class="acs-grid-container">
                    @foreach ($AccessProgram as $item)
                        <?php $modifiedNamaProgram = str_replace("\n", '<br>', $item->NamaProgram);
                        $namaIconProgram = str_replace("\n", '_', $item->NamaProgram);
                        $routeProgram = $item->RouteProgram ?? $item->NamaProgram; ?>
                        <a class="acs-link" href="{{ url($routeProgram) }}">
                            <div class="acs-card">
                                <h2 class="acs-txt-card">{!! $modifiedNamaProgram !!}</h2>
                                <img src="{{ asset('/images/' . $namaIconProgram . '.png') }}" alt=""
                                    class="acs-img-card">
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
    <script>
        const homeTitle = document.getElementById("homeTitle");
        const homeText = document.getElementById("homeText");
        const searchIcon = document.getElementById("searchIcon");

        let input = null;

        homeTitle.addEventListener("click", function() {

            // Prevent duplicate creation
            if (input) return;

            // Fade out text + icon
            homeText.style.opacity = "0";
            searchIcon.style.opacity = "0";

            // Create input
            input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Search...";
            input.classList.add("search-input");

            homeTitle.appendChild(input);

            // Small delay to trigger animation
            setTimeout(() => {
                input.classList.add("active");
                input.focus();
            }, 10);

            input.addEventListener("input", handleSearch);
            input.addEventListener("blur", restoreHomeIfEmpty);

            // Hide text and icon completely
            homeText.style.display = "none";
            searchIcon.style.display = "none";
        });

        function handleSearch(e) {
            const keyword = e.target.value.toLowerCase();
            const cards = document.querySelectorAll(".acs-link");

            cards.forEach(card => {
                const text = card
                    .querySelector(".acs-txt-card")
                    .textContent
                    .toLowerCase();

                card.style.display = text.includes(keyword) ? "" : "none";
            });
        }

        function restoreHomeIfEmpty(e) {
            if (e.target.value.trim() !== "") return;

            input.classList.remove("active");

            setTimeout(() => {
                input.remove();
                input = null;

                homeText.style.opacity = "1";
                searchIcon.style.opacity = "1";
                // show text and icon completely
                homeText.style.display = "block";
                searchIcon.style.display = "block";

                // Show all cards again
                document.querySelectorAll(".acs-link").forEach(card => {
                    card.style.display = "";
                });

            }, 300);
        }
    </script>
@endsection
