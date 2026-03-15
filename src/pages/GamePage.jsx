import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Board from '../components/game/Board'
import Hand from '../components/game/Hand'
import { useGameSocket } from '../hooks/useGameSocket'
import { useGameStore } from '../store/gameStore'
import { gameApi } from '../api'

export default function GamePage() {
  const { roomId } = useParams()
  const { gameState, setGameState, selectedCardId, selectCard, clearSelection } = useGameStore()

  const { sendMessage } = useGameSocket(roomId, (msg) => {
    if (msg.type === 'game_state') setGameState(msg.payload)
    if (msg.type === 'game_over')   setGameState((prev) => ({ ...prev, status: 'finished', winner: msg.payload.winner }))
  })

  const handleTileClick = async (tile) => {
    if (!selectedCardId || gameState?.status !== 'playing') return
    try {
      await gameApi.playCard(roomId, selectedCardId, [{ x: tile.x, y: tile.y }])
      clearSelection()
    } catch (err) {
      console.error(err)
    }
  }

  if (!gameState) return <div>게임 로딩 중...</div>

  if (gameState.status === 'finished') {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>{gameState.winner === 'player1' ? '🏆 당신이 이겼습니다!' : '😢 패배했습니다.'}</h2>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <p>턴: {gameState.turn}</p>
      <Board board={gameState.board} onTileClick={handleTileClick} />
      <h3>내 카드 ({gameState.handCards.length}장)</h3>
      <Hand
        cards={gameState.handCards}
        selectedCardId={selectedCardId}
        onSelect={selectCard}
      />
    </div>
  )
}
