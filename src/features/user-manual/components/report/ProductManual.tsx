"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Battery, Wifi, Cpu, AlertTriangle, CheckCircle, Share2, Sparkles, BookOpen, Heart, MessageCircle, CloudLightning, Shield, Info, X, Star, HeartHandshake, HeartIcon, HeartOff, HeartPlus, HeartPulseIcon, HeartMinus, BoxSelect, LassoSelect, HandFist, InfoIcon, Anchor, Sprout, Home, Waves, TreeDeciduous, Umbrella, Smile, Hammer, Sun, Flame, Map, Telescope, Feather, Footprints, Scale, Gift, HandHeart, SwordIcon, Sword, BatteryChargingIcon, BatteryIcon, Compass, LucideCompass, CompassIcon, MapIcon, SmileIcon, PencilIcon } from "lucide-react";
import { PsychologicalSpec, UserManualReport, UserGuideItem } from "../../model/report";
import { Modal } from "@/shared/components/Modal";
interface ProductManualProps {
  report: UserManualReport;
  isOwner?: boolean; 
}

// Icon Mapping
const ARCHETYPE_ICONS: Record<string, any> = {
  honesty: Shield,
  communication: MessageCircle,
  respect: HandHeart,
  stability: Home,
  emotional_regulation: Waves,
  independence: TreeDeciduous,
  empathy: Umbrella,
  humor: Smile,
  diligence: Hammer,
  positivity: Sun,
  passion: Flame,
  planning: Map,
  intellectual_curiosity: Telescope,
  sensitivity: Feather,
  proactiveness: Footprints,
  self_control: Scale,
  acceptance: Waves,
  consideration: Gift,
  default: Sparkles,
};

// Gradient Color Mapping (Tailwind Classes)
const ARCHETYPE_GRADIENTS: Record<string, string> = {
  honesty: "from-emerald-500 to-teal-400",
  communication: "from-sky-400 to-blue-400",
  respect: "from-violet-500 to-purple-400",
  stability: "from-green-600 to-emerald-400",
  emotional_regulation: "from-teal-500 to-emerald-400",
  independence: "from-indigo-500 to-blue-400",
  empathy: "from-rose-400 to-pink-300",
  humor: "from-amber-400 to-orange-300",
  diligence: "from-slate-600 to-gray-400",
  positivity: "from-yellow-400 to-amber-300",
  passion: "from-red-500 to-rose-400",
  planning: "from-blue-600 to-indigo-400",
  intellectual_curiosity: "from-purple-600 to-violet-400",
  sensitivity: "from-pink-400 to-rose-300",
  proactiveness: "from-orange-500 to-amber-400",
  self_control: "from-slate-700 to-slate-500",
  acceptance: "from-teal-600 to-cyan-500",
  consideration: "from-pink-500 to-rose-400",
  default: "from-primary to-purple-400",
};

