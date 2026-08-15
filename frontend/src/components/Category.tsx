import { Link } from "@tanstack/react-router";
import { categories } from "@/data/category";

export function Category() {
  return (
    <section id="categories" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="label-eyebrow text-cardamom">
              What we sell
            </span>

            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Shop by category
            </h2>
          </div>

          <p className="max-w-[36ch] text-sm leading-6 text-chai/60">
            Everything is weighed and packed in front of you at the shop.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="group text-center"
            >
              <div className="relative overflow-hidden rounded-full bg-cream-deep ring-1 ring-border transition-all duration-500 group-hover:ring-terracotta group-hover:shadow-lg">

                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-chai/0 transition-colors duration-500 group-hover:bg-chai/10" />
              </div>

              <h3 className="mt-4 font-display text-base transition-colors duration-300 group-hover:text-terracotta">
                {cat.name}
              </h3>

              <p className="mt-1 text-[11px] text-chai/50">
                {cat.tag}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}