// Form submission with animation
if (document.querySelector('.match-live-update-form')) {
    document.querySelector('.match-live-update-form').addEventListener('submit', function (e) {
        const submitBtn = document.querySelector('.match-live-update-submit-btn');
        submitBtn.innerHTML = '🔄 Updating...';
        submitBtn.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
    });
}

// Add hover effects to sections
if (document.querySelectorAll('.match-live-update-section').length) {
    document.querySelectorAll('.match-live-update-section').forEach(section => {
        section.addEventListener('mouseenter', function () {
            this.style.borderColor = '#ff6b6b';
        });

        section.addEventListener('mouseleave', function () {
            this.style.borderColor = '#f0f0f0';
        });
    });

}



document.addEventListener("DOMContentLoaded", function () {
    const wicketSelect = document.getElementById("match-live-update-wicket");
    const wicketOptions = document.querySelectorAll(".match-live-update-wicket-option");

    // Hide all wicket options initially
    wicketOptions.forEach(el => el.style.display = "none");
    if (wicketSelect) {
        wicketSelect.addEventListener("change", function () {
            if (this.value === "yes") {
                // Show options if "yes"
                wicketOptions.forEach(el => el.style.display = "block");
            } else {
                // Hide if "no" or default
                wicketOptions.forEach(el => el.style.display = "none");
            }
        });
    }

});

document.addEventListener("DOMContentLoaded", function () {
    const strikerSelect = document.getElementById("match-live-update-striker");
    const nonStrikerSelect = document.getElementById("match-live-update-non-striker");

    if (strikerSelect) {
        function updateNonStrikerOptions() {
            const strikerValue = strikerSelect.value;
            [...nonStrikerSelect.options].forEach(option => {
                option.disabled = option.value && option.value === strikerValue;
            });
        }
    }

    if (nonStrikerSelect) {
        function updateStrikerOptions() {
            const nonStrikerValue = nonStrikerSelect.value;
            [...strikerSelect.options].forEach(option => {
                option.disabled = option.value && option.value === nonStrikerValue;
            });
        }
    }
    if (strikerSelect) {
        strikerSelect.addEventListener("change", () => {
            updateNonStrikerOptions();
        });
    }

    if (nonStrikerSelect) {
        nonStrikerSelect.addEventListener("change", () => {
            updateStrikerOptions();
        });
    }


    // Initial setup in case of pre-filled values
    if (nonStrikerSelect) {
        updateStrikerOptions();
    }
    if (strikerSelect) {
        updateNonStrikerOptions();
    }
});


function refreshLiveScore(matchId) {
    fetch(`/match/refresh/live_score/${matchId}`)
        .then(res => res.json())
        .then(data => {
            const isClub1Batting = String(data.current_batting._id) === String(data.score.club1._id);
            const scoreData = isClub1Batting ? data.score.club2 : data.score.club1;

            // Score update
            document.getElementById(`score-${matchId}`).textContent =
                `${data.current_batting.name}: ${scoreData.runs}/${scoreData.wickets} (${scoreData.overs})`;

            // Batting update
            const battingElement = document.getElementById(`batting-${matchId}`);
            if (data.stricker && data.nonstricker) {
                battingElement.innerHTML =
                    `<strong>Batting:</strong>
            <p>* ${data.stricker.name} - ${data.stricker_score.runs}(${data.stricker_score.balls}), 
            ${data.nonstricker.name} - ${data.nonstricker_score.runs}(${data.nonstricker_score.balls})</p>`;
            }

            // Bowling update
            const bowlingElement = document.getElementById(`bowling-${matchId}`);
            if (data.bowler) {
                bowlingElement.innerHTML =
                    `<strong>Bowler:</strong>
            <p>${data.bowler.name} - ${data.bowler_score.wickets}/${data.bowler_score.runs} 
            in ${data.bowler_score.overs} overs</p>`;
            }
        })
        .catch(error => {
            console.error('Error refreshing live score:', error);
        });
}

// Auto-refresh every 2 seconds
const allMatchElements = document.querySelectorAll('.club-liveupdate-score-info');
allMatchElements.forEach(el => {
    const matchId = el.dataset.matchId;
    setInterval(() => refreshLiveScore(matchId), 2000); // 2s
});

