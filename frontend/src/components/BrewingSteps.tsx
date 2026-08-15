const steps = [
  { n: "01", t: "Boil water", c: "Take 1 cup water per person and let it come to a boil." },
  { n: "02", t: "Add tea & spices", c: "One spoon Janta tea leaf, crushed ginger and elaichi." },
  { n: "03", t: "Pour milk", c: "Add half cup milk and sugar, boil for two more minutes." },
  { n: "04", t: "Strain & serve", c: "Strain hot into kulhads. Best with biscuits." },
];

export function BrewingSteps() {
    return (
          <section className="bg-chai px-6 py-24 text-cream">
          <div className="mx-auto max-w-7xl">
            <span className="label-eyebrow text-clay">How to make it</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Perfect kadak chai, 4 steps</h2>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n} className="border-t border-cream/20 pt-6">
                  <span className="font-display text-3xl text-clay">{s.n}</span>
                  <h3 className="mt-3 font-display text-xl">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{s.c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

    );
} 