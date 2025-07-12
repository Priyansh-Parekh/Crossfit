let favform = document.querySelector("#viewers-dashboard-fav-add-form");
let favbtn = document.querySelector(".viewers-dashboard-fav-add");
let remform = document.querySelector(".viewers-dashboard-fav-remove-form");
let rembtn = document.querySelector(".viewers-dashboard-fav-remove-trigger");
let favcount = 0;
let remcount =0;

favbtn.addEventListener('click', () => {
    favcount++;
    
    if (favcount % 2 === 1) {
        favform.style.display = 'flex';
    } else {
        favform.style.display = 'none';
    }
});


rembtn.addEventListener('click', () => {
    remcount++;
    
    if (remcount % 2 === 1) {
        remform.style.display = 'flex';
    } else {
        remform.style.display = 'none';
    }
});