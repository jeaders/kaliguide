import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((s) => !s)}
        className="p-2 rounded-lg bg-gray-800/40 hover:bg-gray-800/60"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Drawer */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
        <aside
          className={`absolute top-0 right-0 h-full w-64 bg-[#0A0A0F] border-l border-gray-800 shadow-lg transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-1 px-3 py-4">
            <Link href="/">
              <a onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-sm text-gray-200">Home</a>
            </Link>
            <Link href="/guides">
              <a onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-sm text-gray-200">Guides</a>
            </Link>
            <Link href="/tools">
              <a onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-sm text-gray-200">Tools</a>
            </Link>
            <Link href="/community">
              <a onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-sm text-gray-200">Community</a>
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  );
}
