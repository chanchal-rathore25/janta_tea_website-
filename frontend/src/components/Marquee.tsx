const items = [
  "Fresh stock every week",
  "Free delivery inside Indore",
  "Wholesale rates for shops & hotels",
  "Serving Indore since 1974",
  "Pure tea — no colour, no mixing",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-cream-deep py-3">
      <div className="marquee-track flex w-max gap-12 pr-12">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 gap-12" aria-hidden={dup === 1}>
            {items.map((item) => (
              <span
                key={item}
                className="label-eyebrow flex items-center gap-3 whitespace-nowrap text-chai/60"
              >
                <span className="text-terracotta">✦</span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
