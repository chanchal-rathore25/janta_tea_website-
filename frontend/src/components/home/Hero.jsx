import React from "react";
import { Leaf } from "lucide-react";
import video from "../../../public/images/videos/tea_video.mp4";
const COLORS={
  cream:"#FAF7F2",
  darkGreen:"#1B4332",
  darkGreenDeep:"#0F291C",
  gold:"#D9A441"
};

export default function Hero(){
  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4"/>
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(15,41,28,.75), rgba(15,41,28,.72))"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center w-full">

        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border border-white/20 bg-white/10 backdrop-blur">
            <Leaf size={16} color={COLORS.gold}/>
            <span className="uppercase tracking-[.2em] text-xs text-white">
              Since 1955 • Garden to Cup
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            Experience the Finest
            <span style={{color:COLORS.gold}}> Indian Tea </span>
            Heritage
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Every leaf is handpicked from premium tea gardens and crafted to
            deliver rich aroma, authentic taste and unforgettable freshness.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              className="px-8 py-4 rounded-xl font-semibold transition hover:scale-105"
              style={{background:COLORS.gold,color:COLORS.darkGreen}}
            >
              Explore Products
            </button>

            <button
              className="px-8 py-4 rounded-xl font-semibold border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              Contact Us
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-white">
            <span>🌿 100% Natural</span>
            <span>🏆 Premium Quality</span>
            <span>🚚 Fast Delivery</span>
          </div>
        </div>

        <div className="hidden lg:flex justify-center">
          <img
            src="/images/products/premiumtea.jpg"
            alt="Premium tea"
            className="w-[500px] drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-7 h-12 rounded-full border-2 border-white/60 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full" style={{background:COLORS.gold}}/>
        </div>
      </div>
    </section>
  );
}