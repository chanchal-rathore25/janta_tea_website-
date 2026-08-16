import { createFileRoute } from '@tanstack/react-router'
import  Home  from "@/routes/home";
const title = "Janta Tea Company — Fresh Tea Shop & Wholesale Dealer, Indore";
const description =
  "Buy fresh Assam, Darjeeling, masala, green and cardamom tea from Janta Tea Company, Siyaganj, Indore. Retail packs and wholesale rates since 1974. Call +91 99266 99991.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Janta Tea Company",
          description,
          telephone: "+91-99266-99991",
          email: "jantatea@yahoo.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Siyaganj Market",
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
          openingHours: "Mo-Sa 10:00-20:00",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.2", reviewCount: "180" },
        }),
      },
    ],
  }),
  component: Home,
});

// const categories = [
//   { name: "Tea Leaf", slug: "tea-leaf", image: catTeaLeaf, tag: "12 blends" },
//   { name: "Tea Powder", slug: "tea-powder", image: catTeaPowder, tag: "CTC dust" },
//   { name: "Green Tea", slug: "green-tea", image: catGreenTea, tag: "Light brew" },
//   { name: "Cardamom Tea", slug: "cardamom-tea", image: catCardamomTea, tag: "Elaichi" },
//   { name: "Cardamom Flavour", slug: "cardamom-flavour", image: catCardamom, tag: "Pure spice" },
//   { name: "Coffee", slug: "coffee", image: catCoffee, tag: "Fresh roast" },
// ];

// const products = [
//   {
//     name: "Masala Chai Special",
//     notes: "Strong tea with ginger, cardamom and clove — Indore's favourite cup.",
//     price: "₹499 / kg",
//     mrp: "₹580",
//     image: teaMasala,
//     badge: "Best seller",
//     rating: 5,
//     reviews: 128,
//   },
//   {
//     name: "Assam CTC Gold",
//     notes: "Dark, kadak chai with thick milk colour. Perfect for tapri-style tea.",
//     price: "₹350 / kg",
//     mrp: "₹420",
//     image: teaAssam,
//     badge: "Value pack",
//     rating: 4,
//     reviews: 96,
//   },
//   {
//     name: "Darjeeling First Flush",
//     notes: "Light and mild, floral finish. Best without milk in the evening.",
//     price: "₹850 / kg",
//     image: teaDarjeeling,
//     badge: "Premium",
//     rating: 5,
//     reviews: 54,
//   },
// ];

// const trust = [
//   { title: "Fresh every week", copy: "New stock direct from gardens." },
//   { title: "Free city delivery", copy: "Inside Indore, on orders ₹500+." },
//   { title: "Wholesale rates", copy: "Special pricing for bulk buyers." },
//   { title: "50 years of trust", copy: "Same shop, same family, since 1974." },
// ];

// const steps = [
//   { n: "01", t: "Boil water", c: "Take 1 cup water per person and let it come to a boil." },
//   { n: "02", t: "Add tea & spices", c: "One spoon Janta tea leaf, crushed ginger and elaichi." },
//   { n: "03", t: "Pour milk", c: "Add half cup milk and sugar, boil for two more minutes." },
//   { n: "04", t: "Strain & serve", c: "Strain hot into kulhads. Best with biscuits." },
// ];

// const reviews = [
//   {
//     quote: "Bees saal se yahi chai leti hoon. Colour aur taste dono ekdum same rehta hai.",
//     name: "Sunita Agrawal",
//     role: "Home customer, Rajwada",
//   },
//   {
//     quote: "Hamare hotel ke liye har mahine 40 kg. Rate bhi theek aur delivery time pe.",
//     name: "Imran Shaikh",
//     role: "Hotel owner, Vijay Nagar",
//   },
//   {
//     quote: "Tapri par customer bolte hain chai strong hai. Assam CTC best hai inka.",
//     name: "Ramesh Patel",
//     role: "Chai stall, Palasia",
//   },
// ];

// function Home() {
//   return (
//     <div className="min-h-screen bg-cream text-chai">
//       <Navbar />

