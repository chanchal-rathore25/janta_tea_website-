import { createFileRoute } from "@tanstack/react-router";
import giftBox from "@/assets/gift-box.jpg";
import wholesale from "@/assets/wholesale.jpg";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const title = "Wholesale Tea Supply — Janta Tea Company";

const description =
  "Wholesale tea supply for hotels, canteens, chai stalls, offices and businesses from Janta Tea Company.";

export const Route = createFileRoute("/wholeSale")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),

  component: WholeSale,
});

function WholeSale() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream text-chai">

        {/* Page Hero */}
        <section className="px-6 pb-16 pt-20">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cardamom">
              Business Solutions
            </span>

            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight md:text-7xl">
              Wholesale Tea &{" "}
              <span className="text-[#D9A441]">
                Corporate Gifting
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-chai/65">
              Quality tea solutions for businesses, hospitality, offices,
              chai stalls and special occasions.
            </p>
          </div>
        </section>

        {/* Gifting + Wholesale */}
        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">

            {/* Gifting */}
            <article className="group relative min-h-[500px] overflow-hidden rounded-3xl">
              <img
                src={giftBox}
                alt="Janta Tea Company tea gift boxes"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="relative flex min-h-[500px] flex-col justify-end p-8 text-white">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A441]">
                  Corporate & Festive
                </span>

                <h2 className="mt-3 font-display text-4xl">
                  Tea Gift Boxes
                </h2>

                <p className="mt-4 max-w-md leading-7 text-white/75">
                  Create thoughtful tea gifting experiences for festivals,
                  weddings, corporate events and special occasions.
                </p>

                <a
                  href="https://api.whatsapp.com/send?phone=919926699991"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit rounded-full bg-[#D9A441] px-6 py-3 text-sm font-semibold text-[#0F291C] transition hover:bg-[#E4B65A]"
                >
                  Enquire for Gifting
                </a>
              </div>
            </article>

            {/* Wholesale */}
            <article className="group relative min-h-[500px] overflow-hidden rounded-3xl">
              <img
                src={wholesale}
                alt="Wholesale tea supply"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="relative flex min-h-[500px] flex-col justify-end p-8 text-white">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A441]">
                  Wholesale Supply
                </span>

                <h2 className="mt-3 font-display text-4xl">
                  Bulk Tea Supply
                </h2>

                <p className="mt-4 max-w-md leading-7 text-white/75">
                  Tea supply solutions for hotels, restaurants, offices,
                  canteens, chai stalls and other businesses.
                </p>

                <a
                   href="https://api.whatsapp.com/send?phone=919926699991"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit rounded-full bg-[#D9A441] px-6 py-3 text-sm font-semibold text-[#0F291C] transition hover:bg-[#E4B65A]"
                >
                  Contact for Wholesale
                </a>
              </div>
            </article>

          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl rounded-3xl bg-[#0F291C] px-8 py-14 text-center text-white md:px-14">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A441]">
              Let's work together
            </span>

            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl md:text-5xl">
              Looking for a reliable tea supply partner?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/65">
              Get in touch with Janta Tea Company for wholesale requirements
              and business enquiries.
            </p>

            <a
              href="tel:+919926699991"
              className="mt-8 inline-flex rounded-full bg-[#D9A441] px-7 py-3.5 text-sm font-semibold text-[#0F291C] transition hover:bg-[#E4B65A]"
            >
              Call +91 99266 99991
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}