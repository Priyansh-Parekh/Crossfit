
function fetchLiveScore(matchId) {
    fetch(`/match/refresh/live_score/${matchId}`)
        .then(res => res.json())
        .then(data => {
            const card = document.querySelector(`.live-score-page-match-card[data-match-id="${matchId}"]`);
            if (!card) return;

            // Update scores in the DOM
            const scoreElements = card.querySelectorAll('.live-score-page-score p');
            if (scoreElements.length >= 2) {
                scoreElements[0].innerText = `${data.score.club1.runs}/${data.score.club1.wickets} - (${data.score.club1.overs})`;
                scoreElements[1].innerText = `${data.score.club2.runs}/${data.score.club2.wickets} - (${data.score.club2.overs})`;
            }

            // Optionally update other elements like striker, bowler etc.
        })
        .catch(err => console.error("Error fetching live score:", err));
}

// Refresh all live matches every 2 seconds
setInterval(() => {
    document.querySelectorAll('.live-score-page-match-card').forEach(card => {
        const matchId = card.dataset.matchId;
        fetchLiveScore(matchId);
    });
}, 10000); 

