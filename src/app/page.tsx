"use client";
import { useState, useEffect, useRef } from "react";
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
  Play,
} from "lucide-react";
import Navbar from "../components/Navbar";
import PaymentModal, { calcCardPrice } from "./PaymentModal";

const abacusVideos = [
  {
    id: "1FaTaqDeSI3tSU57lzoLuVgglcEpE-uoK",
    title: "POV: Learning Abacus",
    description: "Experience a first-person view of how students interact with the abacus to visualize math.",
    type: "drive",
  },
  {
    id: "G921Q3E4E9s",
    title: "Exceed Learning Center Video",
    description: "See our overall programs and interactive abacus classes at Exceed Learning Center.",
    type: "youtube",
  },
  {
    id: "1sfajIjAazBC--TlK_FVt5nWuOft0n7eR",
    title: "Abacus Practice Session 1",
    description: "Watch our students build concentration and speed through guided abacus arithmetic.",
    type: "drive",
  },
  {
    id: "1pInhdP9ncCMv5u0OCGrnQVOibdrFSsl8",
    title: "Abacus Practice Session 2",
    description: "Students work on intermediate mathematical problems with rhythm and accuracy.",
    type: "drive",
  },
  {
    id: "1L_tPofIAUJNVGDr40NBlWeu2mmVSOBKc",
    title: "Student Speed Calculation",
    description: "Witness lightning-fast mental calculations performed entirely from memory visualization.",
    type: "drive",
  },
  {
    id: "1aWKcIU17wRzivX31aJJG3sVFq1wbrCd8",
    title: "Mental Math Mastery 1",
    description: "Young learners demonstrating incredible computational skills without physical tools.",
    type: "drive",
  },
  {
    id: "1_6Y_PY-c3wfniGE3ew9RBRu8yw6W5u3F",
    title: "Mental Math Mastery 2",
    description: "Advanced math calculations executed mentally with flawless accuracy and focus.",
    type: "drive",
  },
  {
    id: "1aRsWgm6pgYUIeeyb-GATqthk1Ec38KnO",
    title: "Interactive Math Lesson",
    description: "An engaging classroom session showcasing interactive, group-based abacus training.",
    type: "drive",
  },
];

