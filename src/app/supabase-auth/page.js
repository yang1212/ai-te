'use client'
import { supabase } from '../../../util/supabaseClient'

export default function LoginPage() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) console.error('Login error:', error.message)
  }

  return (
    <div>
      <button onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  )
}
