// public/js/news_script.js
document.addEventListener('DOMContentLoaded', () => {
  const newsGrid = document.getElementById('news-grid');
  const loader = document.getElementById('loader');
  const topicButtons = document.querySelectorAll('.topic-btn');

  // Simplified state variables
  let isLoading = false;
  let currentTopic = 'cricket';

  const fetchNews = async (topic) => {
    if (isLoading) return;
    isLoading = true;
    newsGrid.innerHTML = ''; // Clear the grid before fetching
    loader.classList.remove('hidden');

    try {
      // Fetch without a page number
      const response = await fetch(`/api/news?topic=${topic}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        displayArticles(data.articles);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      isLoading = false;
      loader.classList.add('hidden');
    }
  };

  const displayArticles = (articles) => {
    const articlesHTML = articles
      .filter(article => article.urlToImage && article.title && article.description)
      .map(article => `
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="img-news-card">
          <img src="${article.urlToImage}" alt="${article.title}" class="img-news-card__image">
          <div class="img-news-card__content">
            <h3 class="img-news-card__title">${article.title}</h3>
            <p class="img-news-card__description">${article.description}</p>
          </div>
        </a>
      `).join('');

    // Replace the grid content, don't append
    newsGrid.innerHTML = articlesHTML;
  };

  topicButtons.forEach(button => {
    button.addEventListener('click', () => {
      const newTopic = button.dataset.topic;
      if (newTopic === currentTopic) return;

      topicButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      currentTopic = newTopic;
      fetchNews(currentTopic);
    });
  });

  // Initial fetch for the default topic
  fetchNews(currentTopic);
});