import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";

type Props = {
  name: string;
  slug?: string | undefined;
  notes: string;
  price: string;
  priceValue?: number | undefined;
  mrp?: string | undefined;
  image: string;
  badge?: string | undefined;
  rating?: number | undefined;
  reviews?: number | undefined;
};

function parsePrice(price: string) {
  const digits = price.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

function Stars({ rating = 4.5 }: { rating?: number }) {
  return (
    <span
      className="text-[11px] tracking-tight text-terracotta"
      aria-hidden="true"
    >
      {"★★★★★".slice(0, Math.round(rating))}
      <span className="text-chai/25">
        {"★★★★★".slice(Math.round(rating))}
      </span>
    </span>
  );
}

export function ProductCard({
  name,
  slug,
  notes,
  price,
  priceValue,
  mrp,
  image,
  badge,
  rating = 4.5,
  reviews = 42,
}: Props) {
  const { add, setOpen } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add({
      name,
      ...(slug ? { slug } : {}),
      price,
      priceValue: priceValue ?? parsePrice(price),
      image,
    });

    setAdded(true);

    toast.success(`${name} `, {
      action: {
        label: "added successfully",
        onClick: () => setOpen(true),
      },
    });

    window.setTimeout(() => setAdded(false), 1600);
  };

  const Img = () => (
    <img
      src={image}
      alt={`${name} — loose leaf tea from Janta Tea Company`}
      loading="lazy"
      width={400}
      height={500}
      className="h-full w-full object-contain p-5 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.04] sm:p-6"
    />
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-warm">

      {/* Product Image */}
     <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[#F7F3EA] sm:h-[320px]">

        {/* Badge */}
        {badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-chai px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-cream shadow-sm">
            {badge}
          </span>
        )}

        {/* Image / Product Link */}
        {slug ? (
          <Link
            to="/product/$slug"
            params={{ slug }}
            aria-label={name}
            className="block h-full w-full"
          >
            <Img />
          </Link>
        ) : (
          <Img />
        )}

      </div>

      {/* Product Information */}
     <div className="flex flex-1 flex-col p-4">

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Stars rating={rating} />

          <span className="text-[11px] text-chai/50">
            ({reviews})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="mt-2 font-display text-xl leading-snug">
          {slug ? (
            <Link
              to="/product/$slug"
              params={{ slug }}
              className="transition-colors hover:text-terracotta"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>

        {/* Description */}
        <p className="mt-1 text-xs leading-relaxed text-chai/60">
          {notes}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-base font-semibold text-chai">
            {price}
          </span>

          {mrp && (
            <span className="text-xs text-chai/40 line-through">
              {mrp}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2">

          {/* Add To Cart */}
          <button
            onClick={handleAdd}
            className="inline-flex items-center justify-center rounded-full bg-chai px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-terracotta"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>

          {/* WhatsApp */}
          <a
            href="https://api.whatsapp.com/send?phone=919926699991"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-chai px-5 py-3 text-[11px] font-semibold uppercase tracking-widest transition-all hover:bg-chai hover:text-cream"
          >
            Order on WhatsApp
          </a>

        </div>
      </div>
    </article>
  );
}