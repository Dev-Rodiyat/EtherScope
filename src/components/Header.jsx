import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Lookup', path: '/lookup' },
  { name: 'History', path: '/history' }
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f1f] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-[#00FFA3]">
          EtherScope
        </Link>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium transition ${location.pathname === link.path
                  ? "text-[#00FFA3] border-b-2 border-[#00FFA3]"
                  : "text-slate-300 hover:text-white"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu size={24} />
        </button>
      </div>

      <MobileMenu open={open} setOpen={setOpen} navLinks={navLinks}/>
    </header>
  );
}
