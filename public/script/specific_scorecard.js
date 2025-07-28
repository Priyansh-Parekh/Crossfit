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

  let clubfirst = data.firstInnings._id === data.club1._id ? 'club1' : 'club2';
  let clubsecond = data.secondInnings._id === data.club1._id ? 'club1' : 'club2';

  const firstInning_score = document.getElementById('live-score-specific-firstInning-score');
  const firstInning_overs = document.getElementById('live-score-specific-firstInning-overs');
  const secondInning_overs = document.getElementById('live-score-specific-secondInning-overs');
  const secondInning_score = document.getElementById('live-score-specific-secondInning-score');

  if (firstInning_score && firstInning_overs) {
    firstInning_score.innerHTML = `${data.score[clubfirst].runs} / ${data.score[clubfirst].wickets}`;
    firstInning_overs.innerHTML = `Overs: (${data.score[clubfirst].overs})`;
  }
  if (secondInning_overs && secondInning_score) {
    secondInning_score.innerHTML = `${data.score[clubsecond].runs} / ${data.score[clubsecond].wickets}`;
    secondInning_overs.innerHTML = `Overs: (${data.score[clubsecond].overs})`;
  }

  const stricker_score = document.getElementById('live-score-specific-stricker-score');
  const nonstricker_score = document.getElementById('live-score-specific-nonstricker-score');
  const bowler_score = document.getElementById('live-score-specific-bowler-score');

  if (stricker_score && nonstricker_score && bowler_score) {
    stricker_score.innerHTML = `<strong>Striker:</strong> ${data.stricker.name} (${data.stricker_score.runs} runs, ${data.stricker_score.balls} balls)`;
    nonstricker_score.innerHTML = `<strong>NonStriker:</strong> ${data.nonstricker.name} (${data.nonstricker_score.runs} runs, ${data.nonstricker_score.balls} balls)`;
    bowler_score.innerHTML = `<strong>Bowler:</strong> ${data.bowler.name} (${data.bowler_score.overs} overs, ${data.bowler_score.runs} runs, ${data.bowler_score.wickets} wicket${data.bowler_score.wickets !== 1 ? 's' : ''})`;
  }

  const firstInning_bat_score = document.getElementById('live-score-specific-firstinning-bat');
  const firstInning_bowl_score = document.getElementById('live-score-specific-firstinning-bowl');

  if (firstInning_bat_score) {
    firstInning_bat_score.innerHTML = '';
    data.playerStats.forEach(player => {
      // Players batting for first innings club
      if (String(data.firstInnings._id) === String(player.playerId.registered_club)) {
        const row = `
          <tr style = "color: ${player.batting.out ? 'red' : 'white'}">
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
  }

  if (firstInning_bowl_score) {
    firstInning_bowl_score.innerHTML = '';
    data.playerStats.forEach(player => {
      // Bowlers bowling in second innings club (against first innings batsmen)
      if (String(data.secondInnings._id) === String(player.playerId.registered_club) && player.playerId.type === 'bowler') {
        const row = `
          <tr>
            <td>${player.playerId.name}</td>
            <td>${player.bowling.overs}</td>
            <td>${player.bowling.runs}</td>
            <td>${player.bowling.wickets}</td>
            <td>${player.bowling.economy}</td>
          </tr>
        `;
        firstInning_bowl_score.innerHTML += row;
      }
    });
  }

  const secondInning_bat_score = document.getElementById('live-score-specific-secondInnings-bat');
  const secondInning_bowl_score = document.getElementById('live-score-specific-secondInnings-bowl');

  if (secondInning_bat_score && secondInning_bowl_score) {
    secondInning_bat_score.innerHTML = '';
    data.playerStats.forEach(player => {
      // Players batting for second innings club
      if (String(data.secondInnings._id) === String(player.playerId.registered_club)) {
        const row = `
          <tr style = "color: ${player.batting.out ? 'red' : 'white'}">
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

    secondInning_bowl_score.innerHTML = '';
    data.playerStats.forEach(player => {
      // Bowlers bowling in first innings club (against second innings batsmen)
      if (String(data.firstInnings._id) === String(player.playerId.registered_club) && player.playerId.type === 'bowler') {
        const row = `
          <tr>
            <td>${player.playerId.name}</td>
            <td>${player.bowling.overs}</td>
            <td>${player.bowling.runs}</td>
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
