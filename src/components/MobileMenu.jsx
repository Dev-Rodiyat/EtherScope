import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

export default function MobileMenu({ open, setOpen, navLinks }) {
  const location = useLocation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/70 flex items-start justify-end">
      <div className="w-[70%] h-full bg-[#0f0f1f] p-6 shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-[#00FFA3]">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium transition ${location.pathname === link.path
                  ? "text-[#00FFA3]"
                  : "text-white hover:text-[#00FFA3]"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
