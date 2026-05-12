export function Marquee({ items = [], speed = 42 }) {
  
  // duplicate so the loop is seamless
  const loop = [...items, ...items];
  return (
    <div className="ldg-marquee fixed left-0 right-0 z-40" role="marquee" aria-label="Latest news">
      <div
        className="ldg-marquee__track"
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((text, i) => (
          <span className="ldg-marquee__item" key={i}>★ {text}</span>
        ))}
      </div>
    </div>
  );
}