import { supabase } from './supabase.js';

let currentUser;

window.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  currentUser = user;

  if (user) {
    document.getElementById('logout-btn').style.display = 'block';
  }

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.reload();
  });

  document.getElementById('add-btn').addEventListener('click', () => {
    document.getElementById('add-form').style.display = 'block';
  });

  document.getElementById('save-article').addEventListener('click', async () => {
    const title = document.getElementById('add-title').value;
    const author = document.getElementById('add-author').value;
    const content = document.getElementById('add-content').value;
    await supabase.from('articles').insert([{ title, author, content, created_at: new Date().toISOString() }]);
    document.getElementById('add-form').style.display = 'none';
    fetchArticles();
  });

  document.getElementById('cancel-edit').addEventListener('click', () => {
    document.getElementById('edit-form').style.display = 'none';
  });

  fetchArticles();
});

async function fetchArticles() {
  const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
  const container = document.getElementById('articles');
  container.innerHTML = '';

  data.forEach(article => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h2>${article.title}</h2>
      <h3>${article.author}</h3>
      <small>${article.created_at}</small>
      <p>${article.content}</p>
    `;

    if (currentUser) {
      const del = document.createElement('button');
      del.textContent = 'Usuń';
      del.onclick = async () => {
        await supabase.from('articles').delete().eq('id', article.id);
        fetchArticles();
      };
      div.appendChild(del);

      const edit = document.createElement('button');
      edit.textContent = 'Edytuj';
      edit.onclick = () => {
        document.getElementById('edit-title').value = article.title;
        document.getElementById('edit-author').value = article.author;
        document.getElementById('edit-content').value = article.content;
        document.getElementById('edit-form').style.display = 'block';
        document.getElementById('save-edit').onclick = async () => {
          await supabase.from('articles').update({
            title: document.getElementById('edit-title').value,
            author: document.getElementById('edit-author').value,
            content: document.getElementById('edit-content').value,
            created_at: new Date().toISOString()
          }).eq('id', article.id);
          document.getElementById('edit-form').style.display = 'none';
          fetchArticles();
        };
      };
      div.appendChild(edit);
    }

    container.appendChild(div);
  });
}