//       <main>
//         {/* Hero */}
//         <section className="relative overflow-hidden px-6 pt-12 pb-16 lg:pt-20">
//           <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
//             <div className="animate-fade-rise lg:col-span-6">
//               <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-semibold tracking-widest text-cardamom uppercase">
//                 Siyaganj, Indore · Since 1974
//               </span>
//               <h1 className="mt-6 font-display text-5xl leading-[0.95] text-balance md:text-7xl">
//                 Fresh tea for your{" "}
//                 <span className="italic text-terracotta">daily chai.</span>
//               </h1>
//               <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-chai/70">
//                 Tea leaf, tea powder, green tea, cardamom and coffee — packed fresh for your home,
//                 and in bulk for shops, hotels and offices across Indore.
//               </p>
//               <div className="mt-10 flex flex-wrap gap-4">
//                 <Link
//                   to="/shop"
//                   className="rounded-full bg-chai px-8 py-4 text-xs font-semibold tracking-widest text-cream uppercase transition-colors hover:bg-terracotta"
//                 >
//                   See our teas
//                 </Link>
//                 <a
//                   href="https://api.whatsapp.com/send?phone=919926699991"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="rounded-full border border-border px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-colors hover:border-chai"
//                 >
//                   Order on WhatsApp
//                 </a>
//               </div>

//               <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
//                 {[
//                   ["50+", "Years in market"],
//                   ["4.2★", "Justdial rating"],
//                   ["300+", "Shops supplied"],
//                 ].map(([big, small]) => (
//                   <div key={small}>
//                     <dt className="font-display text-3xl text-chai">{big}</dt>
//                     <dd className="mt-1 text-xs text-chai/55">{small}</dd>
//                   </div>
//                 ))}
//               </dl>
//             </div>

//             <div className="relative lg:col-span-6">
//               <img
//                 src={heroChai}
//                 alt="Hot masala chai in a kulhad made with Janta Tea Company tea leaves"
//                 width={1408}
//                 height={1600}
//                 className="w-full rounded-3xl object-cover shadow-warm"
//               />
//               <div className="absolute -bottom-6 left-6 hidden rounded-2xl bg-card px-6 py-4 shadow-warm sm:block">
//                 <p className="label-eyebrow text-cardamom">Today's rate</p>
//                 <p className="mt-1 font-display text-2xl">Assam CTC ₹350 / kg</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <Marquee />

//         {/* Categories */}
//         <section id="categories" className="px-6 py-20">
//           <div className="mx-auto max-w-7xl">
//             <div className="flex flex-wrap items-end justify-between gap-6">
//               <div>
//                 <span className="label-eyebrow text-cardamom">What we sell</span>
//                 <h2 className="mt-3 font-display text-4xl md:text-5xl">Shop by category</h2>
//               </div>
//               <p className="max-w-[36ch] text-sm text-chai/60">
//                 Everything is weighed and packed in front of you at the shop.
//               </p>
//             </div>

//             <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
//               {categories.map((cat) => (
//                 <Link
//                   key={cat.name}
//                   to="/category/$slug"
//                   params={{ slug: cat.slug }}
//                   className="group text-center"
//                 >
//                   <div className="overflow-hidden rounded-full bg-cream-deep ring-1 ring-border transition-all duration-500 group-hover:ring-terracotta">
//                     <img
//                       src={cat.image}
//                       alt={cat.name}
//                       loading="lazy"
//                       width={600}
//                       height={600}
//                       className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     />
//                   </div>
//                   <h3 className="mt-4 font-display text-base">{cat.name}</h3>
//                   <p className="text-[11px] text-chai/50">{cat.tag}</p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Products */}
//         <section id="products" className="bg-cream-deep px-6 py-24">
//           <div className="mx-auto max-w-7xl">
//             <div className="flex flex-wrap items-end justify-between gap-6">
//               <div>
//                 <span className="label-eyebrow text-cardamom">Most sold</span>
//                 <h2 className="mt-3 font-display text-4xl md:text-5xl">Popular teas</h2>
//               </div>
//               <div className="text-sm text-chai/60">
//                 <p>Rates per kilo. Bulk rate on call.</p>
//                 <Link
//                   to="/shop"
//                   className="mt-2 inline-block font-semibold text-terracotta hover:underline"
//                 >
//                   View all products →
//                 </Link>
//               </div>
//             </div>

