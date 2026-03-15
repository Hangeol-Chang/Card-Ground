import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Supabase 세션을 관리하는 훅
 * @returns {{ session: import('@supabase/supabase-js').Session | null, loading: boolean }}
 */
export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { session, loading }
}
