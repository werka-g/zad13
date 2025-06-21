import { supabase } from './supabase.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Błąd logowania');
  } else {
    window.location.href = '/';
  }
});
