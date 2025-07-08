
// Sample data for different sports
const sportsData = {
    cricket: {
        news: [
            {
                image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop&crop=center",
                title: "World Cup Final Creates Historic Moments",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                time: "2 hours ago"
            },
            {
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                title: "New Record Set in Championship Match",
                content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                time: "4 hours ago"
            },
            {
                image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop&crop=center",
                title: "Player of the Year Award Announced",
                content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                time: "6 hours ago"
            },
            {
                image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&crop=center",
                title: "Training Camp Begins for Next Season",
                content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                time: "8 hours ago"
            }
        ],
        clubs: [
            {
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center",
                name: "Mumbai Indians",
                league: "IPL"
            },
            {
                image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=100&h=100&fit=crop&crop=center",
                name: "Chennai Super Kings",
                league: "IPL"
            },
            {
                image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=center",
                name: "Royal Challengers",
                league: "IPL"
            },
            {
                image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop&crop=center",
                name: "Kolkata Knight Riders",
                league: "IPL"
            },
            {
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center",
                name: "Delhi Capitals",
                league: "IPL"
            }
        ]
    },
    football: {
        news: [
            {
                image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop&crop=center",
                title: "Champions League Final Draws Record Viewers",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                time: "1 hour ago"
            },
            {
                image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop&crop=center",
                title: "Transfer Window Opens with Major Signings",
                content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                time: "3 hours ago"
            },
            {
                image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop&crop=center",
                title: "World Cup Qualifiers Begin This Month",
                content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                time: "5 hours ago"
            },
            {
                image: "https://images.unsplash.com/photo-1526232761682-d26e85d2b9c6?w=400&h=300&fit=crop&crop=center",
                title: "Youth Academy Produces Rising Stars",
                content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                time: "7 hours ago"
            }
        ],
        clubs: [
            {
                image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=100&h=100&fit=crop&crop=center",
                name: "Manchester United",
                league: "Premier League"
            },
            {
                image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=100&h=100&fit=crop&crop=center",
                name: "Barcelona FC",
                league: "La Liga"
            },
            {
                image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&h=100&fit=crop&crop=center",
                name: "Real Madrid",
                league: "La Liga"
            },
            {
                image: "https://images.unsplash.com/photo-1526232761682-d26e85d2b9c6?w=100&h=100&fit=crop&crop=center",
                name: "Liverpool FC",
                league: "Premier League"
            },
            {
                image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=100&h=100&fit=crop&crop=center",
                name: "Bayern Munich",
                league: "Bundesliga"
            }
        ]
    },
    volleyball: {
        news: [
            {
                image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=300&fit=crop&crop=center",
                title: "Olympic Team Prepares for International Games",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                time: "30 minutes ago"
            },
            {
                image: "https://images.unsplash.com/photo-1594736797933-d0bc023c3d12?w=400&h=300&fit=crop&crop=center",
                title: "Beach Volleyball Championship Begins",
                content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                time: "2 hours ago"
            },
            {
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center",
                title: "New Training Facility Opens Downtown",
                content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                time: "4 hours ago"
            },
            {
                image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=300&fit=crop&crop=center",
                title: "Youth League Tournaments Start Next Week",
                content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                time: "6 hours ago"
            }
        ],
        clubs: [
            {
                image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=100&h=100&fit=crop&crop=center",
                name: "Titans Volleyball",
                league: "Professional League"
            },
            {
                image: "https://images.unsplash.com/photo-1594736797933-d0bc023c3d12?w=100&h=100&fit=crop&crop=center",
                name: "Storm Riders",
                league: "National League"
            },
            {
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop&crop=center",
                name: "Thunder Bolts",
                league: "Professional League"
            },
            {
                image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=100&h=100&fit=crop&crop=center",
                name: "Lightning Spikes",
                league: "Championship League"
            },
            {
                image: "https://images.unsplash.com/photo-1594736797933-d0bc023c3d12?w=100&h=100&fit=crop&crop=center",
                name: "Phoenix Volleyball",
                league: "Elite League"
            }
        ]
    }
};

let currentSport = 'cricket';

function renderNews(sport) {
    const newsGrid = document.getElementById('news-grid');
    const newsData = sportsData[sport].news;
    
    newsGrid.innerHTML = newsData.map(item => `
        <div class="news-item">
            <img src="${item.image}" alt="News Image">
            <div class="news-content">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <div class="news-meta">
                    <span>${item.time}</span>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </div>
        </div>
    `).join('');
}

function renderClubs(sport) {
    const clubsGrid = document.getElementById('clubs-grid');
    const clubsData = sportsData[sport].clubs;
    
    clubsGrid.innerHTML = clubsData.map(club => `
        <div class="club-item">
            <img src="${club.image}" alt="${club.name}">
            <div class="club-info">
                <h4>${club.name}</h4>
                <p>${club.league}</p>
            </div>
        </div>
    `).join('');
}

function switchSport(sport) {
    // Update active sport
    document.querySelectorAll('.sport-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-sport="${sport}"]`).classList.add('active');
    
    // Update content
    currentSport = sport;
    renderNews(sport);
    renderClubs(sport);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to sport items
    document.querySelectorAll('.sport-item').forEach(item => {
        item.addEventListener('click', function() {
            const sport = this.getAttribute('data-sport');
            switchSport(sport);
        });
    });
    
    // Load initial content
    switchSport('cricket');
});