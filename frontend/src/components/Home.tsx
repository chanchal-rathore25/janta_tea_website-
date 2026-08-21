import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Hero } from "@/components/Hero";
import { Category } from "@/components/Category";
import { Products } from "@/components/Products";
import { TrustBar } from "@/components/TrustBar";
import { AboutPreview } from "@/components/AboutPreview";
import { WholeSalePreview } from "@/components/WholeSalePreview";
import { BrewingSteps } from "@/components/BrewingSteps";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { MobileSticky } from "@/components/MobileSticky";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-cream text-chai">

      <main>
        <Hero />  {/* Hero */}
        <Marquee />  {/* Marquee */}
        <AboutPreview/>
        <Category />  {/* Category */}
        <Products />  {/* Products */}
      <TrustBar /> { /*Trust bar */}
         {/* <WholeSale /> Gift + wholesale split banners */}
         <WholeSalePreview />
        <BrewingSteps />  {/* Brewing steps */}
        <Reviews />   {/* Reviews */}
        <Contact />  {/* Contact */}
      </main>
      <MobileSticky />   {/* Sticky mobile action bar */}
      <Footer />
    </div>
    </>
  );
}
