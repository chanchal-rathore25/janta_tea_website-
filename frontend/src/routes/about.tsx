import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import aboutShop from "@/assets/about-shop.jpg";

const title = "About Janta Tea Company — Our Story";
const description =
  "Discover the story, experience and commitment to quality behind Janta Tea Company.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),

  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream text-chai">

        {/* Hero */}
        <section className="px-5 pb-16 pt-20 sm:px-8 sm:pt-24 lg:px-12 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <span className="label-eyebrow text-cardamom">
              About Janta Tea Company
            </span>

            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-6xl md:text-7xl">
              A tradition brewed into{" "}
              <span className="text-terracotta">
                every cup.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-chai/65 sm:text-lg sm:leading-8">
              From Siyaganj, Indore, Janta Tea Company brings carefully selected
              tea flavours and quality to homes and businesses.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">

            <div className="overflow-hidden rounded-3xl">
              <img
                src={aboutShop}
                alt="Janta Tea Company shop"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
              />
            </div>

            <div>
              <span className="label-eyebrow text-cardamom">
                Our Story
              </span>

              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                Siyaganj ki gali se shuru hui baat.
              </h2>

              <p className="mt-6 text-base leading-7 text-chai/70 sm:text-lg sm:leading-relaxed">
                Tea and happiness goes hand in hand to serve you the best of
                everything. We at Janta Tea Company therefore, serve to give you
                the best flavours possible.
              </p>

              <p className="mt-4 text-base leading-7 text-chai/70 sm:text-lg sm:leading-relaxed">
                Located in Siyaganj, Indore, Madhya Pradesh, we bring together
                tea flavours and quality from different parts of the country so
                customers can enjoy a memorable cup of tea.
              </p>

              <p className="mt-4 text-base leading-7 text-chai/70 sm:text-lg sm:leading-relaxed">
                Our focus remains simple — carefully selected products,
                consistent quality and a genuine relationship with our
                customers.
              </p>
            </div>

          </div>
        </section>

        {/* Values */}
        <section className="bg-cream-deep px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">

            <div className="max-w-2xl">
              <span className="label-eyebrow text-cardamom">
                What We Believe
              </span>

              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Quality is never just one step.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-display text-2xl">
                  Quality
                </h3>

                <p className="mt-3 text-sm leading-6 text-chai/65">
                  We focus on bringing quality tea products and flavours to our
                  customers.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-display text-2xl">
                  Experience
                </h3>

                <p className="mt-3 text-sm leading-6 text-chai/65">
                  Years of experience help us understand the preferences of tea
                  lovers and businesses.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-display text-2xl">
                  Trust
                </h3>

                <p className="mt-3 text-sm leading-6 text-chai/65">
                  We believe that a good business is built through consistency,
                  transparency and customer relationships.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl rounded-3xl bg-chai px-7 py-14 text-center text-cream sm:px-12">

            <span className="label-eyebrow text-clay">
              Explore Janta Tea
            </span>

            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl sm:text-5xl">
              Discover the teas behind our story.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-cream/65 sm:text-base">
              Explore our tea collection and find the flavour that suits your
              everyday cup.
            </p>

            <a
              href="/#products"
              className="mt-8 inline-flex rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-chai transition hover:bg-terracotta"
            >
              Explore Products
            </a>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}