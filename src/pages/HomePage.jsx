import { supabase } from '../lib/supabase'

export default function HomePage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  return (
    <div className="home-page">
      <h1>🃏 CardGround</h1>
      <p>중립 지역에서 시작해 자신의 영역을 확장하는 실시간 1vs1 전략 카드 게임</p>
      <button onClick={handleLogin}>Google로 시작하기</button>
    </div>
  )
}
