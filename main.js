let nav = 0;
let clicked = null;
let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : []; // <--- make sure events exists in local storage before calling JSON.parse();

const calendar = document.getElementById('calendar');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday'];

function load () {
    const dt = new Date();

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // <-- last parameter "0" means last day of the previous month;

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', { //<-- getting weekday in string
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
      
      for (let i = 1; i <= paddingDays + daysInMonth; i++) {
          const daySquare = document.createElement('div');
          daySquare.classList.add('day');

          if (i > paddingDays) {//<-- if iterated more times than there are padding days, then actual day must be rendererd; 
            daySquare.innerText = i - paddingDays; //<-- getting the number of the day to render;

            daySquare.addEventListener('click', () => console.log('click'));
          } else {
            daySquare.classList.add('padding');
          }

          calendar.appendChild(daySquare);
      }

}

load();