function App() {
  const [activeVideo, setActiveVideo] = useState(abacusVideos[0]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const STRIPE_LINK = "https://securelink-prod.valorpaytech.com:4430/?redirect=1&uid=6dec5ec8-5303-11f1-a8e1-12a0879a85b1";
  const CASH_PRICE = "$350";

  // Store Lenis instance so PaymentModal can stop/start it
  const lenisRef = useRef<{ stop: () => void; start: () => void; scrollTo: (target: number, options?: Record<string, unknown>) => void } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { immediate: false });
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

    // Expose stop/start to modal via ref
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
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
      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        courseName="Abacus Program"
        cashPrice={CASH_PRICE}
        cardPrice={calcCardPrice(CASH_PRICE)}
        stripeLink={STRIPE_LINK}
        lenisRef={lenisRef}
      />
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
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter">
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
              Watch your child&apos;s brain light up as they master numbers using the
              ancient power of the abacus!
            </p>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-8">
              Lightning-fast calculations • Enhanced memory • Unshakeable
              confidence
            </p>
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#ca3433] hover:bg-[#b02a29] text-white text-lg sm:text-xl font-extrabold uppercase tracking-widest px-10 py-4 rounded-full shadow-2xl transition-all hover:scale-105"
              >
                Enroll Now
              </button>
            </div>
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

      {/* Abacus Videos Section */}
      <div id="videos" className="py-20 sm:py-28 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#0e1f3e] mb-4">
              Abacus Video Gallery
            </h2>
            <p className="text-xl text-[#0e1f3e]/70 max-w-2xl mx-auto font-medium">
              See our students in action and witness the power of mental math training.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Player Component */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white">
                <iframe
                  className="w-full h-full"
                  src={
                    activeVideo.type === "youtube"
                      ? `https://www.youtube.com/embed/${activeVideo.id}?start=2`
                      : `https://drive.google.com/file/d/${activeVideo.id}/preview`
                  }
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
                <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-2">
                  {activeVideo.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>
            </div>

            {/* Playlist Component */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg flex flex-col h-full max-h-[400px] lg:max-h-[580px]">
                <h3 className="font-heading text-xl font-bold text-[#0e1f3e] mb-4 pb-2 border-b border-gray-100">
                  Watch More Videos
                </h3>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                  {abacusVideos.map((video) => {
                    const isActive = video.id === activeVideo.id;
                    const thumbnailSrc =
                      video.type === "youtube"
                        ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                        : `https://drive.google.com/thumbnail?id=${video.id}&sz=w600`;

                    return (
                      <button
                        key={video.id}
                        onClick={() => {
                          setActiveVideo(video);
                          // Scroll to main player on mobile when a video is clicked
                          if (window.innerWidth < 1024) {
                            document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className={`flex items-center gap-3 w-full p-2.5 rounded-xl border-2 text-left transition-all duration-300 group ${
                          isActive
                            ? "bg-[#ca3433]/5 border-[#ca3433] shadow-sm"
                            : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-100"
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                          <img
                            src={thumbnailSrc}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <Play
                              className={`w-5 h-5 text-white drop-shadow-md transition-transform ${
                                isActive ? "scale-110 text-[#ca3433]" : "group-hover:scale-110"
                              }`}
                              fill="currentColor"
                            />
                          </div>
                          <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] px-1 py-0.5 rounded font-bold uppercase tracking-wider">
                            {video.type === "youtube" ? "YT" : "Drive"}
                          </span>
                        </div>

                        {/* Text Details */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={`font-heading text-sm font-bold truncate mb-0.5 ${
                              isActive ? "text-[#ca3433]" : "text-[#0e1f3e]"
                            }`}
                          >
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-tight">
                            {video.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
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
                Unlock Your Child&apos;s Potential
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <div className="bg-gradient-to-br from-[#ca3433] to-[#a02828] rounded-3xl p-6 sm:p-16 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-white mb-12">
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
                        Investment in your child&apos;s future
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex justify-center p-4">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="font-heading inline-flex items-center justify-center gap-3 bg-white text-[#ca3433] font-black text-base sm:text-lg py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg group w-full sm:w-auto sm:min-w-[200px] hover:bg-white/90"
                    >
                      ENROLL NOW — CHOOSE PAYMENT
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
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
                <img src="/images/abacus-images/6L9A0724.jpeg" alt="Abacus Mental Math" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 right-6 translate-y-1/2 bg-[#ca3433] p-4 rounded-lg shadow-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col">
                <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-4">
                  Abacus Mental Math
                </h3>
                <p className="text-[#0e1f3e]/70 leading-relaxed flex-1">
                  Unleash the power of the mind with our Abacus Mental Math program. Designed to enhance cognitive skills and mathematical abilities, this engaging and proven method is suitable for students of all ages.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src="/images/abacus-images/6L9A0759.jpg" alt="After School Programs" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 right-6 translate-y-1/2 bg-[#ca3433] p-4 rounded-lg shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col">
                <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-4">
                  Perfect for ages 4 - 13
                </h3>
                <p className="text-[#0e1f3e]/70 leading-relaxed flex-1">
                  Our program is custom-tailored to support cognitive development across key developmental stages—providing foundational number concepts for younger children and advanced mental math strategies for older students.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src="/images/abacus-images/6L9A0761.jpg" alt="Boost Skills at Early Age" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 right-6 translate-y-1/2 bg-[#ca3433] p-4 rounded-lg shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-8 pt-12 flex-1 flex flex-col">
                <h3 className="font-heading text-2xl font-bold text-[#0e1f3e] mb-4">
                  Boost Skills at Early Age
                </h3>
                <p className="text-[#0e1f3e]/70 leading-relaxed flex-1">
                  The earlier kids start, the greater the advantage. Our program builds a strong mathematical foundation during the most critical years of brain development, setting children up for lifelong academic success.
                </p>
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
            Ready to Transform Your Child&apos;s Future?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join our exclusive abacus program and watch your child develop
            extraordinary mental math skills and unshakeable confidence.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="font-heading w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ca3433] hover:bg-[#a02828] text-white font-black text-base sm:text-lg py-4 px-6 sm:py-6 sm:px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg group"
          >
            Enroll Now — Choose Payment
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
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
                  href="mailto:kidsprograms@exceedlearningcenterny.com?subject=Abacus Inquiry"
                  className="text-lg font-bold hover:text-[#ca3433] transition-colors underline decoration-1 underline-offset-4 tracking-tight break-all"
                >
                  kidsprograms@exceedlearningcenterny.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#ca3433] flex items-center justify-center border-4 border-white/10 shrink-0 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-center w-full max-w-2xl">
                <p className="text-xs font-black uppercase tracking-widest text-white mb-3">CENTER HOURS:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-sm text-white/80">
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
