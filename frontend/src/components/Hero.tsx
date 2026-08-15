import { createFileRoute, Link } from "@tanstack/react-router";

// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Marquee } from "@/components/Marquee";
// import { ProductCard } from "@/components/ProductCard";
import heroChai from "@/assets/hero-chai.jpg";
import heroVideo from "@/assets/hero-video.mp4";
// import estate from "@/assets/estate.jpg";
// import giftBox from "@/assets/gift-box.jpg";
// import wholesale from "@/assets/wholesale.jpg";
// import teaMasala from "@/assets/tea-masala.jpg";
// import teaAssam from "@/assets/tea-assam.jpg";
// import teaDarjeeling from "@/assets/tea-darjeeling.jpg";
// import catTeaLeaf from "@/assets/cat-tea-leaf.jpg";
// import catCardamom from "@/assets/cat-cardamom.jpg";
// import catCoffee from "@/assets/cat-coffee.jpg";
// import catTeaPowder from "@/assets/cat-tea-powder.jpg";
// import catGreenTea from "@/assets/cat-green-tea.jpg";
// import catCardamomTea from "@/assets/cat-cardamom-tea.jpg";


export function Hero() {
   return (
  //       {/* Hero */}
        <section className="relative min-h-[88vh] overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroChai}
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-chai/92 via-chai/75 to-chai/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />

          <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-24 text-cream">
            <div className="animate-fade-rise max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-2 text-[11px] font-semibold tracking-widest text-cream/90 uppercase backdrop-blur-sm">
                Janta Tea Company, Siyaganj, Indore · Since 1955
              </span>
              <h1 className="mt-6 font-display text-5xl leading-[0.95] text-balance md:text-7xl lg:text-8xl">
                Fresh tea for your{" "}
                <span className="italic text-clay">daily chai.</span>
              </h1>
              <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-cream/80">
                Tea leaf, tea powder, green tea, cardamom and coffee — packed fresh for your home,
                and in bulk for shops, hotels and offices across Indore.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="rounded-full bg-cream px-8 py-4 text-xs font-semibold tracking-widest text-chai uppercase transition-colors hover:bg-clay"
                >
                  See our teas
                </Link>
                <a
                  href="https://api.whatsapp.com/send?phone=919926699991"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-cream/40 px-8 py-4 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm transition-colors hover:bg-cream/10"
                >
                  Order on WhatsApp
                </a>
              </div>

              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-cream/20 pt-8">
                {[
                  ["50+", "Years in market"],
                  ["4.2★", "Justdial rating"],
                  ["300+", "Shops supplied"],
                ].map(([big, small]) => (
                  <div key={small}>
                    <dt className="font-display text-3xl text-cream">{big}</dt>
                    <dd className="mt-1 text-xs text-cream/60">{small}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="absolute right-6 bottom-10 hidden rounded-2xl bg-card/95 px-6 py-4 shadow-warm backdrop-blur-sm lg:block">
            <p className="label-eyebrow text-cardamom">Buy Your Favourite Tea</p>
            <p className="mt-1 font-display text-2xl text-chai">See Our Best Products</p>
          </div>
        </section>
  );
}
