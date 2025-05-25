document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('travelForm');
    const resultDiv = document.getElementById('result');

    // Add event listeners for date inputs
    const departureDateInput = document.getElementById('departureDate');
    const returnDateInput = document.getElementById('returnDate');

    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    departureDateInput.min = today;
    
    departureDateInput.addEventListener('change', function() {
        returnDateInput.min = this.value;
        if (returnDateInput.value && returnDateInput.value < this.value) {
            returnDateInput.value = this.value;
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        calculateTripCost();
    });

    function calculateTripCost() {
        // Get input values
        const departureDate = new Date(document.getElementById('departureDate').value);
        const returnDate = document.getElementById('returnDate').value ? 
            new Date(document.getElementById('returnDate').value) : departureDate;
        
        const ticketCost = parseFloat(document.getElementById('ticketCost').value) || 0;
        const accommodationCost = parseFloat(document.getElementById('accommodationCost').value) || 0;
        const foodCost = parseFloat(document.getElementById('foodCost').value) || 0;
        const transportCost = parseFloat(document.getElementById('transportCost').value) || 0;
        const otherCosts = parseFloat(document.getElementById('otherCosts').value) || 0;

        // Calculate trip duration
        const tripDuration = calculateTripDuration(departureDate, returnDate);
        
        // Calculate total costs
        const totalAccommodation = accommodationCost * tripDuration;
        const totalFood = foodCost * tripDuration;
        const totalTransport = transportCost * tripDuration;
        const totalCost = ticketCost + totalAccommodation + totalFood + totalTransport + otherCosts;

        displayResults({
            duration: tripDuration,
            tickets: ticketCost,
            accommodation: totalAccommodation,
            food: totalFood,
            transport: totalTransport,
            other: otherCosts,
            total: totalCost
        });
    }

    function calculateTripDuration(start, end) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(1, diffDays); // Minimum 1 day
    }

    function displayResults(costs) {
        // Update duration
        document.getElementById('tripDuration').textContent = 
            costs.duration === 1 ? 'يوم واحد' : costs.duration + ' أيام';

        // Update costs with currency formatting
        document.getElementById('totalTickets').textContent = formatCurrency(costs.tickets);
        document.getElementById('totalAccommodation').textContent = formatCurrency(costs.accommodation);
        document.getElementById('totalFood').textContent = formatCurrency(costs.food);
        document.getElementById('totalTransport').textContent = formatCurrency(costs.transport);
        document.getElementById('totalOther').textContent = formatCurrency(costs.other);
        document.getElementById('totalCost').textContent = formatCurrency(costs.total);

        // Show results
        resultDiv.classList.remove('d-none');
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function formatCurrency(amount) {
        const currency = document.getElementById('currency').value || 'SAR';
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    // Optional: Add city suggestions using a predefined list
    const popularCities = [
        'القاهرة', 'دبي', 'لندن', 'باريس', 'نيويورك', 'طوكيو',
        'إسطنبول', 'روما', 'برشلونة', 'سنغافورة', 'كوالالمبور',
        'الرياض', 'جدة', 'أبوظبي', 'الدوحة', 'عمان', 'بيروت'
    ];

    function addCitySuggestions(inputId) {
        const input = document.getElementById(inputId);
        const datalist = document.createElement('datalist');
        datalist.id = inputId + 'List';
        
        popularCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });

        input.setAttribute('list', datalist.id);
        document.body.appendChild(datalist);
    }

    // Add suggestions to both city inputs
    addCitySuggestions('departureCity');
    addCitySuggestions('arrivalCity');
});
