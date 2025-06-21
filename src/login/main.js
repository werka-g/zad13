const { data: { user } } = await supabase.auth.getUser();
const isLoggedIn = !!user;

console.log('nested');

if (isLoggedIn) {
  document.getElementById('logout-btn').style.display = 'block';
}

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.reload();
});
