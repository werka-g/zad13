import { supabase } from '../lib/supabase'

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = e.target.email.value
  const password = e.target.password.value

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (!error) {
    window.location.href = '/'
  } else {
    alert(error.message)
  }
})
