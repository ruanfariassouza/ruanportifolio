export default function Marquee({ items }) {
  const repeated = [...items, ...items]
  return (
    <div className="marquee" aria-label={items.filter((item) => item !== '·').join(', ')}>
      <div className="marquee__track">
        {repeated.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </div>
  )
}
