// Initialize the reference time (source of truth)
const referenceTime = new Date('2024-12-24T22:27:52+02:00');
const referenceSystemTime = new Date();

// Function to get current time based on the reference time
function getCurrentTime() {
    const now = new Date();
    const elapsedTime = now - referenceSystemTime;
    return new Date(referenceTime.getTime() + elapsedTime);
}

// Function to format time in Arabic locale with timezone
function formatTime(date) {
    const weekdays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'م' : 'ص';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    hours = hours.toString().padStart(2, '0');
    
    return `${weekday}، ${day} ${month} ${year} - ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Function to update the time display
function updateTime() {
    const currentTime = getCurrentTime();
    const timeString = formatTime(currentTime);
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
        timeElement.setAttribute('title', currentTime.toISOString());
        timeElement.setAttribute('data-timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
        timeElement.classList.add('time-display');
    }
}

// Update time immediately and then every 100ms for more accuracy
updateTime();
setInterval(updateTime, 100);
