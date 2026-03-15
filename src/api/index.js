import { supabase } from '../lib/supabase'

const API_URL = import.meta.env.VITE_API_URL

async function authHeaders() {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const matchApi = {
  /** 매칭 대기열 진입 */
  joinQueue: async () => {
    const res = await fetch(`${API_URL}/match/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
    })
    if (!res.ok) throw new Error('Failed to join queue')
    return res.json()
  },

  /** 매칭 대기열 취소 */
  leaveQueue: async () => {
    const res = await fetch(`${API_URL}/match/leave`, {
      method: 'POST',
      headers: await authHeaders(),
    })
    if (!res.ok) throw new Error('Failed to leave queue')
    return res.json()
  },
}

export const gameApi = {
  /** 카드 내기 */
  playCard: async (roomId, cardId, targetTiles) => {
    const res = await fetch(`${API_URL}/game/${roomId}/play`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: JSON.stringify({ card_id: cardId, target_tiles: targetTiles }),
    })
    if (!res.ok) throw new Error('Failed to play card')
    return res.json()
  },
}
