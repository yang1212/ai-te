'use client'
import { useEffect } from 'react'
import { supabase } from '../../../../util/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Session error:', error.message)
      } else {
        console.log('User session:', data.session)
        router.push('/') // 登录成功后跳转到首页
      }
    }
    getSession()
  }, [router])

  return <p>Finishing login...</p>
}
