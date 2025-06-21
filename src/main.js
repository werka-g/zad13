import { supabase } from './supabase.js';

main();

async function main() {
  console.log('main.js uruchomiony');

  // Obsługa modala "dodaj artykuł"
  document.getElementById('add-article-btn').addEventListener('click', () => {
    document.getElementById('add-article-modal').classList.remove('hidden');
  });

  document.getElementById('cancel-add').addEventListener('click', () => {
    document.getElementById('add-article-modal').classList.add('hidden');
  });

  document.getElementById('add-article-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const subtitle = e.target.subtitle.value.trim();
    const author = e.target.author.value.trim();
    const content = e.target.content.value.trim();

    if (!title || !subtitle || !author || !content) {
      alert('Wypełnij wszystkie pola!');
      return;
    }

    const { error } = await supabase
      .from('articles')
      .insert([{
        title,
        subtitle,
        author,
        content,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      alert('Błąd podczas dodawania artykułu: ' + error.message);
      return;
    }

    e.target.reset();
    document.getElementById('add-article-modal').classList.add('hidden');

    // Odśwież listę
    const articles = await fetchArticles();
    renderArticles(articles);
  });

  // Na start załaduj artykuły
  const articles = await fetchArticles();
  renderArticles(articles);
}

async function fetchArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Błąd pobierania artykułów:', error);
    return [];
  }

  return data;
}

function renderArticles(articles) {
  const container = document.getElementById('articles-list');
  if (!container) {
    console.error('Brak elementu #articles-list');
    return;
  }

  if (!articles.length) {
    container.innerHTML = '<p>Brak artykułów do wyświetlenia.</p>';
    return;
  }

  container.innerHTML = articles.map(article => `
    <article class="border rounded p-4 shadow hover:shadow-lg transition">
      <h2
