import React, { useState, useEffect } from "react";
import { Leaf, User, Menu, X, ChevronDown } from "lucide-react";

const COLORS = {
  cream: "#FAF7F2",
  darkGreen: "#1B4332",
  darkGreenSoft: "#2D6A4F",
  whatsapp: "#25D366",
};

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const TEA_TYPES = [
  "CTC Tea",
  "Black Tea",
  "Green Tea",
  "Masala Tea",
  "Premium Tea",
  "Herbal Tea",
];

 function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.61 1.44 5.15L2 22l5.09-1.53c1.48.83 3.14 1.27 4.95 1.27h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.64-1.03-5.13-2.9-6.99A9.82 9.82 0 0012.04 2zm0 18.06c-1.6 0-3.16-.43-4.51-1.24l-.32-.19-3.3.99.98-3.2-.21-.33a8.13 8.13 0 01-1.24-4.29c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.09 8.09 0 012.39 5.77c0 4.5-3.67 8.16-8.17 8.16zm4.53-6.15c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // login/signup sidebar - built in the next piece
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const textColor = scrolled ? COLORS.darkGreen : "#FFFFFF";

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? COLORS.cream : "transparent",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
        transform: entered ? "translateY(0)" : "translateY(-100%)",
        opacity: entered ? 1 : 0,
        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease, background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          <a
            href="#home"
            className="flex items-center gap-2 shrink-0"
            style={{ color: textColor }}
          >
            <Leaf
              size={26}
              strokeWidth={2}
              style={{ color: scrolled ? COLORS.darkGreenSoft : "#FFFFFF" }}
            />
            <div className="leading-tight">
              <div
                className="text-lg sm:text-xl font-semibold tracking-wide transition-colors duration-300"
                style={{ color: textColor }}
              >
                Janta Tea
              </div>
              <div
                className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
                style={{ color: scrolled ? COLORS.darkGreenSoft : "rgba(255,255,255,0.8)" }}
              >
                Har Ghar Ki Chai
              </div>
            </div>
          </a>

          <div className="flex items-center gap-3 sm:gap-6 md:gap-10 overflow-x-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative whitespace-nowrap text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 group"
                style={{ color: textColor }}
              >
                {link.label}
                <span
                  className="absolute left-0 -bottom-1 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: scrolled ? COLORS.darkGreen : "#FFFFFF" }}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0 relative">
            <button
              onClick={() => setCollectionOpen((v) => !v)}
              aria-label="Tea collection menu"
              aria-expanded={collectionOpen}
              className="p-1"
            >
              {collectionOpen ? (
                <X size={22} style={{ color: textColor }} />
              ) : (
                <Menu size={22} style={{ color: textColor }} />
              )}
            </button>

            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Login or sign up"
              className="p-1"
            >
              <User size={22} style={{ color: textColor }} />
            </button>

            <a
              href="#products"
              className="hidden sm:inline-block px-6 py-2.5 rounded-full text-sm font-semibold transition-transform duration-200 hover:scale-105"
              style={{ backgroundColor: COLORS.darkGreen, color: COLORS.cream }}
            >
              Order Chai
            </a>

            {collectionOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setCollectionOpen(false)}
                />
                <div
                  className="absolute right-0 top-full mt-3 w-72 z-50 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: COLORS.cream,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.16)",
                    animation: "janta-dropdown 0.22s ease-out",
                  }}
                >
                  <div
                    className="flex items-center justify-between px-5 pt-4 pb-3"
                    style={{ borderBottom: `1px solid rgba(27,67,50,0.12)` }}
                  >
                    <span
                      className="text-sm font-semibold tracking-wide"
                      style={{ color: COLORS.darkGreen }}
                    >
                      Tea Collection
                    </span>
                    <ChevronDown size={16} style={{ color: COLORS.darkGreenSoft }} />
                  </div>

                  <div className="grid grid-cols-2 gap-1 px-3 py-3">
                    {TEA_TYPES.map((tea) => (
                      <a
                        key={tea}
                        href={`#${tea.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setCollectionOpen(false)}
                        className="px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                        style={{ color: COLORS.darkGreen }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(27,67,50,0.07)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        {tea}
                      </a>
                    ))}
                  </div>

                  <div className="px-3 pb-3 pt-1">
                    <a
                      href="#products"
                      onClick={() => setCollectionOpen(false)}
                      className="block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]"
                      style={{ backgroundColor: COLORS.darkGreen, color: COLORS.cream }}
                    >
                      Shop All Tea
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes janta-dropdown {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </nav>
  );
}
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/910000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center transition-transform duration-200 hover:scale-110"
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: COLORS.whatsapp,
        boxShadow: "0 8px 24px rgba(37,211,102,0.4)",
      }}
    >
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ backgroundColor: COLORS.whatsapp, opacity: 0.35 }}
      />
      <WhatsAppIcon style={{ width: "28px", height: "28px", color: "#FFFFFF", position: "relative" }} />
    </a>
  );
}

// export default function Preview() {
//   return (
//     <div style={{ minHeight: "500px", backgroundColor: "#1B4332" }}>
//       <Navbar />
//       <WhatsAppButton />
//     </div>
//   );
// }

export default  Navbar;