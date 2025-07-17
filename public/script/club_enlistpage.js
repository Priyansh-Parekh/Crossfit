document.addEventListener('DOMContentLoaded', function () {
  const cricketBtn = document.getElementById('club-enlistpage-filter-cricket');
  const footballBtn = document.getElementById('club-enlistpage-filter-football');
  const clubCards = document.querySelectorAll('.club-enlistpage-club-card');
  const noResults = document.getElementById('club-enlistpage-no-results');
  const searchBar = document.getElementById('club-enlistpage-searchbar');

  let activeFilter = null;
  let searchText = '';

  function applyFilter() {
    let visibleCount = 0;
    clubCards.forEach(card => {
      const sport = card.getAttribute('data-sport');
      const name = card.querySelector('.club-enlistpage-club-name').textContent.toLowerCase();
      const matchesSport = !activeFilter || sport === activeFilter;
      const matchesSearch = !searchText || name.includes(searchText);
      if (matchesSport && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }

  function handleFilterClick(sport, btn) {
    return function () {
      if (activeFilter === sport) {
        // Toggle off
        activeFilter = null;
        cricketBtn.classList.remove('active');
        footballBtn.classList.remove('active');
      } else {
        activeFilter = sport;
        cricketBtn.classList.toggle('active', sport === 'cricket');
        footballBtn.classList.toggle('active', sport === 'football');
      }
      applyFilter();
    };
  }

  cricketBtn.addEventListener('click', handleFilterClick('cricket', cricketBtn));
  footballBtn.addEventListener('click', handleFilterClick('football', footballBtn));

  searchBar.addEventListener('input', function () {
    searchText = searchBar.value.trim().toLowerCase();
    applyFilter();
  });

  // Initial state: show all
  applyFilter();
});
