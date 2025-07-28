document.addEventListener('DOMContentLoaded', function () {
  const cricketBtn = document.getElementById('club-enlistpage-filter-cricket');
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
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (cricketBtn) {
    cricketBtn.addEventListener('click', function () {
      if (activeFilter === 'cricket') {
        // toggle off
        activeFilter = null;
        cricketBtn.classList.remove('active');
      } else {
        activeFilter = 'cricket';
        cricketBtn.classList.add('active');
      }
      applyFilter();
    });
  }

  if (searchBar) {
    searchBar.addEventListener('input', function () {
      searchText = searchBar.value.trim().toLowerCase();
      applyFilter();
    });
  }

  // Initial: show all
  applyFilter();
});
