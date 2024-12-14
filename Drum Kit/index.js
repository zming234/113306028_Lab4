// Drum Kit Interaction Code

// Function to play drum sound based on the key or button pressed
function playSound(key) {
  const soundMap = {
    w: "sounds/tom-1.mp3",
    a: "sounds/tom-2.mp3",
    s: "sounds/tom-3.mp3",
    d: "sounds/tom-4.mp3",
    j: "sounds/snare.mp3",
    k: "sounds/crash.mp3",
    l: "sounds/kick-bass.mp3",
  };

  const soundFile = soundMap[key];
  if (soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
  }
}

// Function to add button animation
function buttonAnimation(currentKey) {
  const activeButton = document.querySelector(`.${currentKey}`);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100);
  }
}

// Event listener for button clicks
document.querySelectorAll(".drum").forEach(button => {
  button.addEventListener("click", function () {
    const buttonInnerHTML = this.innerHTML;
    playSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
});

// Event listener for keyboard presses
document.addEventListener("keydown", function (event) {
  playSound(event.key);
  buttonAnimation(event.key);
});

// Additional functionalities for "edit name" and "add music"

let isEditing = false;

// Edit Name functionality
document.getElementById("editNameButton").addEventListener("click", function () {
  const nameElement = document.getElementById("name");
  if (isEditing) {
    // Save mode
    const inputField = document.getElementById("nameInput");
    nameElement.textContent = inputField.value;
    this.textContent = "Edit";
    inputField.remove();
  } else {
    // Edit mode
    const currentName = nameElement.textContent;
    const inputField = document.createElement("input");
    inputField.id = "nameInput";
    inputField.type = "text";
    inputField.value = currentName;
    nameElement.textContent = "";
    nameElement.appendChild(inputField);
    this.textContent = "Save";
  }
  isEditing = !isEditing;
});

// Add Music functionality
document.getElementById("addMusicButton").addEventListener("click", function () {
  const form = document.createElement("form");

  const linkInput = document.createElement("input");
  linkInput.type = "url";
  linkInput.placeholder = "Enter music link";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Enter music name";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Add";

  form.appendChild(linkInput);
  form.appendChild(nameInput);
  form.appendChild(submitButton);

  document.body.appendChild(form);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (linkInput.value && nameInput.value) {
      const musicContainer = document.getElementById("musicContainer");

      const musicItem = document.createElement("div");
      const link = document.createElement("a");
      link.href = linkInput.value;
      link.target = "_blank";
      link.textContent = nameInput.value;

      const img = document.createElement("img");
      img.src = "images/music-icon.png"; // Example image
      img.alt = nameInput.value;

      musicItem.appendChild(img);
      musicItem.appendChild(link);
      musicContainer.appendChild(musicItem);

      form.remove();
    } else {
      alert("Please fill out all fields!");
    }
  });
});
