const form = document.querySelector('#form-habits')
const nlwSetup = new NLWSetup(form)
const button = document.querySelector('header button')

button.addEventListener('click', add)
form.addEventListener('change', save)

function add() {
  const today = new Date().toLocaleDateString('pt').slice(0, 5)
  const dayExists = nlwSetup.dayExists(today)

  if (dayExists) {
    alert(' Oops Already added!, Come tommorow ')
    return
  }

  alert('Horray Sucessfull added!')
  nlwSetup.addDay(today)
}

function save() {
  localStorage.setItem('NLWSetup@habits', JSON.stringify(nlwSetup.data))
}

const data = JSON.parse(localStorage.getItem('NLWSetup@habits')) || {}
nlwSetup.setData(data)
nlwSetup.load()
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

// Update the date and time immediately
updateDateTime();

// Update the date and time every second
setInterval(updateDateTime, 1000);