//             <div className="mt-14 grid gap-8 md:grid-cols-3">
//               {products.map((item) => (
//                 <ProductCard key={item.name} {...item} />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Trust bar */}
//         <section className="px-6 py-16">
//           <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
//             {trust.map((item) => (
//               <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
//                 <h3 className="font-display text-lg">{item.title}</h3>
//                 <p className="mt-2 text-sm leading-relaxed text-chai/60">{item.copy}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Gift + wholesale split banners */}
//         <section className="px-6 pb-8">
//           <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
//             <article className="group relative overflow-hidden rounded-3xl">
//               <img
//                 src={giftBox}
//                 alt="Janta Tea Company festive tea gift box"
//                 loading="lazy"
//                 width={1200}
//                 height={912}
//                 className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-chai/85 to-transparent p-8 text-cream">
//                 <span className="label-eyebrow text-clay">Gifting</span>
//                 <h3 className="mt-2 font-display text-3xl">Tea gift boxes</h3>
//                 <p className="mt-2 max-w-[32ch] text-sm text-cream/80">
//                   Diwali, shaadi ya office gifting — hum aapke naam ke saath pack kar denge.
//                 </p>
//               </div>
//             </article>

//             <article className="group relative overflow-hidden rounded-3xl">
//               <img
//                 src={wholesale}
//                 alt="Bulk jute sacks of tea for wholesale buyers"
//                 loading="lazy"
//                 width={1200}
//                 height={912}
//                 className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-chai/85 to-transparent p-8 text-cream">
//                 <span className="label-eyebrow text-clay">Bulk buying</span>
//                 <h3 className="mt-2 font-display text-3xl">Wholesale supply</h3>
//                 <p className="mt-2 max-w-[32ch] text-sm text-cream/80">
//                   Hotels, canteens aur chai stalls ke liye 10 kg se 500 kg tak, same-day delivery.
//                 </p>
//               </div>
//             </article>
//           </div>
//         </section>

