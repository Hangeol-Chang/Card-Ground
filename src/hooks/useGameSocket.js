import { useEffect, useRef, useCallback } from 'react'
import { socketClient } from '../lib/socket'
import { supabase } from '../lib/supabase'

/**
 * 게임 방의 WebSocket 연결을 관리하는 훅
 * @param {string} roomId
 * @param {Function} onMessage - WSMessage 핸들러
 */
export function useGameSocket(roomId, onMessage) {
  const handlerRef = useRef(onMessage)
  handlerRef.current = onMessage

  useEffect(() => {
    if (!roomId) return

    const handler = (msg) => handlerRef.current(msg)

    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token
      if (!token) return
      socketClient.connect(roomId, token)
      socketClient.addHandler(handler)
    })

    return () => {
      socketClient.removeHandler(handler)
      socketClient.disconnect()
    }
  }, [roomId])

  const sendMessage = useCallback((message) => {
    socketClient.send(message)
  }, [])

  return { sendMessage }
}
