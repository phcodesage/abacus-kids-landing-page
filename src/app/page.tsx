"use client";
import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import {
  Calculator,
  Clock,
  Calendar,
  Sparkles,
  Brain,
  Target,
  ArrowRight,
  PhoneCall,
  MapPin,
  Mail,
  ChevronUp,
} from "lucide-react";
import Navbar from "../components/Navbar";

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const centerHoursData = [
    { day: "Monday", time: "9 AM–7 PM" },
    { day: "Tuesday", time: "9 AM–7 PM" },
    { day: "Wednesday", time: "9 AM–7 PM" },
    { day: "Thursday", time: "9 AM–7 PM" },
    { day: "Friday", time: "9 AM–5 PM" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "9 AM–3 PM" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1f3e] via-[#0e1f3e] to-[#1a2f4f]"></div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ca3433]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ca3433]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-32 mt-20">
          {/* Hero Content */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#ca3433]/20 rounded-full blur-2xl"></div>
                <Calculator
                  className="w-20 h-20 text-[#ca3433] relative z-10"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter">
              ABACUS
            </h1>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-[#ca3433]" />
              <p className="text-lg sm:text-xl text-[#ca3433] font-semibold uppercase tracking-widest">
                Master Mental Math
              </p>
              <Sparkles className="w-5 h-5 text-[#ca3433]" />
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Watch your child's brain light up as they master numbers using the
              ancient power of the abacus!
            </p>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-12">
              Lightning-fast calculations • Enhanced memory • Unshakeable
              confidence
            </p>
          </div>

          {/* Hero Image Section */}
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-4xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ca3433] to-[#ff6b6b] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-1">
                <img
                  src="/images/hero-image.jpg"
                  alt="Children learning with abacus"
                  className="w-full h-auto object-cover rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-24 text-center rounded-2xl"><p class="text-white/60 text-lg">Add your hero image to /public/images/hero-image.jpg</p></div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details Section */}
      <div
        id="about"
        className="relative py-20 sm:py-28 bg-gradient-to-b from-white/5 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0e1f3e] mb-6">
                Unlock Your Child's Potential
              </h2>
              <p className="text-lg text-[#0e1f3e]/80 leading-relaxed mb-6">
                Through hands-on practice and visual techniques, kids develop
                lightning-fast calculation skills, boost concentration, and
                strengthen memory—all while having fun.
              </p>
              <p className="text-lg text-[#0e1f3e]/80 leading-relaxed">
                Our abacus program turns math into a mental workout, building
                confidence and cognitive agility that goes far beyond the
                classroom.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#ca3433]/10 to-[#ca3433]/5 rounded-2xl p-8 border border-[#ca3433]/20 hover:border-[#ca3433]/40 transition-all duration-300">
                <Brain className="w-12 h-12 text-[#ca3433] mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-2">
                  Enhanced Memory
                </h3>
                <p className="text-sm text-[#0e1f3e]/70">
                  Strengthen cognitive abilities and concentration
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#ca3433]/10 to-[#ca3433]/5 rounded-2xl p-8 border border-[#ca3433]/20 hover:border-[#ca3433]/40 transition-all duration-300">
                <Sparkles className="w-12 h-12 text-[#ca3433] mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-2">
                  Lightning-Fast Skills
                </h3>
                <p className="text-sm text-[#0e1f3e]/70">
                  Master mental math with incredible speed
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#ca3433]/10 to-[#ca3433]/5 rounded-2xl p-8 border border-[#ca3433]/20 hover:border-[#ca3433]/40 transition-all duration-300">
                <Target className="w-12 h-12 text-[#ca3433] mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-2">
                  Build Confidence
                </h3>
                <p className="text-sm text-[#0e1f3e]/70">
                  Excel in academics with proven abilities
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#ca3433]/10 to-[#ca3433]/5 rounded-2xl p-8 border border-[#ca3433]/20 hover:border-[#ca3433]/40 transition-all duration-300">
                <Calculator className="w-12 h-12 text-[#ca3433] mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-2">
                  Problem Solving
                </h3>
                <p className="text-sm text-[#0e1f3e]/70">
                  Develop critical thinking skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details Card */}
      <div id="program" className="relative py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#ca3433] to-[#a02828] rounded-3xl p-12 sm:p-16 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-12">
                Our Exclusive Program
              </h2>

              <div className="space-y-8 mb-12">
                {/* Price */}
                <div className="flex flex-col items-center gap-6 pb-8 border-b border-white/20">
                  <div className="flex items-start gap-6 w-full">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-black">$</span>
                    </div>
                    <div>
                      <p className="font-heading text-4xl font-black text-white mb-1">
                        $350/month
                      </p>
                      <p className="text-white/90 text-lg">
                        Investment in your child's future
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex justify-center p-4">
                    <a
                      href="https://buy.stripe.com/8x2eV6cWw9se7K11ObdfG03"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading inline-flex items-center justify-center gap-3 bg-[#ca3433] hover:bg-[#a02828] text-white font-black text-lg py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg group w-full sm:w-auto sm:min-w-[200px]"
                    >
                      ENROLL NOW
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-start gap-6 pb-8 border-b border-white/20">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-black text-white mb-1">
                      2 hours per week
                    </p>
                    <p className="text-white/90 text-lg">
                      Focused learning sessions
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div
        id="benefits"
        className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-[#f7e0e0]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0e1f3e] mb-4">
              Why Choose Our Abacus Program?
            </h2>
            <p className="text-xl text-[#0e1f3e]/70 max-w-2xl mx-auto">
              Proven methods that develop mental math mastery and cognitive
              excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src="/images/hero-image.jpg" alt="Abacus Mental Math" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 right-6 translate-y-1/2 bg-[#ca3433] p-4 rounded-lg shadow-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col">
                <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-4">
                  Abacus Mental Math
                </h3>
                <p className="text-[#0e1f3e]/70 leading-relaxed mb-6 flex-1">
                  Unleash the power of the mind with our Abacus Mental Math program. Designed to enhance cognitive skills and mathematical abilities, this engaging and proven method is suitable for students of all ages.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[#ca3433] font-bold hover:underline group/link">
                  <div className="bg-[#ca3433] rounded-full p-1 text-white group-hover/link:scale-110 transition-transform">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  Learn More
                </a>
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src="/images/hero-image.jpg" alt="After School Programs" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 right-6 translate-y-1/2 bg-[#ca3433] p-4 rounded-lg shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col">
                <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-4">
                  After School Programs K-5
                </h3>
                <p className="text-[#0e1f3e]/70 leading-relaxed mb-6 flex-1">
                  Our after-school programs provide a nurturing environment for elementary school students (K-5) to reinforce their academic foundation, explore creative pursuits, & develop essential life skills in a supportive community setting.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[#ca3433] font-bold hover:underline group/link">
                  <div className="bg-[#ca3433] rounded-full p-1 text-white group-hover/link:scale-110 transition-transform">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  Learn More
                </a>
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src="/images/hero-image.jpg" alt="Adult Workshops" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 right-6 translate-y-1/2 bg-[#ca3433] p-4 rounded-lg shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col">
                <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-4">
                  Adult Workshops
                </h3>
                <p className="text-[#0e1f3e]/70 leading-relaxed mb-6 flex-1">
                  Learning is a lifelong journey, and our adult workshops cater to individuals seeking to expand their knowledge base. Whether you're looking to acquire new skills, our workshops offer a diverse array of learning opportunities.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[#ca3433] font-bold hover:underline group/link">
                  <div className="bg-[#ca3433] rounded-full p-1 text-white group-hover/link:scale-110 transition-transform">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 sm:py-28 bg-gradient-to-br from-[#0e1f3e] via-[#0e1f3e] to-[#1a2f4f] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ca3433]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ca3433]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-6">
            Ready to Transform Your Child's Future?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join our exclusive abacus program and watch your child develop
            extraordinary mental math skills and unshakeable confidence.
          </p>
          <a
            href="https://buy.stripe.com/8x2eV6cWw9se7K11ObdfG03"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading inline-flex items-center gap-3 bg-[#ca3433] hover:bg-[#a02828] text-white font-black text-lg py-6 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg group"
          >
            Enroll Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Abacus Videos Section */}
      <div id="videos" className="py-20 sm:py-28 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0e1f3e] mb-4">
              Abacus Videos
            </h2>
            <p className="text-xl text-[#0e1f3e]/70 max-w-2xl mx-auto font-medium">
              See our students in action and learn about the benefits of abacus training.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              {[
                  { id: "G921Q3E4E9s", title: "Exceed Learning Center Video", start: 2 },
              ].map((video) => (
                <div key={video.id} className="relative group">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white border-8 border-white">
                    <iframe
                      className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.id}${video.start ? `?start=${video.start}` : ''}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <noscript>
                    <p className="mt-4 text-sm text-gray-500 text-center font-medium">
                      Your browser blocks third-party cookies. Please enable them to view this video.
                    </p>
                  </noscript>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="footer" className="bg-[#0e1f3e] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Number */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#ca3433] flex items-center justify-center border-4 border-white/10 shrink-0 shadow-lg">
                <PhoneCall className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white mb-1">PHONE NUMBER:</p>
                <a href="tel:+15162263114" className="text-lg font-bold hover:text-[#ca3433] transition-colors tracking-tight">+1 (516) 226-3114</a>
              </div>
            </div>

            {/* Our Location */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#ca3433] flex items-center justify-center border-4 border-white/10 shrink-0 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white mb-1">OUR LOCATION:</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=1360+Willis+Ave,+Albertson,+NY+11507" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg font-bold hover:text-[#ca3433] transition-colors tracking-tight"
                >
                  1360 Willis Ave., Albertson NY 11507
                </a>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#ca3433] flex items-center justify-center border-4 border-white/10 shrink-0 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white mb-1">EMAIL ADDRESS:</p>
                <a 
                  href="mailto:programs@exceedlearningcenterny.com?subject=Abacus Inquiry" 
                  className="text-lg font-bold hover:text-[#ca3433] transition-colors underline decoration-1 underline-offset-4 tracking-tight"
                >
                  programs@exceedlearningcenterny.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#ca3433] flex items-center justify-center border-4 border-white/10 shrink-0 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white mb-3">CENTER HOURS:</p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-1 text-sm text-white/80">
                  {centerHoursData.map((item, idx) => (
                    <li key={idx} className="flex justify-between gap-4">
                      <span>{item.day}</span>
                      <span className={item.time === "Closed" ? "text-white/40" : ""}>{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-center text-white/50 text-sm">
              <p>© 2024 Abacus Program. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#ca3433] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#a02828] ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default App;

