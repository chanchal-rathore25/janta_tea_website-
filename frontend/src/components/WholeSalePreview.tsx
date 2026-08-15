import { ArrowRight } from "lucide-react";
import giftBox from "@/assets/gift-box.jpg";
import wholesale from "@/assets/wholesale.jpg";

export function WholeSalePreview() {
  return (
    <section className="px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cardamom">
              Business & Gifting
            </span>

            <h2 className="mt-3 font-display text-4xl text-chai md:text-5xl">
              Tea for every occasion
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-chai/60">
            From festive gifting to regular bulk supply, we provide tea
            solutions for homes, hotels, offices and businesses.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Gifting */}
          <article className="group relative min-h-[360px] overflow-hidden rounded-3xl">
            <img
              src={giftBox}
              alt="Tea gift boxes"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="relative flex min-h-[360px] flex-col justify-end p-7 text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A441]">
                Gifting
              </span>

              <h3 className="mt-2 font-display text-3xl">
                Tea Gift Boxes
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/75">
                Thoughtful tea gifting for festivals, weddings, offices and
                special occasions.
              </p>

              <a
                href="/wholeSale"
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#D9A441]"
              >
                Explore gifting
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </article>

          {/* Wholesale */}
          <article className="group relative min-h-[360px] overflow-hidden rounded-3xl">
            <img
              src={wholesale}
              alt="Wholesale tea supply"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="relative flex min-h-[360px] flex-col justify-end p-7 text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A441]">
                Wholesale
              </span>

              <h3 className="mt-2 font-display text-3xl">
                Bulk Tea Supply
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/75">
                Reliable tea supply for hotels, canteens, offices, chai stalls
                and other businesses.
              </p>

              <a
                href="/wholeSale"
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#D9A441]"
              >
                Wholesale enquiries
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}