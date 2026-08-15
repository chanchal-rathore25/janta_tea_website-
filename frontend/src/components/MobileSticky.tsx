export function MobileSticky(){
    return (
         <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
        <a
          href="tel:+919926699991"
          className="flex-1 py-4 text-center text-xs font-semibold tracking-widest uppercase"
        >
          Call now
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=919926699991"
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-chai py-4 text-center text-xs font-semibold tracking-widest text-cream uppercase"
        >
          WhatsApp
        </a>
      </div>
    );
}