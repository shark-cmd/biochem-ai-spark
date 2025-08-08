import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/ask", label: "Ask (AI)" },
  { to: "/book", label: "Book a Slot" },
  { to: "/about", label: "About" },
  { to: "/register", label: "Register" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur border-b border-border">
      <nav className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-8 w-8 rounded-md bg-gradient-hero" aria-hidden />
          <span className="font-playfair text-lg">BioCoach with Saif</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? "font-semibold" : undefined}>
              <Button variant="nav" size="sm" asChild>
                <span className="px-3 py-1.5 rounded-md">{item.label}</span>
              </Button>
            </NavLink>
          ))}
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
          </div>
        </div>
      )}
    </header>
  );
}
