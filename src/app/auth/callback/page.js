'use client'
import { useEffect } from 'react'
import { supabase } from '../../../../util/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    let redirected = false
    const goHome = () => {
      if (redirected) return
      redirected = true
      router.replace('/')
    }
    const goLogin = () => {
      if (redirected) return
      redirected = true
      router.replace('/supabase-auth')
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        goHome()
      }
    })

    const handleAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          console.error('Auth callback error:', error.message)
          goLogin()
          return
        }
        if (data.session) {
          goHome()
          return
        }
      }

      const { data, error } = await supabase.auth.getSession()
      if (error || !data.session) {
        console.error('Session error:', error?.message ?? 'No session found')
        goLogin()
        return
      }

      goHome()
    }

    handleAuthCallback()

    return () => authListener.subscription.unsubscribe()
  }, [router])

  return <p className="min-h-screen flex items-center justify-center">正在登录...</p>
}
