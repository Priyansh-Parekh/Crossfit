function showSection(id, clickedButton) {
  // Hide all current sections
  document.querySelectorAll(".club-dashboard-current").forEach(sec =>
    sec.classList.remove("club-dashboard-active")
  );

  // Show the selected section
  const target = document.getElementById(id);
  if (target) target.classList.add("club-dashboard-active");

  // Update active state on buttons
  document.querySelectorAll(".club-dashboard-option-menu button").forEach(btn =>
    btn.classList.remove("club-dashboard-active")
  );
  clickedButton.classList.add("club-dashboard-active");
}

function goToSection(id) {
  const targetBtn = [...document.querySelectorAll(".club-dashboard-option-menu button")]
    .find(btn => btn.textContent.toLowerCase().includes(id.replace('-', ' ')));

  if (targetBtn) targetBtn.click();
}

// Select dashboard by default on load
window.onload = function () {
  const firstButton = document.querySelector(".club-dashboard-option-menu button");
  if (firstButton) firstButton.click();
};

// Club Profile Edit Logic
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const editBtn = document.getElementById("editProfileBtn");
  const saveBtn = document.getElementById("saveProfileBtn");
  const cancelBtn = document.getElementById("cancelProfileBtn");
  const profileView = document.getElementById("profileView");
  const profileEdit = document.getElementById("profileEdit");
  const changeLogoBtn = document.getElementById("changeLogoBtn");
  const clubLogoInput = document.getElementById("clubLogoInput");
  const clubLogo = document.getElementById("clubLogo");

  // Modal
  const passwordModalBg = document.getElementById("passwordModalBg");
  const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
  const passwordInput = document.getElementById("passwordInput");
  const passwordError = document.getElementById("passwordError");

  // Error fields
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const bioError = document.getElementById("bioError");

  // Data fields
  const clubNameView = document.getElementById("clubNameView");
  const clubEmailView = document.getElementById("clubEmailView");
  const clubPhoneView = document.getElementById("clubPhoneView");
  const clubLocationView = document.getElementById("clubLocationView");
  const clubFoundedView = document.getElementById("clubFoundedView");
  const clubCreatedView = document.getElementById("clubCreatedView");
  const clubUpdatedView = document.getElementById("clubUpdatedView");
  const clubBioView = document.getElementById("clubBioView");

  // Edit fields
  const clubNameInput = document.getElementById("clubNameInput");
  const clubFoundedInput = document.getElementById("clubFoundedInput");
  const clubBioInput = document.querySelector("#clubBioInput");

  // State
  let originalData = {};
  let pendingData = {};

  // Edit Mode
  editBtn.onclick = function () {
    profileView.style.display = "none";
    profileEdit.style.display = "block";
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-flex";
    cancelBtn.style.display = "inline-flex";

  };

  cancelBtn.onclick = function () {
    profileView.style.display = "block";
    profileEdit.style.display = "none";
    editBtn.style.display = "inline-flex";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
    emailError.textContent = "";
    phoneError.textContent = "";
    bioError.textContent = "";
  };

  saveBtn.onclick = function (e) {
    e.preventDefault();
    // Bio validation
    const bioVal = clubBioInput.value.trim();
    if (bioVal.split(/\s+/).length > 500) {
      bioError.textContent = "Bio must be 500 words or less";
      valid = false;
    }


    // Prepare pending data
    pendingData = {
      name: clubNameInput.value,
      founded: clubFoundedInput.value,
      bio: clubBioInput.value
    };

    // Show password modal
    passwordModalBg.style.display = "flex";
    passwordInput.value = "";
    passwordError.textContent = "";
    passwordInput.focus();
  };

  cancelPasswordBtn.onclick = function () {
    passwordModalBg.style.display = "none";
  };

});



document.getElementById("saveProfileBtn").addEventListener("click", function (event) {
  // Before submitting Form B, copy values from Form A
  document.getElementById("hiddenName").value = document.getElementById("clubNameInput").value;
  document.getElementById("hiddenFoundedYear").value = document.getElementById("clubFoundedInput").value;
  document.getElementById("hiddenBio").value = document.getElementById("clubBioInput").value;
  document.getElementById("hiddenSlogan").value = document.getElementById("clubSloganInput").value;
});


const tabs = document.querySelectorAll(".club-dashboard-challenge-tab");
const contents = document.querySelectorAll(".club-dashboard-challenge-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    contents.forEach(content => content.classList.add("hidden"));
    document.getElementById(`challenge-${tab.dataset.target}`).classList.remove("hidden");
  });
});



// upload.single('club_logo')



let toggle_challange_btn = document.querySelector('.club-dashboard-create-btn');
let challange_form = document.querySelector('#createChallengeForm');
let toggle_count = 0;
toggle_challange_btn.addEventListener('click', () => {
  if (toggle_count % 2 === 0) {
    challange_form.style.display = 'grid';
  } else {
    challange_form.style.display = 'none';
  }
  toggle_count++;
})

document.querySelector('.club-dashboard-adding-new-player-btn').addEventListener('click', () => {
  document.getElementById('add-player-form').classList.toggle('hidden');
});




let live_section_live_trigger = document.querySelector(".club-liveupdate-live-title");
let live_section_upcoming_trigger = document.querySelector(".club-liveupdate-upcoming-title");
let live_section = document.querySelector(".club-dashboard-live-sect");
let upcoming_section = document.querySelector(".club-dashboard-upcoming-sect");
let live_count_match = 0;
let upcoming_count_match = 0;



live_section_live_trigger.addEventListener("click", () => {
  if (live_count_match % 2 === 0) {
    live_section.style.display = "grid";
    live_count_match++;
  } else {
    live_section.style.display = "none";
    live_count_match++;
  }

})

live_section_upcoming_trigger.addEventListener("click", () => {
  if (upcoming_count_match % 2 === 0) {
    upcoming_section.style.display = "grid"
    upcoming_count_match++;
  } else {
    upcoming_section.style.display = "none"
    upcoming_count_match++;
  }

})
