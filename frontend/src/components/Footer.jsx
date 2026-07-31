import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi'
import { NAV_LINKS, PRODUCTS, CONTACT_INFO } from '../constants/siteData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-tea-dark text-tea-cream">
      <div className="section-container py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company */}
        <div>
          <h3 className="font-heading text-2xl font-bold mb-4">Janta Tea</h3>
          <p className="text-tea-cream/70 text-sm leading-relaxed mb-5">
            Crafting premium, natural tea with tradition for over 25 years — from garden to cup.
          </p>
          <div className="flex gap-3">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-tea-cream/10 hover:bg-tea-gold hover:text-tea-dark transition-colors duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-tea-cream/70 text-sm hover:text-tea-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Products</h4>
          <ul className="space-y-2.5">
            {PRODUCTS.slice(0, 6).map((p) => (
              <li key={p.id}>
                <Link to={`/products#${p.id}`} className="text-tea-cream/70 text-sm hover:text-tea-gold transition-colors">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-tea-cream/70">
            <li className="flex items-start gap-2.5">
              <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-tea-gold" />
              <span>{CONTACT_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <HiOutlinePhone className="shrink-0 text-tea-gold" />
              <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-tea-gold transition-colors">
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <HiOutlineMail className="shrink-0 text-tea-gold" />
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-tea-gold transition-colors">
                {CONTACT_INFO.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-tea-cream/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-tea-cream/50">
          <p>© {year} Janta Tea. All rights reserved.</p>
          <p>Crafted with tradition, since 1999.</p>
        </div>
      </div>
    </footer>
  )
}
