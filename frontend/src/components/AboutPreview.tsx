import aboutShop from "@/assets/about-shop.jpg";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="bg-cream px-5 py-16 text-chai sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-14">

        {/* Content */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-eyebrow text-cardamom">
              Our Story
            </span>

            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cardamom sm:px-4 sm:py-2 sm:text-[11px]">
              Since 1955
            </span>
          </div>

          <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-balance sm:text-4xl md:text-5xl">
            Siyaganj ki gali se shuru hui baat.
          </h2>

          <p className="mt-5 text-base leading-7 text-chai/70 sm:mt-6 sm:text-lg sm:leading-relaxed">
            Tea and happiness goes hand in hand to serve you the best of
            everything. At Janta Tea Company, we strive to bring you the best
            flavours and quality from different parts of the country.
          </p>

          <p className="mt-4 text-base leading-7 text-chai/70 sm:text-lg sm:leading-relaxed">
            Years of experience, carefully selected tea leaves and a commitment
            to quality define the way we serve our customers.
          </p>

          {/* CTA */}
          <a
            href="/about"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-chai px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:bg-terracotta"
          >
            Discover Our Story
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Image */}
        <div className="overflow-hidden rounded-3xl">
          <img
            src={aboutShop}
            alt="Janta Tea Company tea shop"
            loading="lazy"
            width={1200}
            height={900}
            className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>

      </div>
    </section>
  );
}