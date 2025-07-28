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
  if (clickedButton) clickedButton.classList.add("club-dashboard-active");
}

function goToSection(id) {
  const buttons = document.querySelectorAll(".club-dashboard-option-menu button");
  const targetBtn = [...buttons].find(btn => btn.textContent.toLowerCase().includes(id.replace('-', ' ')));
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

  if (editBtn) {
    // Edit Mode
    editBtn.onclick = function () {
      if(profileView) profileView.style.display = "none";
      if(profileEdit) profileEdit.style.display = "block";
      editBtn.style.display = "none";
      if (saveBtn) saveBtn.style.display = "inline-flex";
      if (cancelBtn) cancelBtn.style.display = "inline-flex";
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = function () {
      if(profileView) profileView.style.display = "block";
      if(profileEdit) profileEdit.style.display = "none";
      if(editBtn) editBtn.style.display = "inline-flex";
      if(saveBtn) saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
      if(emailError) emailError.textContent = "";
      if(phoneError) phoneError.textContent = "";
      if(bioError) bioError.textContent = "";
    };
  }

  if (saveBtn) {
    saveBtn.onclick = function (e) {
      e.preventDefault();
      let valid = true;

      // Bio validation
      if (clubBioInput) {
        const bioVal = clubBioInput.value.trim();
        if (bioVal.split(/\s+/).length > 500) {
          if(bioError) bioError.textContent = "Bio must be 500 words or less";
          valid = false;
        } else {
          if(bioError) bioError.textContent = "";
        }
      }

      if (!valid) return;

      // Prepare pending data
      pendingData = {
        name: clubNameInput ? clubNameInput.value : "",
        founded: clubFoundedInput ? clubFoundedInput.value : "",
        bio: clubBioInput ? clubBioInput.value : ""
      };

      // Show password modal
      if(passwordModalBg){
        passwordModalBg.style.display = "flex";
      }
      if(passwordInput){
        passwordInput.value = "";
        passwordError.textContent = "";
        passwordInput.focus();
      }
    };
  }

  if (cancelPasswordBtn) {
    cancelPasswordBtn.onclick = function () {
      if(passwordModalBg) passwordModalBg.style.display = "none";
    };
  }
});

if (document.getElementById("saveProfileBtn")) {
  document.getElementById("saveProfileBtn").addEventListener("click", function (event) {
    // Before submitting Form B, copy values from Form A
    const hiddenName = document.getElementById("hiddenName");
    const hiddenFoundedYear = document.getElementById("hiddenFoundedYear");
    const hiddenBio = document.getElementById("hiddenBio");
    const hiddenSlogan = document.getElementById("hiddenSlogan");
    const clubNameInput = document.getElementById("clubNameInput");
    const clubFoundedInput = document.getElementById("clubFoundedInput");
    const clubBioInput = document.getElementById("clubBioInput");
    const clubSloganInput = document.getElementById("clubSloganInput");

    if(hiddenName && clubNameInput) hiddenName.value = clubNameInput.value;
    if(hiddenFoundedYear && clubFoundedInput) hiddenFoundedYear.value = clubFoundedInput.value;
    if(hiddenBio && clubBioInput) hiddenBio.value = clubBioInput.value;
    if(hiddenSlogan && clubSloganInput) hiddenSlogan.value = clubSloganInput.value;
  });
}

const tabs = document.querySelectorAll(".club-dashboard-challenge-tab");
const contents = document.querySelectorAll(".club-dashboard-challenge-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    contents.forEach(content => content.classList.add("hidden"));
    const contentToShow = document.getElementById(`challenge-${tab.dataset.target}`);
    if(contentToShow) contentToShow.classList.remove("hidden");
  });
});

// Toggle challenge form
const toggle_challange_btn = document.querySelector('.club-dashboard-create-btn');
const challange_form = document.querySelector('#createChallengeForm');
let toggle_count = 0;

if(toggle_challange_btn && challange_form){
  toggle_challange_btn.addEventListener('click', () => {
    if (toggle_count % 2 === 0) {
      challange_form.style.display = 'grid';
    } else {
      challange_form.style.display = 'none';
    }
    toggle_count++;
  });
}

const addPlayerBtn = document.querySelector('.club-dashboard-adding-new-player-btn');
const addPlayerForm = document.getElementById('add-player-form');

if(addPlayerBtn && addPlayerForm){
  addPlayerBtn.addEventListener('click', () => {
    addPlayerForm.classList.toggle('hidden');
  });
}

const live_section_live_trigger = document.querySelector(".club-liveupdate-live-title");
const live_section_upcoming_trigger = document.querySelector(".club-liveupdate-upcoming-title");
const live_section = document.querySelector(".club-dashboard-live-sect");
const upcoming_section = document.querySelector(".club-dashboard-upcoming-sect");
let live_count_match = 0;
let upcoming_count_match = 0;

if(live_section_live_trigger && live_section){
  live_section_live_trigger.addEventListener("click", () => {
    if (live_count_match % 2 === 0) {
      live_section.style.display = "grid";
    } else {
      live_section.style.display = "none";
    }
    live_count_match++;
  });
}

if(live_section_upcoming_trigger && upcoming_section){
  live_section_upcoming_trigger.addEventListener("click", () => {
    if (upcoming_count_match % 2 === 0) {
      upcoming_section.style.display = "grid";
    } else {
      upcoming_section.style.display = "none";
    }
    upcoming_count_match++;
  });
}
