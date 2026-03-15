import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { matchApi } from '../api'

export default function LobbyPage() {
  const navigate = useNavigate()
  const [waiting, setWaiting] = useState(false)

  const handleJoin = async () => {
    setWaiting(true)
    try {
      const data = await matchApi.joinQueue()
      if (data.room_id) {
        navigate(`/game/${data.room_id}`)
      }
    } catch (err) {
      console.error(err)
      setWaiting(false)
    }
  }

  return (
    <div className="lobby-page">
      <h2>로비</h2>
      {waiting ? (
        <p>상대방을 기다리는 중...</p>
      ) : (
        <button onClick={handleJoin}>매칭 시작</button>
      )}
    </div>
  )
}
