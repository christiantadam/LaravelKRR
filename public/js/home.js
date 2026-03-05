document.addEventListener("DOMContentLoaded", function () {

    let homeTitle = document.getElementById("homeTitle");
    let homeText = document.getElementById("homeText");
    let searchIcon = document.getElementById("searchIcon");

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
        let keyword = e.target.value.toLowerCase();
        let cards = document.querySelectorAll(".acs-link");

        cards.forEach(card => {
            let text = card
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

            homeText.style.display = "block";
            searchIcon.style.display = "block";

            // Show all cards again
            document.querySelectorAll(".acs-link").forEach(card => {
                card.style.display = "";
            });

        }, 300);
    }


});
