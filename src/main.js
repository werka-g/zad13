import { supabase } from './supabase.js';

main();

async function main() {
  console.log('main');
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
    console.error('Brak elementu o id "articles-list" w HTML');
    return;
  }

  if (!articles.length) {
    container.innerHTML = '<p>Brak artykułów do wyświetlenia.</p>';
    return;
  }

  container.innerHTML = articles.map(article => `
    <article class="mb-6 p-4 border rounded shadow hover:shadow-lg transition-shadow">
      <h2 class="text-2xl font-bold">${article.title}</h2>
      <h3 class="text-lg italic text-gray-600">${article.subtitle}</h3>
      <p class="text-sm text-gray-500">Autor: ${article.author} | ${new Date(article.created_at).toLocaleDateString()}</p>
      <div class="mt-2">${article.content}</div>
    </article>
  `).join('');
}

}