export function ProductManual({ report, isOwner = true }: ProductManualProps) {
  console.log("🎨 ProductManual Rendered. isOwner prop:", isOwner);
  const router = useRouter();
  const IdentityIcon = ARCHETYPE_ICONS[report.identity.archetypeId] || Sparkles;
  const gradientClass = ARCHETYPE_GRADIENTS[report.identity.archetypeId] || ARCHETYPE_GRADIENTS.default;

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // Modal State
  const [modalData, setModalData] = useState<{title: string, content: string} | null>(null);

  const openModal = (item: UserGuideItem) => {
    setModalData({ title: item.title, content: item.detailedExample });
  };
  
  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-background text-slate-800 scroll-smooth">
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-radial from-slate-200/50 to-transparent opacity-50"
        />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Modal Integration */}
      <Modal 
        isOpen={!!modalData} 
        onClose={closeModal} 
        title={modalData?.title || ""}
      >
        <p className="text-slate-500 text-xs text-center">상대에게 이렇게 말해보세요</p>
        <div className="space-y-4">
          <div className="p-4 bg-slate-100 rounded-xl border border-slate-100 text-slate-700 leading-relaxed font-medium">
             <span className="text-2xl mr-2">💬</span>
             {modalData?.content}
          </div>
        </div>
      </Modal>

      {/* 1. Intro Section */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="space-y-6 max-w-2xl"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/80 text-white text-[10px] font-medium tracking-widest uppercase mb-4">
            Analysis Complete
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            나 사용 설명서<br/>
            <span className="text-primary italic">for you</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            나조차 몰랐던 나를 이해하는 시간.<br/>
            당신만을 위한 하나뿐인 설명서가 도착했어요.
          </p>
          <div className="pt-10 animate-bounce text-slate-400">
            <span className="text-xs uppercase tracking-wider">스크롤해서 살펴볼까요?</span>
          </div>
        </motion.div>
      </section>

      {/* 2. Identity Section */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-white/50 backdrop-blur-sm">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="max-w-md w-full text-center space-y-8"
        >
           <div className={`w-24 h-24 mx-auto bg-linear-to-br ${gradientClass} rounded-3xl rotate-3 shadow-2xl flex items-center justify-center text-white`}>
             <IdentityIcon size={48} />
           </div>
           
           <div className="space-y-2">
             <h2 className="text-sm font-bold text-primary tracking-widest uppercase">당신의 추구미</h2>
             <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{report.identity.archetype}</h3>
             <p className="text-slate-500 text-lg">"{report.identity.catchphrase}"</p>
           </div>
           
           <p className="text-slate-600 leading-relaxed break-keep">
             {report.identity.description}
           </p>
        </motion.div>
      </section>

      {/* 3. Specs Summary (3 Keys) */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-3 text-center mb-4">
             <h2 className="text-3xl font-bold text-slate-900 mb-2">나를 보여주는 3가지 모습</h2>
             <p className="text-slate-500">나를 가장 잘 나타내는 특징들이에요</p>
          </div>
          
          {report.specs.map((spec, index) => (
            <SpecCard key={index} spec={spec} delay={index * 0.2} />
          ))}
        </div>
      </section>

      {/* 4. Deep Dive 1: Emotion Analysis */}
      {report.details && (
        <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-indigo-50/50">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.8 }}
             className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="md:col-span-2 text-center mb-2">
               <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2 mb-2">
                 <CloudLightning className="text-indigo-500" />
                 내 마음은 이렇게 회복해요
               </h2>
               <p className="text-slate-500">스트레스에 대한 당신의 반응과 받고 싶은 위로 방식이에요</p>
            </div>

            <DetailCard 
              title={report.details.section1.stress.title}
              value={report.details.section1.stress.value}
              description={report.details.section1.stress.description}
              icon={Shield}
              color="indigo"
              delay={0.2}
            />
            <DetailCard 
              title={report.details.section1.comfort.title}
              value={report.details.section1.comfort.value}
              description={report.details.section1.comfort.description}
              icon={Heart}
              color="rose"
              delay={0.4}
            />
          </motion.div>
        </section>
      )}

      {/* 5. Deep Dive 2: Relationship Dynamics */}
      {report.details && (
        <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-orange-50/50">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.8 }}
             className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="md:col-span-2 text-center mb-2">
               <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2 mb-2">
                 <MessageCircle className="text-orange-500" />
                 갈등은 이렇게 풀고 싶어요
               </h2>
               <p className="text-slate-500">당신의 상한 마음을 달래주는 사과 방식이에요</p>
            </div>

            {/* Apology Style */}
            <div className="w-full">
              <DetailCard 
                title={report.details.section2.apology.title}
                value={report.details.section2.apology.value}
                description={report.details.section2.apology.description}
                icon={CheckCircle}
                color="orange"
                delay={0.2}
              />
            </div>

             {/* Apology Secondary */}
             {report.details.section2.apologySecondary && (
                <div className="w-full">
                  <DetailCard 
                    title={report.details.section2.apologySecondary.title}
                    value={report.details.section2.apologySecondary.value}
                    description={report.details.section2.apologySecondary.description}
                    icon={CheckCircle}
                    color="slate"
                    delay={0.3}
                  />
                </div>
             )}
          </motion.div>
        </section>
      )}
      {/* 5.5 Core Values Section */ }
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-pink-700/75 text-white">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.8 }}
           className="max-w-xl w-full text-center space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/25 text-amber-300 rounded-full text-sm font-bold border border-amber-400/30">
            <Star size={16} />
            <span>추구 가치</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">내 마음의 나침반</h2>
            <p className="text-white/80 text-lg">이것만큼은 꼭 함께 지키고 싶어요.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full">
            {(report.coreValues || []).map((item, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border backdrop-blur-md text-left transition-colors ${
                  idx === 0 
                  ? "bg-amber-400/25 border-amber-400/40 shadow-[0_0_30px_-10px_rgba(251,191,36,0.2)]" 
                  : "bg-white/10 border-white/20"
                }`}
              >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      idx === 0 ? "bg-amber-400 text-slate-900" : "bg-slate-700 text-slate-200"
                    }`}>
                      {item.rank || idx + 1}위
                    </span>
                    <h3 className={`text-xl font-bold ${idx === 0 ? "text-amber-300" : "text-white/90"}`}>
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {item.description}
                  </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 6. Dealbreakers Section */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-slate-900 text-white">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.8 }}
           className="max-w-xl w-full text-center space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-bold">
            <AlertTriangle size={16} />
            <span>거부 가치</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white/90">마음의 문이 닫히는 순간</h2>
            <p className="text-slate-400 text-lg">이것만큼은 정말 참기 힘들어요.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full">
            {report.dealbreakers.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border backdrop-blur-md text-left transition-colors ${
                  idx === 0 
                  ? "bg-red-500/10 border-red-500/30" 
                  : "bg-white/5 border-white/10"
                }`}
              >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      idx === 0 ? "bg-red-500 text-white" : "bg-slate-700 text-slate-300"
                    }`}>
                      {item.rank || idx + 1}위
                    </span>
                    <h3 className={`text-xl font-bold ${idx === 0 ? "text-red-400" : "text-slate-200"}`}>
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7-1. User Guide (Dos) */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-2xl w-full space-y-10 px-6"
        >
          <div className="text-center space-y-2">
             <div className="w-12 h-12 bg-pink-200 rounded-xl flex items-center justify-center mx-auto text-pink-600 mb-4">
               <BookOpen size={24} />
             </div>
             <h2 className="text-2xl font-bold text-slate-900">"이렇게 해줄 수 있어?"</h2>
             <p className="text-slate-500">함께 더 행복해지기 위한 약속들이에요</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 space-y-4">
             {report.userGuide.dos.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => openModal(item)}
                  className="flex items-center justify-between p-5 bg-pink-50 hover:bg-pink-100/80 transition-colors rounded-2xl cursor-pointer group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center font-bold text-sm">
                       {i+1}
                     </span>
                     <span className="font-bold text-slate-800 text-lg">{item.title}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm group-hover:scale-110 transition-transform">
                     <Info size={20} />
                  </div>
                </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* 7-2. User Guide (Donts) */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10">
         <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-2xl w-full space-y-10 px-6"
        >
          <div className="text-center space-y-2">
             <div className="w-12 h-12 bg-indigo-200 rounded-xl flex items-center justify-center mx-auto text-indigo-600 mb-4">
               <AlertTriangle size={24} />
             </div>
             <h2 className="text-2xl font-bold text-slate-900">"이것만은 조심해줄래?"</h2>
             <p className="text-slate-500">함께 갈등을 줄이기 위한 약속들이에요</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 space-y-4">
             {report.userGuide.donts.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => openModal(item)}
                  className="flex items-center justify-between p-5 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-2xl cursor-pointer group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                     <span className="w-8 h-8 rounded-full bg-indigo-300 text-indigo-600 flex items-center justify-center font-bold text-sm">
                       {i+1}
                     </span>
                     <span className="font-bold text-slate-800 text-lg">{item.title}</span>
                  </div>
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                     <Info size={20} />
                  </div>
                </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* 8. Disclaimer */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-slate-100">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.8 }}
           className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
        >
           <MapIcon size={32} className="mx-auto text-slate-400 mb-4" /> 
           
           <h3 className="text-xl font-bold text-slate-800">
             이 설명서는 '현재의 나'를 나타내요
           </h3>
           
           <p className="text-slate-600 leading-loose break-keep">
             사람의 마음은 날씨처럼 변하기도 하고<br/>
             상황이나 대상에 따라 다른 모습이 나오기도 해요.<br/><br/>
             이 설명서는 당신의 답변을 바탕으로 작성되었지만<br/>
             분석 결과가 당신의 미래까지 정의하진 않아요.<br/><br/>
             우리가 함께 만든 <strong>나 사용 설명서</strong>는 <br/>
             <strong>'현재의 나'를 이해하는 삶의 지도로 활용해주세요.</strong>
           </p>
        </motion.div>
      </section>


      {/* 9. Outro */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-gradient-to-b from-white to-slate-50">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="text-center space-y-8 max-w-lg"
        >
           <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">
             {isOwner ? (
               <>
                 이제, 당신에게 꼭 맞는<br/>
                 사랑을 시작할 준비가 되었군요!
               </>
             ) : (
               <>
                 새로운 사랑을 시작할<br/>
                 준비가 되셨나요?
               </>
             )}
           </h2>
           <p className="text-slate-500">
             {isOwner ? (
               <>
                 지금 바로 <strong className="text-pink-700/75">Luv ID</strong> 를 발급받고<br/>
                 나에게 꼭 맞는 인연을 찾아보세요!
               </>
             ) : (
               <>
                 당신도 <strong className="text-pink-700/75">나 사용 설명서</strong>를 만들어<br/>
                 나에게 꼭 맞는 인연을 찾아보세요!
               </>
             )}
           </p>
           <div className="flex gap-4">
            {isOwner ? (
              <>
                <div className="pt-8">
                  <button 
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 px-8 py-4 bg-pink-700/75 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl mx-auto"
                  >
                    <HeartHandshake size={20} />
                    <span>Luv ID 발급받기</span>
                  </button>
                </div>
                <div className="pt-8">
                  <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl mx-auto">
                    <Share2 size={20} />
                    <span>설명서 공유하기</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-8 w-full flex justify-center">
                <button 
                  onClick={() => router.push("/")}
                  className="flex items-center gap-2 px-8 py-4 bg-pink-700/75 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl mx-auto"
                >
                  <PencilIcon size={20} />
                  <span>설명서 만들러가기</span>
                </button>
              </div>
            )}
            </div>
        </motion.div>
      </section>
    </div>
  );
}

function SpecCard({ spec, delay }: { spec: PsychologicalSpec; delay: number }) {
  const Icon = {
    battery: BatteryChargingIcon,
    sword: SwordIcon,
    spackles: Sparkles,
    shield: AlertTriangle,
    star: Star,
  }[spec.icon] || Sparkles;

  const iconStyles = {
    battery: "bg-green-100 text-green-600",
    sword: "bg-rose-100 text-rose-600",
    star: "bg-amber-100 text-amber-600",
    shield: "bg-orange-100 text-orange-600", 
  }[spec.icon] || "bg-slate-100 text-slate-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-shadow"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconStyles}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{spec.label}</h3>
        <p className="text-lg font-bold text-slate-900 break-keep">{spec.value}</p>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed break-keep">
        {spec.description}
      </p>
    </motion.div>
  );
}

function DetailCard({ title, value, description, icon: Icon, color, delay }: { title: string, value: string, description: string, icon: any, color: string, delay: number }) {
  const bgColors: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-500",
    rose: "bg-rose-50 text-rose-500",
    orange: "bg-orange-50 text-orange-500",
    slate: "bg-slate-100 text-slate-500",
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-start text-left gap-4 hover:-translate-y-1 w-full"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bgColors[color] || bgColors.indigo}`}>
        <Icon size={24} />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{title}</h3>
        <h4 className="text-xl font-bold text-slate-900 break-keep">{value}</h4>
      </div>
      <p className="text-slate-600 leading-relaxed break-keep min-h-[4.5rem]">
        {description}
      </p>
    </motion.div>
  );
}
