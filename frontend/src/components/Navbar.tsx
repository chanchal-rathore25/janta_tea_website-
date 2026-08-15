import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ShoppingBag, User } from "lucide-react";

import { useCart } from "@/lib/cart";
import { useAuthUi } from "@/lib/auth-ui";
import { useAuth } from "@/hooks/useAuth";
import { categoryDetails } from "@/data/products";

const links = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about", route: true },
  { label: "Shop", href: "/shop", route: true },
  { label: "Wholesale", href: "/wholesale" , route: true  },
  { label: "Popular teas", href: "/#products" , route: true },
  { label: "Contact", href: "/#contact" , route: true  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const { setOpen: setAuthOpen } = useAuthUi();
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    setOpen(false);
    navigate({ to: "/", replace: true });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const iconBtn =
    "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-chai transition-colors hover:border-terracotta hover:text-terracotta";

  return (
    <header id="top" className="sticky top-0 z-50">
      <div className="bg-chai text-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-2 text-[11px] tracking-wide">
          <p className="text-cream/70">Siyaganj Market, Indore · Mon–Sat, 10 AM – 8 PM</p>
          <a href="tel:+919926699991" className="font-medium hover:text-clay">
            Call +91 99266 99991
          </a>
        </div>
      </div>

      <nav
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-cream/90 shadow-warm backdrop-blur-md"
            : "border-transparent bg-cream"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-chai">
            Janta <span className="italic text-terracotta">Tea Co.</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const cls =
                "relative text-sm font-medium text-chai/75 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-terracotta after:transition-all after:duration-300 hover:text-terracotta hover:after:w-full";
              return (
                <li key={link.label}>
                  {link.route ? (
                    <Link to={link.href} className={cls}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={cls}>
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
            <li className="group relative">
              <span className={`cursor-default text-sm font-medium text-chai/75`}>Categories ▾</span>
              <ul className="invisible absolute top-full left-0 z-50 w-56 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-warm transition-all group-hover:visible group-hover:opacity-100">
                {categoryDetails.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      className="block rounded-xl px-4 py-2 text-sm text-chai/75 hover:bg-cream hover:text-terracotta"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="group relative">
                <button
                  aria-label="Account menu"
                  className={`${iconBtn} border-terracotta text-terracotta`}
                >
                  <User className="h-4 w-4" />
                </button>
                <div className="invisible absolute top-full right-0 z-50 w-56 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-warm transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <p className="truncate px-4 py-2 text-xs text-chai/55">
                    {profile?.full_name || user.email}
                  </p>
                  <Link
                    to="/profile"
                    className="block rounded-xl px-4 py-2 text-sm text-chai/75 hover:bg-cream hover:text-terracotta"
                  >
                    My profile
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block rounded-xl px-4 py-2 text-sm text-chai/75 hover:bg-cream hover:text-terracotta"
                  >
                    My orders
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block rounded-xl px-4 py-2 text-sm text-chai/75 hover:bg-cream hover:text-terracotta"
                    >
                      Admin dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="block w-full rounded-xl px-4 py-2 text-left text-sm text-chai/75 hover:bg-cream hover:text-terracotta"
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                aria-label="Login or sign up"
                className={iconBtn}
              >
                <User className="h-4 w-4" />
              </button>
            )}
            <button onClick={() => setCartOpen(true)} aria-label="Open cart" className={iconBtn}>
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-cream">
                  {count}
                </span>
              )}
            </button>
            <a
              href="https://api.whatsapp.com/send?phone=919926699991"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-chai px-6 py-3 text-[11px] font-semibold tracking-widest text-cream uppercase transition-colors hover:bg-terracotta sm:inline-flex"
            >
              Order now
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-chai lg:hidden"
            >
              <span className="text-lg leading-none">{open ? "\u00d7" : "\u2261"}</span>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <ul className="border-b border-border bg-cream px-6 py-4 lg:hidden">
          {links.map((link) =>
            link.route ? (
              <li key={link.label}>
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-chai/80"
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-chai/80"
                >
                  {link.label}
                </a>
              </li>
            ),
          )}
          <li className="mt-3 border-t border-border pt-3 text-[11px] tracking-widest text-chai/45 uppercase">
            Categories
          </li>
          {categoryDetails.map((c) => (
            <li key={c.slug}>
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-chai/70"
              >
                {c.name}
              </Link>
            </li>
          ))}
          {user ? (
            <>
              <li className="mt-3 border-t border-border pt-3 text-[11px] tracking-widest text-chai/45 uppercase">
                Account
              </li>
              <li>
                <Link to="/profile" onClick={() => setOpen(false)} className="block py-2 text-sm text-chai/70">
                  My profile
                </Link>
              </li>
              <li>
                <Link to="/my-orders" onClick={() => setOpen(false)} className="block py-2 text-sm text-chai/70">
                  My orders
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/admin" onClick={() => setOpen(false)} className="block py-2 text-sm text-chai/70">
                    Admin dashboard
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleSignOut}
                  className="mt-3 w-full rounded-full border border-chai py-3 text-[11px] font-semibold tracking-widest uppercase"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  setAuthOpen(true);
                }}
                className="mt-3 w-full rounded-full border border-chai py-3 text-[11px] font-semibold tracking-widest uppercase"
              >
                Login / Sign up
              </button>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
