import { FiMessageCircle, FiPhone } from "react-icons/fi";

const ANNOUNCEMENTS = [
  "Siyaganj Market, Indore · Mon–Sat, 10 AM – 8 PM",
  "Fresh tea delivered every week",
  "Wholesale rates for bulk buyers",
  "Free city delivery on orders ₹500+",
];

export function TopBar() {
  const track = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <div className="bg-chai text-cream">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-2">
        {/* Scrolling announcements */}
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-topbar-marquee items-center gap-10 whitespace-nowrap text-[11px] tracking-wide">
            {track.map((item, i) => (
              <span key={i} className="flex items-center gap-10 text-cream/75">
                {item}
                <span className="h-1 w-1 rounded-full bg-cream/30" />
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-chai to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-chai to-transparent" />
        </div>

        {/* Fixed contact actions, never scroll */}
        <div className="flex shrink-0 items-center gap-4 border-l border-cream/15 pl-4">
          <a
            href="https://api.whatsapp.com/send?phone=919926699991"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 text-[11px] font-medium tracking-wide text-cream/80 transition-colors hover:text-clay sm:flex"
          >
            <FiMessageCircle size={13} />
            WhatsApp
          </a>
          <a
            href="tel:+919926699991"
            className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide hover:text-clay"
          >
            <FiPhone size={13} />
            +91 99266 99991
          </a>
        </div>
      </div>

      <style>{`
        @keyframes topbar-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-topbar-marquee {
          animation: topbar-marquee 22s linear infinite;
        }
        .animate-topbar-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
