    <style>
        /* body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        } */

        /* header {
            background-color: #333;
            color: white;
            padding: 10px;
            text-align: center;
        } */

        /* .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        } */

        #modalComputer {
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
            width: 20%;
            transform: translate(-50%, -50%);
            background-color: #fefefe;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.5s ease-in-out;
        }

        .acs-td-button{
            display: flex;
            gap: 5px
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            text-align: right;
        }

        .close:hover {
            color: black;
        }

        .clickable-row {
            cursor: pointer;
        }

        #table_Computer tbody tr.clickable-row:hover {
            background-color: #f5f5f5 !important;
            /* Use !important to override conflicting styles */
        }

        #modalComputerContent{
            align-self: center
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

    <!-- The Modal -->
    <div id="modalComputer">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <div id="modalComputerContent">
            </div>
        </div>
    </div>

    <script>
        function openModal() {
            var modal = document.getElementById('modalComputer');
            // Reset animation before applying fade-in
            modal.style.animation = 'none';
            void modal.offsetWidth; // Trigger reflow
            modal.style.animation = 'fadeIn 0.5s ease-in-out';
            modal.style.display = 'block';
        }

        function closeModal() {
            var modal = document.getElementById('modalComputer');
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
        window.onclick = function(event) {
            var modal = document.getElementById('modalComputer');
            if (event.target == modal) {
                closeModal();
            }
        }
    </script>