//         {/* About */}
//         <section id="about" className="px-6 py-24">
//           <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
//             <img
//               src={estate}
//               alt="Tea garden where Janta Tea Company sources its leaves"
//               loading="lazy"
//               width={1600}
//               height={900}
//               className="w-full rounded-3xl object-cover"
//             />
//             <div>
//               <span className="label-eyebrow text-cardamom">Our story</span>
//               <h2 className="mt-3 font-display text-4xl text-balance md:text-5xl">
//                 From Assam gardens to your kitchen shelf.
//               </h2>
//               <p className="mt-6 text-lg leading-relaxed text-chai/70">
//                 Janta Tea Company started in 1974 as a small shop in Siyaganj market. We buy tea
//                 straight from Assam, Nilgiri and Darjeeling gardens, blend it ourselves and sell it
//                 fresh — to homes, chai stalls, hotels and offices across the city.
//               </p>
//               <p className="mt-4 text-lg leading-relaxed text-chai/70">
//                 Bataiye chai kitni strong chahiye — hum wahi blend pack kar denge.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Brewing steps */}
//         <section className="bg-chai px-6 py-24 text-cream">
//           <div className="mx-auto max-w-7xl">
//             <span className="label-eyebrow text-clay">How to make it</span>
//             <h2 className="mt-3 font-display text-4xl md:text-5xl">Perfect kadak chai, 4 steps</h2>
//             <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
//               {steps.map((s) => (
//                 <div key={s.n} className="border-t border-cream/20 pt-6">
//                   <span className="font-display text-3xl text-clay">{s.n}</span>
//                   <h3 className="mt-3 font-display text-xl">{s.t}</h3>
//                   <p className="mt-2 text-sm leading-relaxed text-cream/65">{s.c}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Reviews */}
//         <section className="px-6 py-24">
//           <div className="mx-auto max-w-7xl">
//             <span className="label-eyebrow text-cardamom">Customer feedback</span>
//             <h2 className="mt-3 font-display text-4xl md:text-5xl">What Indore says</h2>
//             <div className="mt-12 grid gap-6 md:grid-cols-3">
//               {reviews.map((r) => (
//                 <figure key={r.name} className="rounded-2xl border border-border bg-card p-8">
//                   <span className="text-terracotta">★★★★★</span>
//                   <blockquote className="mt-4 font-display text-lg leading-snug text-balance">
//                     “{r.quote}”
//                   </blockquote>
//                   <figcaption className="mt-6 text-sm text-chai/60">
//                     <span className="font-medium text-chai">{r.name}</span> · {r.role}
//                   </figcaption>
//                 </figure>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Contact */}
//         <section id="contact" className="px-6 pb-28">
//           <div className="mx-auto max-w-7xl rounded-3xl bg-cream-deep px-8 py-14 md:px-14">
//             <div className="grid gap-12 md:grid-cols-2">
//               <div>
//                 <span className="label-eyebrow text-cardamom">Visit or call</span>
//                 <h2 className="mt-3 font-display text-4xl text-balance">
//                   Order on phone, pick up from the shop.
//                 </h2>
//                 <p className="mt-5 max-w-[42ch] text-chai/70">
//                   Shop open Monday to Saturday, 10 AM to 8 PM. Bulk orders delivered same day inside
//                   Indore.
//                 </p>
//                 <div className="mt-8 flex flex-wrap gap-4">
//                   <a
//                     href="tel:+919926699991"
//                     className="rounded-full bg-chai px-8 py-4 text-xs font-semibold tracking-widest text-cream uppercase transition-colors hover:bg-terracotta"
//                   >
//                     +91 99266 99991
//                   </a>
//                   <a
//                     href="https://api.whatsapp.com/send?phone=919926699991"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="rounded-full border border-chai/25 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-colors hover:border-chai"
//                   >
//                     WhatsApp
//                   </a>
//                 </div>
//               </div>

//               <dl className="grid gap-8 sm:grid-cols-2">
//                 <div>
//                   <dt className="label-eyebrow text-cardamom">Shop address</dt>
//                   <dd className="mt-2 text-sm leading-relaxed text-chai/70">
//                     Siyaganj Market,
//                     <br /> Indore, Madhya Pradesh
//                   </dd>
//                 </div>
//                 <div>
//                   <dt className="label-eyebrow text-cardamom">Landline</dt>
//                   <dd className="mt-2 space-y-1 text-sm text-chai/70">
//                     <a href="tel:07314040200" className="block hover:text-terracotta">
//                       0731-4040200
//                     </a>
//                     <a href="tel:07312349032" className="block hover:text-terracotta">
//                       0731-2349032
//                     </a>
//                     <a href="tel:07314973030" className="block hover:text-terracotta">
//                       0731-4973030
//                     </a>
//                   </dd>
//                 </div>
//                 <div>
//                   <dt className="label-eyebrow text-cardamom">Email</dt>
//                   <dd className="mt-2 text-sm text-chai/70">
//                     <a href="mailto:jantatea@yahoo.com" className="hover:text-terracotta">
//                       jantatea@yahoo.com
//                     </a>
//                   </dd>
//                 </div>
//                 <div>
//                   <dt className="label-eyebrow text-cardamom">Timings</dt>
//                   <dd className="mt-2 text-sm text-chai/70">Mon – Sat, 10 AM – 8 PM</dd>
//                 </div>
//               </dl>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />

//       {/* Sticky mobile action bar */}
//       <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
//         <a
//           href="tel:+919926699991"
//           className="flex-1 py-4 text-center text-xs font-semibold tracking-widest uppercase"
//         >
//           Call now
//         </a>
//         <a
//           href="https://api.whatsapp.com/send?phone=919926699991"
//           target="_blank"
//           rel="noreferrer"
//           className="flex-1 bg-chai py-4 text-center text-xs font-semibold tracking-widest text-cream uppercase"
//         >
//           WhatsApp
//         </a>
//       </div>
//     </div>
//   );
// }
