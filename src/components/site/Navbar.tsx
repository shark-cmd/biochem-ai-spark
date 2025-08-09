import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/site/ThemeToggle";
const navItems = [
  { to: "/", label: "Home" },
  { to: "/ask", label: "Ask (AI)" },
  { to: "/book", label: "Book a Slot" },
  { to: "/about", label: "About" },
  { to: "/register", label: "Register" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur border-b border-border ${scrolled ? 'bg-background/80 shadow-sm' : 'bg-background/60'}`}>
      <nav className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-8 w-8 rounded-md bg-gradient-hero" aria-hidden />
          <span className="brand-logo text-xl md:text-2xl">BioCoach with Saif</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <Button variant="nav" size="sm" className={isActive ? "bg-accent/50 text-foreground font-medium" : undefined}>
                  {item.label}
                </Button>
              )}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button variant="hero" size="sm" asChild>
            <Link to="/book">Book</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Button variant="glass" size="icon" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border">
          <div className="container py-2 grid gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                <Button variant="nav" className="w-full justify-start">{item.label}</Button>
              </NavLink>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <ThemeToggle />
              <Button asChild variant="hero" className="flex-1">
                <Link to="/book" onClick={() => setOpen(false)}>Book</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
