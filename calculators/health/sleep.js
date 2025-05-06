class SleepCalculator {
    constructor() {
        this.SLEEP_CYCLE_MINUTES = 90;
        this.CYCLES_PER_NIGHT = 6;
        this.FALL_ASLEEP_MINUTES = 15;
    }

    calculateWakeUpTimes(currentTime = new Date()) {
        const times = [];
        let sleepTime = new Date(currentTime);

        // Add falling asleep time
        sleepTime.setMinutes(sleepTime.getMinutes() + this.FALL_ASLEEP_MINUTES);

        // Calculate wake times for 4-6 sleep cycles
        for (let cycles = 4; cycles <= 6; cycles++) {
            let wakeTime = new Date(sleepTime);
            wakeTime.setMinutes(wakeTime.getMinutes() + (cycles * this.SLEEP_CYCLE_MINUTES));
            
            // If wake time is before sleep time (next day), add 24 hours
            if (wakeTime < sleepTime) {
                wakeTime.setHours(wakeTime.getHours() + 24);
            }
            
            times.push({
                time: this.formatTime(wakeTime),
                cycles: cycles,
                quality: this.getSleepQuality(cycles)
            });
        }

        return times;
    }

    calculateSleepTimes(wakeUpTime) {
        const times = [];
        let targetWakeTime = new Date(wakeUpTime);
        const now = new Date();

        // If wake up time is earlier than current time, assume it's for tomorrow
        if (targetWakeTime < now) {
            targetWakeTime.setDate(targetWakeTime.getDate() + 1);
        }

        // Calculate sleep times for 4-6 sleep cycles
        for (let cycles = 4; cycles <= 6; cycles++) {
            let sleepTime = new Date(targetWakeTime);
            // Subtract sleep cycles and falling asleep time
            sleepTime.setMinutes(sleepTime.getMinutes() - (cycles * this.SLEEP_CYCLE_MINUTES) - this.FALL_ASLEEP_MINUTES);
            
            times.push({
                time: this.formatTime(sleepTime),
                cycles: cycles,
                quality: this.getSleepQuality(cycles)
            });
        }

        // Filter out times that are in the past
        return times.filter(time => {
            const timeDate = this.parseTime(time.time);
            return timeDate > now;
        }).reverse(); // Show best times first
    }

    getSleepQuality(cycles) {
        if (cycles >= 6) return { label: 'مثالي', class: 'quality-optimal' };
        if (cycles >= 5) return { label: 'جيد', class: 'quality-good' };
        return { label: 'مقبول', class: 'quality-fair' };
    }

    formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'مساءً' : 'صباحاً';
        const displayHours = (hours % 12 || 12).toString().padStart(2, '0');
        return `${displayHours}:${minutes} ${period}`;
    }

    parseTime(timeStr) {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        let adjustedHours = hours;
        
        if (period === 'مساءً' && hours !== 12) {
            adjustedHours += 12;
        }
        if (period === 'صباحاً' && hours === 12) {
            adjustedHours = 0;
        }
        
        date.setHours(adjustedHours, minutes, 0, 0);
        return date;
    }
}

// DOM Elements
const sleepNowBtn = document.getElementById('sleepNowBtn');
const wakeUpBtn = document.getElementById('wakeUpBtn');
const currentTimeDisplay = document.getElementById('currentTime');
const wakeOptionsContainer = document.getElementById('wakeOptions');
const sleepOptionsContainer = document.getElementById('sleepOptions');
const wakeTimeInput = document.getElementById('wakeTimeInput');
const themeToggle = document.getElementById('themeToggle');

const calculator = new SleepCalculator();
let currentMode = 'sleep';

function updateCurrentTime() {
    const now = new Date();
    currentTimeDisplay.textContent = calculator.formatTime(now);
}

function updateWakeOptions() {
    const times = calculator.calculateWakeUpTimes(new Date());
    wakeOptionsContainer.innerHTML = times.map(time => `
        <div class="time-card">
            <div class="time-option">${time.time}</div>
            <div class="cycle-info">
                ${time.cycles} دورات نوم
                <span class="sleep-quality ${time.quality.class}">${time.quality.label}</span>
            </div>
        </div>
    `).join('');
}

function updateSleepOptions() {
    const wakeTime = wakeTimeInput.value;
    if (!wakeTime) return;

    const [hours, minutes] = wakeTime.split(':');
    const wakeUpDate = new Date();
    wakeUpDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const times = calculator.calculateSleepTimes(wakeUpDate);
    sleepOptionsContainer.innerHTML = times.map(time => `
        <div class="time-card">
            <div class="time-option">${time.time}</div>
            <div class="cycle-info">
                ${time.cycles} دورات نوم
                <span class="sleep-quality ${time.quality.class}">${time.quality.label}</span>
            </div>
        </div>
    `).join('');
}

// Event Listeners
sleepNowBtn.addEventListener('click', () => {
    sleepNowBtn.classList.add('active');
    wakeUpBtn.classList.remove('active');
    wakeTimeInput.style.display = 'none';
    currentMode = 'sleep';
    updateWakeOptions();
});

wakeUpBtn.addEventListener('click', () => {
    wakeUpBtn.classList.add('active');
    sleepNowBtn.classList.remove('active');
    wakeTimeInput.style.display = 'block';
    currentMode = 'wake';
    updateSleepOptions();
});

wakeTimeInput.addEventListener('change', updateSleepOptions);

function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('darkTheme', isDark);
}

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    setTheme(isDark);
});

// Initialize
const savedTheme = localStorage.getItem('darkTheme');
if (savedTheme === 'true') {
    setTheme(true);
}

// Update time every minute
setInterval(updateCurrentTime, 60000);
updateCurrentTime();
updateWakeOptions();
