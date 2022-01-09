let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : []; // <--- make sure events exists in local storage before calling JSON.parse();

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
  "Sunday",
];

function openModal(date) {
  clicked = date; //<-- clicked state which helps to determine exact day user clicked
  const eventForDay = events.find((e) => e.date === clicked); //<-- checking if event already exists
  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal.style.display = "block";
  }
  backDrop.style.display = "block";
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    //<-- calling setMonth equal to the current month
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // <-- last parameter "0" means last day of the previous month;

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    //<-- getting weekday in string;
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = ""; //<--clearing content in order to render previous/next month calendar;

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      //<-- if iterated more times than there are padding days, then actual day must be rendererd;
      daySquare.innerText = i - paddingDays; //<-- getting the number of the day to render;

      daySquare.addEventListener("click", () => openModal(dayString));
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
    newEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
  }

function initButtons() {
  // <-- can change incre./decrem. nav value and call load() again;
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });


document.getElementById('cancelButton').addEventListener('click', closeModal);

}

initButtons();
load();
