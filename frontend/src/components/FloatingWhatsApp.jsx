import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT_INFO } from '../constants/siteData'

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi%2C%20I%27m%20interested%20in%20Janta%20Tea%20products`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}
