/**
 * @typedef {'neutral' | 'player1' | 'player2'} TileOwner
 *
 * @typedef {{ x: number, y: number, owner: TileOwner }} Tile
 *
 * @typedef {{ id: string, name: string, power: number, territory: number }} CardType
 *
 * @typedef {{ id: string, name: string, avatarUrl?: string }} Player
 *
 * @typedef {'waiting' | 'playing' | 'finished'} GameStatus
 *
 * @typedef {{
 *   roomId: string,
 *   board: Tile[][],
 *   players: [Player, Player],
 *   turn: 'player1' | 'player2',
 *   handCards: CardType[],
 *   status: GameStatus,
 *   winner?: 'player1' | 'player2'
 * }} GameState
 */

export {}
