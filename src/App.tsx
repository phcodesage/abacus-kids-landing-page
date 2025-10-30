import { Calculator, Clock, Calendar } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1f3e] via-[#0e1f3e] to-[#1a2f4f]"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-32">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <Calculator className="w-16 h-16 text-[#ca3433]" strokeWidth={1.5} />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              ABACUS
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#f7e0e0] max-w-4xl mx-auto leading-relaxed font-light mb-6">
              Watch your child's brain light up as they master numbers using
              the ancient power of the abacus!
            </p>
          </div>

          {/* Hero Image Section */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img 
                src="/images/hero-image.jpg" 
                alt="Children learning with abacus" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="bg-white/10 backdrop-blur-sm p-16 text-center"><p class="text-white/60 text-lg">Add your hero image to /public/images/hero-image.jpg</p></div>';
                }}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10 shadow-2xl">
              <p className="text-lg sm:text-xl text-[#f7e0e0] leading-relaxed mb-8">
                Through hands-on practice and visual techniques, kids develop
                lightning-fast calculation skills, boost concentration, and
                strengthen memory—all while having fun. Our abacus program
                turns math into a mental workout, building confidence and
                cognitive agility that goes far beyond the classroom.
              </p>

              <div className="bg-[#ca3433] rounded-xl p-8 sm:p-10 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Our Exclusive Program
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center text-white">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-2xl font-bold">$</span>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">$350/month</p>
                      <p className="text-white/90 text-sm">Investment in your child's future</p>
                    </div>
                  </div>

                  <div className="flex items-center text-white">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">2 hours a week</p>
                      <p className="text-white/90 text-sm">Focused learning sessions</p>
                    </div>
                  </div>

                  <div className="flex items-start text-white">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold mb-3">Class Schedule</p>
                      <div className="space-y-2 text-white/95">
                        <p className="bg-white/10 rounded-lg px-4 py-3 font-medium">
                          Sundays: 9:00 AM - 11:00 AM
                        </p>
                        <p className="bg-white/10 rounded-lg px-4 py-3 font-medium">
                          Tuesdays: 4:00 PM - 6:00 PM
                        </p>
                        <p className="bg-white/10 rounded-lg px-4 py-3 font-medium">
                          Fridays: 4:00 PM - 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-8 bg-[#0e1f3e] hover:bg-[#1a2f4f] text-white font-bold text-xl py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Enroll Your Child Today
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-[#f7e0e0] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ca3433] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-[#0e1f3e] mb-2">Lightning-Fast Skills</h3>
                <p className="text-[#0e1f3e]/80">Master mental math calculations with incredible speed</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ca3433] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-[#0e1f3e] mb-2">Enhanced Memory</h3>
                <p className="text-[#0e1f3e]/80">Strengthen cognitive abilities and concentration</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ca3433] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-[#0e1f3e] mb-2">Build Confidence</h3>
                <p className="text-[#0e1f3e]/80">Excel in academics with proven problem-solving abilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
