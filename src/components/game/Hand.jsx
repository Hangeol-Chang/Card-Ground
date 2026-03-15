/**
 * @param {{
 *   cards: import('../../types/index').CardType[],
 *   selectedCardId: string | null,
 *   onSelect: (cardId: string) => void
 * }} props
 */
export default function Hand({ cards = [], selectedCardId, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`card ${selectedCardId === card.id ? 'card--selected' : ''}`}
          onClick={() => onSelect(card.id)}
        >
          <div style={{ fontWeight: 'bold' }}>{card.name}</div>
          <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
            파워: {card.power} / 영역: {card.territory}
          </div>
        </div>
      ))}
    </div>
  )
}
