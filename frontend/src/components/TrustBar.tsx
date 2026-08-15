
const trust = [
  { title: "Fresh every week", copy: "New stock direct from gardens." },
  { title: "Free city delivery", copy: "Inside Indore, on orders ₹500+." },
  { title: "Wholesale rates", copy: "Special pricing for bulk buyers." },
  { title: "50 years of trust", copy: "Same shop, same family, since 1974." },
];

export function TrustBar() {
    return (
         <section className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-chai/60">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>
    );
}