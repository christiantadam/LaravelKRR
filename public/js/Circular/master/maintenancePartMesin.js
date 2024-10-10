let nama_mesin = document.getElementById("nama_mesin");
$(document).ready(function() {
    // Initialize DataTable
    var table = $('#example').DataTable({
        "columnDefs": [{
            // Target the Performance column (index starts at 0)
            "targets": 2,
            "orderable": false,
            "render": function(data, type, row, meta) {
                // Create a canvas element for Chart.js
                return '<canvas class="performance-chart" width="100" height="30"></canvas>';
            }
        }],
        "initComplete": function(settings, json) {
            // After the table is initialized, render the charts
            $('#example tbody tr').each(function() {
                var $tr = $(this);
                var sales = parseInt($tr.find('td').eq(1).text(),
                10); // Assuming Sales is in the second column
                var ctx = $tr.find('canvas')[0].getContext('2d');

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Sales'],
                        datasets: [{
                            label: 'Sales',
                            data: [sales],
                            backgroundColor: ['#00000'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        indexAxis: 'y',
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                display: false,
                                beginAtZero: true,
                                max: 250 // Adjust based on your data range
                            },
                            y: {
                                display: false,
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        }
                    }
                });
            });
        }
    });
});
