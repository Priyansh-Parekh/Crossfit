// ✅ Match ID from <body data-match-id="">
const matchIdElem = document.getElementById('live-score-match-data-1');
const matchId = matchIdElem ? matchIdElem.getAttribute('data-match-id') : null;

// ✅ Function to fetch live score data
async function fetchMatchData() {
  if (!matchId) return;
  try {
    const res = await fetch(`/match/refresh/live_score/${matchId}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    updateMatchUI(data);
  } catch (err) {
    console.error("Error fetching match data:", err);
  }
}

// ✅ Update UI with new match data
function updateMatchUI(data) {
  if (!data) return;

  const clubfirst = data.firstInnings && data.club1 && 
    data.firstInnings._id.toString() === data.club1._id.toString() ? 'club1' : 'club2';

  const clubsecond = data.secondInnings && data.club1 &&
    data.secondInnings._id.toString() === data.club1._id.toString() ? 'club1' : 'club2';

  // Score elements
  const firstInning_score = document.getElementById('live-score-specific-firstInning-score');
  const firstInning_overs = document.getElementById('live-score-specific-firstInning-overs');
  const secondInning_score = document.getElementById('live-score-specific-secondInning-score');
  const secondInning_overs = document.getElementById('live-score-specific-secondInning-overs');

  if (firstInning_score && firstInning_overs && data.score && data.score[clubfirst]) {
    firstInning_score.textContent = `${data.score[clubfirst].runs} / ${data.score[clubfirst].wickets}`;
    firstInning_overs.textContent = `Overs: (${data.score[clubfirst].overs})`;
  }

  if (secondInning_score && secondInning_overs && data.score && data.score[clubsecond]) {
    secondInning_score.textContent = `${data.score[clubsecond].runs} / ${data.score[clubsecond].wickets}`;
    secondInning_overs.textContent = `Overs: (${data.score[clubsecond].overs})`;
  }

  // Current players scores
  const stricker_score = document.getElementById('live-score-specific-stricker-score');
  const nonstricker_score = document.getElementById('live-score-specific-nonstricker-score');
  const bowler_score = document.getElementById('live-score-specific-bowler-score');

  if (
    stricker_score && nonstricker_score && bowler_score &&
    data.stricker && data.stricker_score && data.nonstricker && data.nonstricker_score && data.bowler && data.bowler_score
  ) {
    stricker_score.innerHTML = `<strong>Striker:</strong> ${data.stricker.name} (${data.stricker_score.runs} runs, ${data.stricker_score.balls} balls)`;
    nonstricker_score.innerHTML = `<strong>NonStriker:</strong> ${data.nonstricker.name} (${data.nonstricker_score.runs} runs, ${data.nonstricker_score.balls} balls)`;
    bowler_score.innerHTML = `<strong>Bowler:</strong> ${data.bowler.name} (${data.bowler_score.overs} overs, ${data.bowler_score.runs} runs, ${data.bowler_score.wickets} wicket${data.bowler_score.wickets !== 1 ? 's' : ''})`;
  }

  // Batting scoreboard - first innings
  const firstInning_bat_score = document.getElementById('live-score-specific-firstinning-bat');
  if (firstInning_bat_score && data.playerStats && data.firstInnings) {
    let batRows = '';
    data.playerStats.forEach(player => {
      // Defensive checks for nested properties
      const playerClubId = player.playerId && player.playerId.registered_club ? player.playerId.registered_club.toString() : null;
      if (playerClubId === data.firstInnings._id.toString()) {
        batRows += `
          <tr style="color: ${player.batting.out ? 'red' : 'white'}">
            <td>${player.playerId.name || ''}</td>
            <td>${player.batting.runs || 0}</td>
            <td>${player.batting.balls || 0}</td>
            <td>${player.batting.fours || 0}</td>
            <td>${player.batting.sixes || 0}</td>
            <td>${player.batting.strike_rate?.toFixed(2) || 0}</td>
          </tr>
        `;
      }
    });
    firstInning_bat_score.innerHTML = batRows;
  }

  // Bowling scoreboard - first innings (bowlers from second innings club)
  const firstInning_bowl_score = document.getElementById('live-score-specific-firstinning-bowl');
  if (firstInning_bowl_score && data.playerStats && data.secondInnings) {
    let bowlRows = '';
    data.playerStats.forEach(player => {
      const playerClubId = player.playerId && player.playerId.registered_club ? player.playerId.registered_club.toString() : null;
      if (
        playerClubId === data.secondInnings._id.toString() &&
        player.playerId && player.playerId.type === 'bowler'
      ) {
        bowlRows += `
          <tr>
            <td>${player.playerId.name || ''}</td>
            <td>${player.bowling.overs || 0}</td>
            <td>${player.bowling.runs || 0}</td>
            <td>${player.bowling.wickets || 0}</td>
            <td>${player.bowling.economy?.toFixed(2) || 0}</td>
          </tr>
        `;
      }
    });
    firstInning_bowl_score.innerHTML = bowlRows;
  }

  // Batting and Bowling scoreboards for second innings
  const secondInning_bat_score = document.getElementById('live-score-specific-secondInnings-bat');
  const secondInning_bowl_score = document.getElementById('live-score-specific-secondInnings-bowl');

  if (secondInning_bat_score && secondInning_bowl_score && data.playerStats && data.secondInnings && data.firstInnings) {
    let secondBatRows = '';
    let secondBowlRows = '';

    data.playerStats.forEach(player => {
      const playerClubId = player.playerId && player.playerId.registered_club ? player.playerId.registered_club.toString() : null;
      // Batting for second innings club
      if (playerClubId === data.secondInnings._id.toString()) {
        secondBatRows += `
          <tr style="color: ${player.batting.out ? 'red' : 'white'}">
            <td>${player.playerId.name || ''}</td>
            <td>${player.batting.runs || 0}</td>
            <td>${player.batting.balls || 0}</td>
            <td>${player.batting.fours || 0}</td>
            <td>${player.batting.sixes || 0}</td>
            <td>${player.batting.strike_rate?.toFixed(2) || 0}</td>
          </tr>
        `;
      }
      // Bowlers bowling in first innings club (against second innings batsmen)
      if (
        playerClubId === data.firstInnings._id.toString() &&
        player.playerId && player.playerId.type === 'bowler'
      ) {
        secondBowlRows += `
          <tr>
            <td>${player.playerId.name || ''}</td>
            <td>${player.bowling.overs || 0}</td>
            <td>${player.bowling.runs || 0}</td>
            <td>${player.bowling.wickets || 0}</td>
            <td>${player.bowling.economy?.toFixed(2) || 0}</td>
          </tr>
        `;
      }
    });

    secondInning_bat_score.innerHTML = secondBatRows;
    secondInning_bowl_score.innerHTML = secondBowlRows;
  }
}

// ✅ Auto refresh every 20 seconds
setInterval(fetchMatchData, 10000);

// ✅ Optional: call once immediately to load right away
fetchMatchData();
