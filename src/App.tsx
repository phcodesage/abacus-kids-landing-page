import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Calculator, Clock, Calendar, Sparkles, Brain, Target, ArrowRight } from 'lucide-react';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
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

  const scheduleData = [
    {
      day: 'Sundays',
      time: '9:00 AM - 11:00 AM',
      sessions: 'Sessions: 1st, 8th, 15th, 22nd',
    },
    {
      day: 'Tuesdays',
      time: '4:00 PM - 6:00 PM',
      sessions: 'Sessions: 3rd, 10th, 17th, 24th',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1f3e] via-[#0e1f3e] to-[#1a2f4f]"></div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ca3433]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ca3433]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-32">
          {/* Hero Content */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#ca3433]/20 rounded-full blur-2xl"></div>
                <Calculator className="w-20 h-20 text-[#ca3433] relative z-10" strokeWidth={1.5} />
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
              Watch your child's brain light up as they master numbers using the ancient power of the abacus!
            </p>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-12">
              Lightning-fast calculations • Enhanced memory • Unshakeable confidence
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
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-24 text-center rounded-2xl"><p class="text-white/60 text-lg">Add your hero image to /public/images/hero-image.jpg</p></div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details Section */}
      <div className="relative py-20 sm:py-28 bg-gradient-to-b from-white/5 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0e1f3e] mb-6">
                Unlock Your Child's Potential
              </h2>
              <p className="text-lg text-[#0e1f3e]/80 leading-relaxed mb-6">
                Through hands-on practice and visual techniques, kids develop lightning-fast calculation skills, boost concentration, and strengthen memory—all while having fun.
              </p>
              <p className="text-lg text-[#0e1f3e]/80 leading-relaxed">
                Our abacus program turns math into a mental workout, building confidence and cognitive agility that goes far beyond the classroom.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#ca3433]/10 to-[#ca3433]/5 rounded-2xl p-8 border border-[#ca3433]/20 hover:border-[#ca3433]/40 transition-all duration-300">
                <Brain className="w-12 h-12 text-[#ca3433] mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-2">Enhanced Memory</h3>
                <p className="text-sm text-[#0e1f3e]/70">Strengthen cognitive abilities and concentration</p>
              </div>
              <div className="bg-gradient-to-br from-[#ca3433]/10 to-[#ca3433]/5 rounded-2xl p-8 border border-[#ca3433]/20 hover:border-[#ca3433]/40 transition-all duration-300">
                <Sparkles className="w-12 h-12 text-[#ca3433] mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-2">Lightning-Fast Skills</h3>
                <p className="text-sm text-[#0e1f3e]/70">Master mental math with incredible speed</p>
              </div>
              <div className="bg-gradient-to-br from-[#ca3433]/10 to-[#ca3433]/5 rounded-2xl p-8 border border-[#ca3433]/20 hover:border-[#ca3433]/40 transition-all duration-300">
                <Target className="w-12 h-12 text-[#ca3433] mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-2">Build Confidence</h3>
                <p className="text-sm text-[#0e1f3e]/70">Excel in academics with proven abilities</p>
              </div>
              <div className="bg-gradient-to-br from-[#ca3433]/10 to-[#ca3433]/5 rounded-2xl p-8 border border-[#ca3433]/20 hover:border-[#ca3433]/40 transition-all duration-300">
                <Calculator className="w-12 h-12 text-[#ca3433] mb-4" />
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-2">Problem Solving</h3>
                <p className="text-sm text-[#0e1f3e]/70">Develop critical thinking skills</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details Card */}
      <div className="relative py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#ca3433] to-[#a02828] rounded-3xl p-12 sm:p-16 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-12">
                Our Exclusive Program
              </h2>

              <div className="space-y-8 mb-12">
                {/* Price */}
                <div className="flex items-start gap-6 pb-8 border-b border-white/20">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-black">$</span>
                  </div>
                  <div>
                    <p className="font-heading text-4xl font-black text-white mb-1">$350/month</p>
                    <p className="text-white/90 text-lg">Investment in your child's future</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-start gap-6 pb-8 border-b border-white/20">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-black text-white mb-1">2 hours per week</p>
                    <p className="text-white/90 text-lg">Focused learning sessions</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="font-heading text-2xl font-black text-white mb-4">Class Schedule</p>
                    <div className="space-y-3">
                      {scheduleData.map((schedule, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                          <p className="font-bold text-white text-lg mb-1">{schedule.day}</p>
                          <p className="text-white/95 font-semibold">{schedule.time}</p>
                          <p className="text-white/80 text-sm mt-2">{schedule.sessions}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-[#f7e0e0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0e1f3e] mb-4">
              Why Choose Our Abacus Program?
            </h2>
            <p className="text-xl text-[#0e1f3e]/70 max-w-2xl mx-auto">
              Proven methods that develop mental math mastery and cognitive excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#ca3433]/10 hover:border-[#ca3433]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ca3433] to-[#a02828] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-3">Lightning-Fast Calculations</h3>
              <p className="text-[#0e1f3e]/70 leading-relaxed">Master mental math calculations with incredible speed and accuracy that amazes teachers and peers alike.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#ca3433]/10 hover:border-[#ca3433]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ca3433] to-[#a02828] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-3">Enhanced Memory & Focus</h3>
              <p className="text-[#0e1f3e]/70 leading-relaxed">Strengthen cognitive abilities, boost concentration, and develop photographic memory through proven abacus techniques.</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#ca3433]/10 hover:border-[#ca3433]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ca3433] to-[#a02828] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-3">Academic Excellence</h3>
              <p className="text-[#0e1f3e]/70 leading-relaxed">Build unshakeable confidence and problem-solving abilities that translate to success across all academic subjects.</p>
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
            Join our exclusive abacus program and watch your child develop extraordinary mental math skills and unshakeable confidence.
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

      {/* Footer */}
      <div className="bg-[#0e1f3e] text-white/70 py-8 text-center">
        <p>© 2024 Abacus Program. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
