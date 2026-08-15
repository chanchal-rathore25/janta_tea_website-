import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, total, count } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="presentation" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-chai/40 backdrop-blur-sm" />
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-border bg-cream"
        aria-label="Cart"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-2xl">Your Card ({count})</h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="text-xl leading-none text-chai/50 hover:text-chai"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-chai/60">
              Your Card is Empty!
            </p>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.name} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-base leading-tight">{item.name}</h3>
                    <p className="text-xs text-chai/55">{item.price}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          aria-label="Kam kariye"
                          onClick={() => setQty(item.name, item.qty - 1)}
                          className="px-3 py-1 text-sm"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm">{item.qty}</span>
                        <button
                          aria-label="Zyada kariye"
                          onClick={() => setQty(item.name, item.qty + 1)}
                          className="px-3 py-1 text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.name)}
                        className="text-xs text-chai/50 hover:text-terracotta"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">₹{item.qty * item.priceValue}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-chai/60">Total</span>
            <span className="font-display text-2xl">₹{total}</span>
          </div>
          <Link
            to="/chectout"
            onClick={() => setOpen(false)}
            className={`mt-4 block rounded-full py-3 text-center text-[11px] font-semibold tracking-widest uppercase transition-colors ${
              items.length
                ? "bg-chai text-cream hover:bg-terracotta"
                : "pointer-events-none bg-chai/30 text-cream"
            }`}
          >
            Checkout 
          </Link>
        </div>
      </aside>
    </div>
  );
}
