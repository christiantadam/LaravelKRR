<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cool Modal Page with Fade-in and Fade-out Animation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        header {
            background-color: #333;
            color: white;
            padding: 10px;
            text-align: center;
        }

        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        #myModal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            animation: fadeInOut 0.5s ease-in-out;
        }

        .modal-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fefefe;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.5s ease-in-out;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .close:hover {
            color: black;
        }

        @keyframes fadeInOut {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    </style>
</head>
<body>

    <header>
        <h1>Cool Modal Page with Fade-in and Fade-out Animation</h1>
    </header>

    <div class="container">
        <p>This is a simple web page with a cool modal. Click the button below to open the modal:</p>
        <button onclick="openModal()">Open Modal</button>
    </div>

    <!-- The Modal -->
    <div id="myModal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>Modal Content</h2>
            <p>This is some modal content. You can add any content you like here.</p>
        </div>
    </div>

    <script>
        function openModal() {
            var modal = document.getElementById('myModal');
            // Reset animation before applying fade-in
            modal.style.animation = 'none';
            void modal.offsetWidth; // Trigger reflow
            modal.style.animation = 'fadeIn 0.5s ease-in-out';
            modal.style.display = 'block';
        }

        function closeModal() {
            var modal = document.getElementById('myModal');
            modal.style.animation = 'fadeOut 0.5s ease-in-out';
            modal.addEventListener('animationend', function animationEndHandler() {
                if (modal.style.display !== 'none') {
                    modal.style.display = 'none';
                    modal.style.animation = 'none';
                    modal.removeEventListener('animationend', animationEndHandler);
                }
            });
        }

        // Close the modal if the user clicks outside the modal content
        window.onclick = function (event) {
            var modal = document.getElementById('myModal');
            if (event.target == modal) {
                closeModal();
            }
        }
    </script>

</body>
</html>
