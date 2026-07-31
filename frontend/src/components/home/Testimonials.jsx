import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FaQuoteLeft } from 'react-icons/fa'
import SectionTitle from '../SectionTitle'
import { TESTIMONIALS } from '../../constants/siteData'

import 'swiper/css'
import 'swiper/css/pagination'

export default function Testimonials() {
  return (
    <section className="bg-tea-leaf/10 py-20 sm:py-28">
      <div className="section-container">
        <SectionTitle eyebrow="Client Reviews" title="What Our Customers Say" />

        <div className="mt-14 max-w-3xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="pb-12"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="bg-white rounded-2xl p-8 sm:p-10 text-center shadow-sm">
                  <FaQuoteLeft className="mx-auto text-tea-gold text-2xl mb-5" />
                  <p className="text-tea-ink/80 text-base sm:text-lg leading-relaxed italic">"{t.quote}"</p>
                  <p className="mt-6 font-heading font-semibold text-tea-dark">{t.name}</p>
                  <p className="text-tea-ink/50 text-sm">{t.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
