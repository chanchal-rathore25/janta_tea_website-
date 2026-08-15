const reviews = [
  { name: "Anjali Sharma", role: "Regular customer", quote: "Best tea in Indore — strong, fresh and always packed with care." },
  { name: "Rajveer Singh", role: "Hotel owner", quote: "Reliable bulk delivery and the flavor stays consistent every time." },
  { name: "Pooja Patel", role: "Daily chai drinker", quote: "Perfect kadak chai for morning meetings. The shop staff are very helpful." },
];

export function Reviews() {
    return (
         <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <span className="label-eyebrow text-cardamom">Customer feedback</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">What Indore says</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {reviews.map((r) => (
                <figure key={r.name} className="rounded-2xl border border-border bg-card p-8">
                  <span className="text-terracotta">★★★★★</span>
                  <blockquote className="mt-4 font-display text-lg leading-snug text-balance">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-chai/60">
                    <span className="font-medium text-chai">{r.name}</span> · {r.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
    );
}