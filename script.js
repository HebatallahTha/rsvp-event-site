/*** Dark Mode ***/
let themeButton = document.getElementById('theme-button');
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);


/*** RSVP Form Handling ***/

// Step 1-B: Add participant using the `person` object
const addParticipant = (person) => {
  const newParticipant = document.createElement('p');
  newParticipant.textContent = `✨ ${person.name} from ${person.location} has RSVP'd.`;

  const participantsDiv = document.querySelector('.participants');
  participantsDiv.appendChild(newParticipant);
}

// Step 1-A: Validate form and build the `person` object
const validateForm = (event) => {
  let containsErrors = false;

  const rsvpInputs = document.getElementById("rsvp-form").elements;

  let person = {
    name: rsvpInputs[0].value,
    email: rsvpInputs[1].value,
    linkedin: rsvpInputs[2].value,
    location: rsvpInputs[3].value
  };

  // Loop through all inputs to validate
  for (let i = 0; i < rsvpInputs.length; i++) {
    if (rsvpInputs[i].value.length < 2) {
      containsErrors = true;
      rsvpInputs[i].classList.add("error");
    } else {
      rsvpInputs[i].classList.remove("error");
    }
  }

  // If valid, show modal, add participant, and clear inputs
  if (!containsErrors) {
    toggleModal(person);
    addParticipant(person);

    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  } else {
    event.preventDefault();
  }
}

// Add event listener for the RSVP form submission
document.getElementById("rsvp-button").addEventListener("click", (event) => {
  event.preventDefault();
  validateForm(event);
});


/*** Modal ***/
const toggleModal = (person) => {
  let modal = document.getElementById("success-modal");
  let modalText = document.getElementById("modal-text");

  // Show the modal
  modal.style.display = "flex";

  // Personalized message
  modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you at the event!`;

  // Start animation
  let intervalId = setInterval(animateImage, 500);

  // Hide modal after 5 seconds
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 5000);
};

let rotateFactor = 0;
let modalImage = document.getElementById("modal-img");

const animateImage = () => {
  rotateFactor = rotateFactor === 0 ? -10 : 0;
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};
