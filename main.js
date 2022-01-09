let nav = 0;
let clicked = null;
let events = sessionStorage.getItem("events")
  ? JSON.parse(sessionStorage.getItem("events"))
  : []; // <--- make sure events exists in local storage before calling JSON.parse();

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
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

  if (nav !== 0) {//<-- calling setMonth equal to the current month
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // <-- last parameter "0" means last day of the previous month;

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {//<-- getting weekday in string;
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
      daySquare.innerText = i - paddingDays;

      const eventForDay = events.find((e) => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {//<-- checking for 'const day' & on current month only;
        daySquare.id = "currentDay";
      }

      if (eventForDay) {// <-- if there's an event for the day which is looped through;
        const eventDiv = document.createElement("div"); // <-- create a div;
        eventDiv.classList.add("event"); // <-- add a class;
        eventDiv.innerText = eventForDay.title; // <-- set the text;
        daySquare.appendChild(eventDiv); // <-- put it inside of the day square;
      }

      daySquare.addEventListener("click", () => openModal(dayString));
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  eventTitleInput.classList.remove("error");
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");

    events.push({// <--events is an array so using push() to add elements to array;
      date: clicked,
      title: eventTitleInput.value,
    });

    sessionStorage.setItem("events", JSON.stringify(events)); // <--saving to local storage;
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function deleteEvent() {
  events = events.filter((e) => e.date !== clicked); // <-- filtering out events array;
  sessionStorage.setItem("events", JSON.stringify(events)); // <-- resetting in local storage;
  closeModal();
}

function initButtons() {// <-- can change incre./decrem. nav value and call load() again;
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
  document
    .getElementById("deleteButton")
    .addEventListener("click", deleteEvent);
  document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();