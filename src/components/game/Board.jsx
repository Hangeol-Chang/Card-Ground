/**
 * @param {{ board: import('../../types/index').Tile[][], onTileClick: (tile: any) => void }} props
 */
export default function Board({ board = [], onTileClick }) {
  return (
    <div className="board">
      {board.flat().map((tile) => (
        <div
          key={`${tile.x}-${tile.y}`}
          className={`tile tile--${tile.owner}`}
          onClick={() => onTileClick?.(tile)}
          title={`(${tile.x}, ${tile.y}) - ${tile.owner}`}
        />
      ))}
    </div>
  )
}
