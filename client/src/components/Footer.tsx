import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-orange-500/20 mt-16">
      <div className="container py-8 safe-area-padding">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-xs font-mono">
              © 2026 KALI-GUIDE-HUB. EDUCATIONAL USE ONLY. UNAUTHORIZED ACCESS IS ILLEGAL.
            </p>
          </div>
          <div className="text-center md:text-right">
            <a 
              href="https://alexmirici.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors text-xs font-mono inline-block"
            >
              Developed By Alex Mirici
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}