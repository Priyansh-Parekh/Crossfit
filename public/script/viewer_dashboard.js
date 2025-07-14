let favform = document.querySelector("#viewers-dashboard-fav-add-form");
let favbtn = document.querySelectorAll(".viewers-dashboard-fav-add");
let remform = document.querySelectorAll(".viewers-dashboard-fav-remove-form");
let rembtn = document.querySelectorAll(".viewers-dashboard-fav-remove-trigger");
let favcount = 0;
let remcount =0;
favbtn.forEach(em => {
    em.addEventListener('click', () => {
    favcount++;
    
    if (favcount % 2 === 1) {
        favform.style.display = 'flex';
    } else {
        favform.style.display = 'none';
    }
});
});


rembtn.forEach(em => {
    em.addEventListener('click', () => {
    remcount++;
    
    if (remcount % 2 === 1) {
        remform.style.display = 'flex';
    } else {
        remform.style.display = 'none';
    }
});
});


upload.single('profile_picture')