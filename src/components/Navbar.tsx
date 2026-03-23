import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e1f3e]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/exceed-logo.png" 
              alt="Exceed Abacus Program Logo" 
              className="h-12 w-auto"
            />
            <span className="font-heading text-2xl font-black text-white">
              ABACUS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-white/80 hover:text-white transition-colors font-medium">
              About
            </a>
            <a href="#program" className="text-white/80 hover:text-white transition-colors font-medium">
              Program
            </a>
            <a href="#benefits" className="text-white/80 hover:text-white transition-colors font-medium">
              Benefits
            </a>
            <a 
              href="https://buy.stripe.com/8x2eV6cWw9se7K11ObdfG03"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ca3433] hover:bg-[#a02828] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Enroll Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <a 
                href="#about" 
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#program" 
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Program
              </a>
              <a 
                href="#benefits" 
                className="text-white/80 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </a>
              <a 
                href="https://buy.stripe.com/8x2eV6cWw9se7K11ObdfG03"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ca3433] hover:bg-[#a02828] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 text-center"
              >
                Enroll Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
