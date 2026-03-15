import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/ui/Layout'
import HomePage from './pages/HomePage'
import LobbyPage from './pages/LobbyPage'
import GamePage from './pages/GamePage'
import { useAuth } from './hooks/useAuth'

function App() {
  const { session, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/lobby"
          element={session ? <LobbyPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/game/:roomId"
          element={session ? <GamePage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Layout>
  )
}

export default App
