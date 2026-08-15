export function Contact() {
    return (
        <section id="contact" className="px-6 pb-28">
          <div className="mx-auto max-w-7xl rounded-3xl bg-cream-deep px-8 py-14 md:px-14">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <span className="label-eyebrow text-cardamom">Visit or call</span>
                <h2 className="mt-3 font-display text-4xl text-balance">
                  Order on phone, pick up from the shop.
                </h2>
                <p className="mt-5 max-w-[42ch] text-chai/70">
                  Shop open Monday to Saturday, 10 AM to 8 PM. Bulk orders delivered same day inside
                  Indore.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="tel:+919926699991"
                    className="rounded-full bg-chai px-8 py-4 text-xs font-semibold tracking-widest text-cream uppercase transition-colors hover:bg-terracotta"
                  >
                    +91 99266 99991
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=919926699991"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-chai/25 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-colors hover:border-chai"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <dl className="grid gap-8 sm:grid-cols-2">
                <div>
                  <dt className="label-eyebrow text-cardamom">Shop address</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-chai/70">
                    Siyaganj Market,
                    <br /> Indore, Madhya Pradesh
                  </dd>
                </div>
                <div>
                  <dt className="label-eyebrow text-cardamom">Landline</dt>
                  <dd className="mt-2 space-y-1 text-sm text-chai/70">
                    <a href="tel:07314040200" className="block hover:text-terracotta">
                      0731-4040200
                    </a>
                    <a href="tel:07312349032" className="block hover:text-terracotta">
                      0731-2349032
                    </a>
                    <a href="tel:07314973030" className="block hover:text-terracotta">
                      0731-4973030
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-eyebrow text-cardamom">Email</dt>
                  <dd className="mt-2 text-sm text-chai/70">
                    <a href="mailto:jantatea@yahoo.com" className="hover:text-terracotta">
                      jantatea@yahoo.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="label-eyebrow text-cardamom">Timings</dt>
                  <dd className="mt-2 text-sm text-chai/70">Mon – Sat, 10 AM – 8 PM</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
    );
}