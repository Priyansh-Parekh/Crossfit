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
  const confirmPasswordBtn = document.getElementById("confirmPasswordBtn");
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
  const clubEmailInput = document.getElementById("clubEmailInput");
  const clubPhoneInput = document.getElementById("clubPhoneInput");
  const clubLocationInput = document.getElementById("clubLocationInput");
  const clubFoundedInput = document.getElementById("clubFoundedInput");
  const clubUpdatedInput = document.getElementById("clubUpdatedInput");
  const clubBioInput = document.getElementById("clubBioInput");

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
    // Save original data for cancel
    originalData = {
      name: clubNameInput.value,
      email: clubEmailInput.value,
      phone: clubPhoneInput.value,
      location: clubLocationInput.value,
      founded: clubFoundedInput.value,
      updated: clubUpdatedInput.value,
      bio: clubBioInput.value,
      logo: clubLogo.src
    };
  };

  cancelBtn.onclick = function () {
    // Restore original data
    clubNameInput.value = originalData.name;
    clubEmailInput.value = originalData.email;
    clubPhoneInput.value = originalData.phone;
    clubLocationInput.value = originalData.location;
    clubFoundedInput.value = originalData.founded;
    clubUpdatedInput.value = originalData.updated;
    clubBioInput.value = originalData.bio;
    clubLogo.src = originalData.logo;

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
    // Validate
    let valid = true;
    emailError.textContent = "";
    phoneError.textContent = "";
    bioError.textContent = "";

    // Email validation
    const emailVal = clubEmailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      emailError.textContent = "Invalid email format";
      valid = false;
    }
    // Phone validation
    const phoneVal = clubPhoneInput.value.trim();
    if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(phoneVal.replace(/\s/g, ""))) {
      phoneError.textContent = "Invalid phone format";
      valid = false;
    }
    // Bio validation
    const bioVal = clubBioInput.value.trim();
    if (bioVal.split(/\s+/).length > 500) {
      bioError.textContent = "Bio must be 500 words or less";
      valid = false;
    }

    if (!valid) return;

    // Prepare pending data
    pendingData = {
      name: clubNameInput.value,
      email: clubEmailInput.value,
      phone: clubPhoneInput.value,
      location: clubLocationInput.value,
      founded: clubFoundedInput.value,
      updated: clubUpdatedInput.value,
      bio: clubBioInput.value,
      logo: clubLogo.src
    };

    // Show password modal
    passwordModalBg.style.display = "flex";
    passwordInput.value = "";
    passwordError.textContent = "";
    passwordInput.focus();
  };

  confirmPasswordBtn.onclick = function () {
    // Dummy password check (for demo, password is "admin123")
    if (passwordInput.value === "admin123") {
      // Update view
      clubNameView.textContent = pendingData.name;
      clubEmailView.textContent = pendingData.email;
      clubPhoneView.textContent = pendingData.phone;
      clubLocationView.textContent = pendingData.location;
      clubFoundedView.textContent = pendingData.founded;
      clubUpdatedView.textContent = pendingData.updated;
      clubBioView.textContent = pendingData.bio;
      clubLogo.src = pendingData.logo;

      profileView.style.display = "block";
      profileEdit.style.display = "none";
      editBtn.style.display = "inline-flex";
      saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
      passwordModalBg.style.display = "none";
    } else {
      passwordError.textContent = "Password is wrong";
      passwordInput.focus();
    }
  };

  cancelPasswordBtn.onclick = function () {
    passwordModalBg.style.display = "none";
  };

  // Logo upload
  changeLogoBtn.onclick = function () {
    clubLogoInput.click();
  };

  clubLogoInput.onchange = function (e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        clubLogo.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
});
