document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('statsForm');
    const dataInput = document.getElementById('dataInput');
    const resultContainer = document.getElementById('result');
    const sampleDataBtn = document.getElementById('sampleDataBtn');
    const precisionSelect = document.getElementById('precision');
    let chart = null;

    // Sample data sets
    const sampleDataSets = [
        [75, 82, 88, 90, 95, 78, 85, 92, 88, 85],
        [150, 155, 160, 165, 170, 175, 180, 185, 190, 195],
        [10.5, 12.3, 11.8, 13.2, 10.9, 12.7, 11.4, 12.8, 11.6, 13.1]
    ];

    // Parse input data
    function parseData(input) {
        return input.split(/[,\s]+/)
            .map(num => parseFloat(num.trim()))
            .filter(num => !isNaN(num));
    }

    // Calculate mean
    function calculateMean(data) {
        return data.reduce((sum, value) => sum + value, 0) / data.length;
    }

    // Calculate median
    function calculateMedian(data) {
        const sorted = [...data].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
    }

    // Calculate mode
    function calculateMode(data) {
        const frequency = {};
        data.forEach(value => {
            frequency[value] = (frequency[value] || 0) + 1;
        });

        let maxFreq = 0;
        let modes = [];

        for (let value in frequency) {
            if (frequency[value] > maxFreq) {
                maxFreq = frequency[value];
                modes = [parseFloat(value)];
            } else if (frequency[value] === maxFreq) {
                modes.push(parseFloat(value));
            }
        }

        return modes.length === Object.keys(frequency).length ? 'لا يوجد منوال' : modes.join(', ');
    }

    // Calculate standard deviation
    function calculateStandardDeviation(data) {
        const mean = calculateMean(data);
        const squareDiffs = data.map(value => Math.pow(value - mean, 2));
        const variance = calculateMean(squareDiffs);
        return Math.sqrt(variance);
    }

    // Calculate range
    function calculateRange(data) {
        return Math.max(...data) - Math.min(...data);
    }

    // Format number based on precision
    function formatNumber(number) {
        const precision = parseInt(precisionSelect.value);
        return Number(number).toFixed(precision);
    }

    // Update chart
    function updateChart(data) {
        const ctx = document.getElementById('dataChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (chart) {
            chart.destroy();
        }

        // Create frequency distribution
        const frequency = {};
        data.forEach(value => {
            const roundedValue = formatNumber(value);
            frequency[roundedValue] = (frequency[roundedValue] || 0) + 1;
        });

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(frequency),
                datasets: [{
                    label: 'تكرار القيم',
                    data: Object.values(frequency),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'توزيع البيانات'
                    }
                }
            }
        });
    }

    // Update results
    function updateResults(data) {
        const mean = calculateMean(data);
        const stdDev = calculateStandardDeviation(data);

        document.getElementById('mean').textContent = formatNumber(mean);
        document.getElementById('median').textContent = formatNumber(calculateMedian(data));
        document.getElementById('mode').textContent = calculateMode(data);
        document.getElementById('range').textContent = formatNumber(calculateRange(data));
        document.getElementById('stdDev').textContent = formatNumber(stdDev);
        document.getElementById('variance').textContent = formatNumber(Math.pow(stdDev, 2));
        document.getElementById('min').textContent = formatNumber(Math.min(...data));
        document.getElementById('max').textContent = formatNumber(Math.max(...data));
        document.getElementById('sum').textContent = formatNumber(data.reduce((a, b) => a + b, 0));
        document.getElementById('count').textContent = data.length;

        updateChart(data);
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = parseData(dataInput.value);
        
        if (data.length < 2) {
            alert('الرجاء إدخال قيمتين على الأقل');
            return;
        }

        updateResults(data);
    });

    // Sample data button handler
    sampleDataBtn.addEventListener('click', function() {
        const randomSet = sampleDataSets[Math.floor(Math.random() * sampleDataSets.length)];
        dataInput.value = randomSet.join(', ');
    });

    // Precision change handler
    precisionSelect.addEventListener('change', function() {
        const data = parseData(dataInput.value);
        if (data.length >= 2) {
            updateResults(data);
        }
    });
});
