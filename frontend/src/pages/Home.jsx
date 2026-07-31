import { Helmet } from 'react-helmet-async'
import Hero from '../components/home/Hero'
import AboutPreview from '../components/home/AboutPreview'
import WhyChooseUs from '../components/home/WhyChooseUs'
import ProductsPreview from '../components/home/ProductsPreview'
import ProcessTimeline from '../components/home/ProcessTimeline'
import GalleryPreview from '../components/home/GalleryPreview'
import Testimonials from '../components/home/Testimonials'
import StatsSection from '../components/home/StatsSection'
import ContactCTA from '../components/home/ContactCTA'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Janta Tea | Premium Tea Crafted With Tradition</title>
        <meta
          name="description"
          content="Janta Tea — 25+ years of crafting natural, premium tea. Green Tea, Black Tea, Masala Tea, Organic & Herbal Tea, delivered fresh across India."
        />
      </Helmet>

      <Hero />
      <AboutPreview />
      <WhyChooseUs />
      <ProductsPreview />
      <ProcessTimeline />
      <StatsSection />
      <GalleryPreview />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
