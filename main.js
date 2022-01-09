let nav = 0;
let clicked = null;
let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : []; // <--- make sure events exists in local storage before calling JSON.parse();

const calendar = document.getElementById('calendar');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday', 'Sunday'];

function load () {
    const dt = new Date();

    if (nav !== 0) {//<-- calling setMonth equal to the current month
        dt.setMonth(new Date().getMonth() + nav);
    }
  
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // <-- last parameter "0" means last day of the previous month;

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', { //<-- getting weekday in string;
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
      

      document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('en-us', { month: 'long'})} ${year}`;

    calendar.innerHTML = ''; //<--clearing content in order to render previous/next month calendar;
      
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

function initButtons () { // <-- can change incre./decrem. nav value and call load() again;
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

}

initButtons();
load();
