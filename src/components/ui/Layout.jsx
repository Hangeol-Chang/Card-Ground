import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

export default function Layout({ children }) {
  const { session } = useAuth()

  return (
    <div className="layout">
      <header className="header">
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>🃏 CardGround</span>
        {session && (
          <button onClick={() => supabase.auth.signOut()}>로그아웃</button>
        )}
      </header>
      <main className="main">{children}</main>
    </div>
  )
}
