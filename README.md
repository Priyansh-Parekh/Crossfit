# Sporttellect
<pre>
🏠 Home Page
├── 📰 News Section
│   ├── Football News Page
│   ├── Cricket News Page
│   └── Basketball News Page
│
├── 🛍 Merchandise Section
│   ├── Football Merchandise
│   ├── Cricket Merchandise
│   └── Basketball Merchandise
│
├── 📊 Live Scorecard & Info
│   ├── For Each Game
│   │     ├── Live Match Scores
│   │     ├── Player Performance (per match)
│   │     └── Heatmap Chart (basic visuals)
│
├── 🃏 Card Game (Engagement Feature)
│   └── Cricket Card Based Game
│
├── 🧑‍🤝‍🧑 Team Page (For Clubs)
│   ├── Team Info Page (Public)
│   ├── Club Login
│   │   ├── Update Team Score (Live)
│   │   ├── Able to challange other clubs
│   │   ├── Upload/Manage Merchandise
│   │   └── Edit Team Profile
│
├── 🏆 Tournament Organizer (For Leagues)
│   ├── League Dashboard
│   │   ├── Create New Tournament
│   │   ├── Register Teams (from Club Users)
│   │   ├── Schedule Matches
│   │   ├── Input Match Results
│   │   └── View & Edit Points Table
│
└── 👤 User Account (All roles)
    ├── Viewer
    │   ├── Follow Favorite Teams
    │   ├── Participate Card Games
    │   ├── Purchase Merchandise
    │   └── Comment on News
    │
    ├── Club
    │   ├── Manage Team Page
    │   └── Upload Products
    │
    └── League
        ├── Create & Manage Tournaments
        └── Moderate Participating Clubs




# DataBase

📦 Database: sports_platform
├── 👤 viewrs
│   ├── _id
│   ├── name
│   ├── email
│   ├── password
│   ├── favoriteTeams     // [teamId] for individuals
│   └── createdAt
│
├── 🏟 clubs(cricket)
│   ├── _id
│   ├── name
│   ├── logo
│   ├── bio
│   ├── matchWon        //[]
│   ├── matchLose       //[]
│   ├── players           // [players]
│   ├── matchesPlayed     // [matchId]
│   ├── sport    
│   ├── merchandise       // [productId]
│   ├── 
│   └── 
│ 
│
├── 🏆 tournaments League
│   ├── _id
│   ├── name
│   ├── schedule          // [matchId]
│   ├── pointsTable       // [{ clubId, points, wins, draws, losses }]
│   └── createdAt


👤 players
│   ├── _id
│   ├── name
│   ├── registerd club
│   ├── favoriteTeams     // [teamId] for individuals
│   └── createdAt

🛒 merchandise
│   ├── _id
│   ├── name
│   ├── price
│   ├── imageUrl
│   ├── description
│   ├── sport
│   ├── clubId
│   └── createdAt

📈 matches
│   ├── _id
│   ├── clubA
│   ├── clubB
│   ├── leagueId
│   ├── score             // { clubA: int, clubB: int }
│   ├── events            // [{ time, player, type }]
│   ├── playerStats       // [{ playerId, goals, assists, ... }]
│   ├── heatmapData       // optional: chart visualization
│   └── matchDate

    </pre>

