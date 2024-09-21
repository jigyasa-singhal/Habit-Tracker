const form = document.querySelector('#form-habits');
const nlwSetup = new NLWSetup(form);
const button = document.querySelector('header button');

// Event Listeners
button.addEventListener('click', add);
form.addEventListener('change', save);

// Add a new habit for today
function add() {
    const today = new Date().toLocaleDateString('pt').slice(0, 5);
    const dayExists = nlwSetup.dayExists(today);

    if (dayExists) {
        alert('Oops! Already added! Come tomorrow.'); // Consider a UI notification instead
        return;
    }

    alert('Hooray! Successfully added!');
    nlwSetup.addDay(today);
}

// Save habits to localStorage
function save() {
    try {
        localStorage.setItem('NLWSetup@habits', JSON.stringify(nlwSetup.data));
    } catch (error) {
        console.error('Failed to save data:', error);
    }
}

// Load existing data from localStorage
const data = JSON.parse(localStorage.getItem('NLWSetup@habits')) || {};
nlwSetup.setData(data);
nlwSetup.load();

// Update date and time display
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    };
    document.getElementById('datetime').textContent = now.toLocaleString('en-US', options);
}

// Initialize date and time display
updateDateTime();

// Update date and time every second
setInterval(updateDateTime, 1000);
