import { Menu, X, MapPin, Mail, Facebook, Linkedin, Instagram, Youtube, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="hidden lg:flex justify-between items-center px-6 py-2 border-b border-gray-100 text-sm font-medium text-gray-600 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <a href="https://www.google.com/maps/search/?api=1&query=1360+Willis+Ave,+Albertson,+NY+11507" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#ca3433] transition-colors">
            <MapPin className="w-4 h-4 text-[#ca3433]" />
            1360 Willis Ave, Albertson, NY 11507
          </a>
          <a href="mailto:Abacus@exceedlearningcenterny.com" className="flex items-center gap-2 hover:text-[#ca3433] transition-colors">
            <Mail className="w-4 h-4 text-[#ca3433]" />
            Email us Directly [+]
          </a>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-400">Follow us on Social Media</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#ca3433] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#ca3433] transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#ca3433] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#ca3433] transition-colors"><Youtube className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#ca3433] transition-colors font-bold text-lg">G</a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/exceed-logo.png" 
              alt="Exceed Learning Center Logo" 
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#about" className="text-gray-800 hover:text-[#ca3433] transition-colors font-bold uppercase text-sm tracking-wider">
              About
            </a>
            <a href="#program" className="text-gray-800 hover:text-[#ca3433] transition-colors font-bold uppercase text-sm tracking-wider">
              Courses
            </a>
            <a href="#videos" className="text-gray-800 hover:text-[#ca3433] transition-colors font-bold uppercase text-sm tracking-wider">
              Videos
            </a>
            <a href="#footer" className="text-gray-800 hover:text-[#ca3433] transition-colors font-bold uppercase text-sm tracking-wider">
              Contact
            </a>
          </div>

          {/* Right Section: Call & Book */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="https://buy.stripe.com/8x2eV6cWw9se7K11ObdfG03" target="_blank" rel="noopener noreferrer" className="text-[#ca3433] font-bold text-sm uppercase tracking-wider hover:underline">
              BOOK CONSULTATION
            </a>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-8">
              <div className="bg-[#ca3433]/10 p-2 rounded-full">
                <Phone className="w-5 h-5 text-[#ca3433]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">CALL OUR OFFICE:</p>
                <p className="text-xl font-black text-gray-900 leading-none">+1 (516) 226-3114</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-800 p-2 border border-gray-200 rounded-lg"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#ca3433]" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-4">
              <a href="#about" className="text-gray-800 hover:text-[#ca3433] transition-colors font-bold uppercase text-sm py-2" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#program" className="text-gray-800 hover:text-[#ca3433] transition-colors font-bold uppercase text-sm py-2" onClick={() => setIsMenuOpen(false)}>Courses</a>
              <a href="#videos" className="text-gray-800 hover:text-[#ca3433] transition-colors font-bold uppercase text-sm py-2" onClick={() => setIsMenuOpen(false)}>Videos</a>
              <a href="#footer" className="text-gray-800 hover:text-[#ca3433] transition-colors font-bold uppercase text-sm py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <a href="https://buy.stripe.com/8x2eV6cWw9se7K11ObdfG03" target="_blank" rel="noopener noreferrer" className="bg-[#ca3433] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 text-center" onClick={() => setIsMenuOpen(false)}>Book Consultation</a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
