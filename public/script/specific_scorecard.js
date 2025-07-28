// ✅ Match ID from <body data-match-id="">
const matchId = document.getElementById('live-score-match-data-1').getAttribute('data-match-id');
// ✅ Function to fetch live score data
async function fetchMatchData() {
    try {
        const res = await fetch(`/match/refresh/live_score/${matchId}`);
        const data = await res.json();
        updateMatchUI(data);
    } catch (err) {
        console.error("Error fetching match data:", err);
    }
}

// ✅ Update UI with new match data
function updateMatchUI(data) {

    let clubfirst = data.firstInnings._id === data.club1._id ? 'club1' : 'club2';
    let clubsecond = data.secondInnings._id === data.club1._id ? 'club1' : 'club2';

    const firstInning_score = document.getElementById('live-score-specific-firstInning-score');
    const firstInning_overs = document.getElementById('live-score-specific-firstInning-overs');
    const secondInning_overs = document.getElementById('live-score-specific-secondInning-overs');
    const secondInning_score = document.getElementById('live-score-specific-secondInning-score');
    // console.log(secondInning_score)

    firstInning_score.innerHTML = `${data.score[clubfirst].runs} /  ${data.score[clubfirst].wickets}`;
    firstInning_overs.innerHTML = `Overs: (${data.score[clubfirst].overs}) `;
    if (secondInning_overs && secondInning_score) {
        secondInning_score.innerHTML = `${data.score[clubsecond].runs} /  ${data.score[clubsecond].wickets}`;
        secondInning_overs.innerHTML = `Overs: (${data.score[clubsecond].overs}) `;
    }

    const stricker_score = document.getElementById('live-score-specific-stricker-score');
    const nonstricker_score = document.getElementById('live-score-specific-nonstricker-score');
    const bowler_score = document.getElementById('live-score-specific-bowler-score');

    stricker_score.innerHTML = `<strong>Striker:</strong> ${data.stricker.name}  (${data.stricker_score.runs}  runs, ${data.stricker_score.balls}  balls)`
    nonstricker_score.innerHTML = `<strong>NonStriker:</strong> ${data.nonstricker.name}  (${data.nonstricker_score.runs}  runs, ${data.nonstricker_score.balls}  balls)`
    bowler_score.innerHTML = ` <strong>Bowler:</strong> ${data.bowler.name}  (${data.bowler_score.overs}  overs,${data.bowler_score.runs}  runs, ${data.bowler_score.wickets}  wicket)`

    const firstInning_bat_score = document.getElementById('live-score-specific-firstinning-bat');
    const firstInning_bowl_score = document.getElementById('live-score-specific-firstinning-bowl');

    // console.log(data.playerStats)
    // Loop through playerStats array
    firstInning_bat_score.innerHTML = ''
    data.playerStats.forEach(player => {
        // Check if player belongs to the firstInnings club
        if (String(data.firstInnings._id) === String(player.playerId.registered_club)) {
            const row = `
                              <tr>
                                <td>${player.playerId.name}</td>
                                <td>${player.batting.runs}</td>
                                <td>${player.batting.balls}</td>
                                <td>${player.batting.fours}</td>
                                <td>${player.batting.sixes}</td>
                                <td>${player.batting.strike_rate}</td>
                              </tr>
    `;
            firstInning_bat_score.innerHTML += row;
        }
    });

    firstInning_bowl_score.innerHTML = ''
    data.playerStats.forEach(player => {
        // Check if player belongs to the firstInnings club
        if ((String(data.secondInnings._id) === String(player.playerId.registered_club) ) && player.playerId.type === 'bowler' ) {
            const row = `
                              <tr>
                                    <td>${player.playerId.name}</td>
                                    <td>${player.bowling.overs}</td>
                                    <td>${player.bowling.runs} </td>
                                    <td>${player.bowling.wickets}</td>
                                    <td>${player.bowling.economy}</td>
                                </tr>
    `;
            firstInning_bowl_score.innerHTML += row;
        }
    });


    const secondInning_bat_score = document.getElementById('live-score-specific-secondInnings-bat');
    const secondInning_bowl_score = document.getElementById('live-score-specific-secondInnings-bowl');

    if (secondInning_bat_score && secondInning_bowl_score) {


        secondInning_bat_score.innerHTML = ''
        data.playerStats.forEach(player => {
            // Check if player belongs to the firstInnings club
            if (String(data.secondInnings._id) === String(player.playerId.registered_club)) {
                const row = `
                               <tr>
                                <td>${player.playerId.name}</td>
                                <td>${player.batting.runs}</td>
                                <td>${player.batting.balls}</td>
                                <td>${player.batting.fours}</td>
                                <td>${player.batting.sixes}</td>
                                <td>${player.batting.strike_rate}</td>
                              </tr>
    `;
                secondInning_bat_score.innerHTML += row;
            }
        });


           secondInning_bowl_score.innerHTML = ''
    data.playerStats.forEach(player => {
        // Check if player belongs to the firstInnings club
        if ((String(data.firstInnings._id) === String(player.playerId.registered_club) ) && player.playerId.type === 'bowler' ) {
            const row = `
                              <tr>
                                    <td>${player.playerId.name}</td>
                                    <td>${player.bowling.overs}</td>
                                    <td>${player.bowling.runs} </td>
                                    <td>${player.bowling.wickets}</td>
                                    <td>${player.bowling.economy}</td>
                                </tr>
    `;
            secondInning_bowl_score.innerHTML += row;
        }
    });
    }



}



// ✅ Auto refresh every 5 seconds
setInterval(fetchMatchData, 5000);

// ✅ Optional: call once immediately
fetchMatchData();
