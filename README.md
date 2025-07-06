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

📦 sports_platform
├── 👤 viewers
│   ├── _id                 // ObjectId
│   ├── name               // String
│   ├── email              // String (unique)
│   ├── password           // String (hashed)
│   ├── profile_picture    // String (URL)
│   ├── user_type          // "viewer"
│   ├── status             // "active" | "inactive"
│   ├── location           // String
│   ├── favorite_teams     // [ObjectId] -> clubs._id
│   ├── createdAt          // Date
│   └── updatedAt          // Date
│
├── 🏟 clubs
│   ├── _id                // ObjectId
│   ├── name               // String
│   ├── email              // String (unique)
│   ├── password           // String (hashed)
│   ├── phone              // String
│   ├── logo               // String (URL)
│   ├── bio                // String
│   ├── user_type          // "club"
│   ├── status             // "active" | "inactive"
│   ├── location           // String
│   ├── founded_year       // Number
│   ├── sport              // "cricket"
│   ├── match_won          // [ObjectId] -> matches._id
│   ├── match_lose         // [ObjectId] -> matches._id
│   ├── match_played         // [array] -> {True or False,Matched.id }
│   ├── players            // [ObjectId] -> players._id
│   ├── merchandise        // [ObjectId] -> merchandise._id
│   ├── captain            // ObjectId -> players._id
│   ├── vice_captain       // ObjectId -> players._id
│   ├── wicket_keeper      // ObjectId -> players._id
│   ├── bowlers            // [ObjectId] -> players._id
│   ├── batsman            // [ObjectId] -> players._id
│   ├── createdAt          // Date
│   └── updatedAt          // Date
│
├── 🏆 leagues
│   ├── _id                // ObjectId
│   ├── name               // String
│   ├── email              // String (unique)
│   ├── password           // String (hashed)
│   ├── phone              // String
│   ├── logo               // String (URL)
│   ├── description        // String
│   ├── user_type          // "league"
│   ├── status             // "active" | "inactive"
│   ├── organizer_name     // String
│   ├── start_date         // Date
│   ├── end_date           // Date
│   ├── sport              // "cricket"
│   ├── participating_clubs // [ObjectId] -> clubs._id
│   ├── schedule           // [ObjectId] -> matches._id
│   ├── pointsTable        // [{ clubId: ObjectId, points: Number, wins: Number, draws: Number, losses: Number }]
│   ├── createdAt          // Date
│   └── updatedAt          // Date
│
├── 👤 players
│   ├── _id                // ObjectId
│   ├── name               // String
│   ├── email              // String (optional)
│   ├── phone              // String
│   ├── profile_picture    // String (URL)
│   ├── registered_club    // ObjectId -> clubs._id
│   ├── type               // "batsman" | "bowler" | "wicket_keeper" | "all_rounder"
│   ├── role               // "captain" | "vice_captain" | "player" | "wicket_keeper"
│   ├── age                // Number
│   ├── batting_style      // "right_handed" | "left_handed"
│   ├── bowling_style      // "fast" | "medium" | "spin" | "off_spin" | "leg_spin"
│   ├── jersey_number      // Number
│   ├── status             // "active" | "injured" | "retired"
│   ├── createdAt          // Date
│   └── updatedAt          // Date
│
├── 🛒 merchandise
│   ├── _id                // ObjectId
│   ├── name               // String
│   ├── price              // Number
│   ├── imageUrl           // String
│   ├── description        // String
│   ├── sport              // "cricket"
│   ├── clubId             // ObjectId -> clubs._id
│   ├── category           // "jersey" | "cap" | "accessories" | "equipment"
│   ├── stock_quantity     // Number
│   ├── status             // "available" | "out_of_stock"
│   ├── createdAt          // Date
│   └── updatedAt          // Date
│
└── 📈 matches
    ├── _id                // ObjectId
    ├── clubA              // ObjectId -> clubs._id
    ├── clubB              // ObjectId -> clubs._id
    ├── league             // ObjectId -> leagues._id
    ├── venue              // String
    ├── match_type         // "T20" | "ODI" | "Test"
    ├── status             // "upcoming" | "live" | "completed" | "cancelled"
    ├── matchDate          // Date
    ├── score              // { clubA: { runs: Number, wickets: Number, overs: Number }, clubB: { runs: Number, wickets: Number, overs: Number } }
    ├── winner             // ObjectId -> clubs._id
    ├── man_of_match       // ObjectId -> players._id
    ├── toss_winner        // ObjectId -> clubs._id
    ├── toss_decision      // "bat" | "bowl"
    ├── events             // [{ time: String, player: ObjectId, description: String, type: String }]
    ├── playerStats        // [{ playerId: ObjectId, clubId: ObjectId, batting: {}, bowling: {} }]
    ├── heatmapData        // Object (optional)
    ├── createdAt          // Date
    └── updatedAt          // Date
    </pre>

