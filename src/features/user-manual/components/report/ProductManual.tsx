"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Battery, Wifi, Cpu, AlertTriangle, CheckCircle, Share2, Sparkles, BookOpen } from "lucide-react";
import { PsychologicalSpec, UserManualReport } from "../../model/report";

interface ProductManualProps {
  report: UserManualReport;
}

export function ProductManual({ report }: ProductManualProps) {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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

      {/* 1. Intro Section */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="space-y-6 max-w-2xl"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-500 text-sm font-medium tracking-widest uppercase mb-4">
            Analysis Complete
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            나 사용 설명서<br/>
            <span className="text-primary italic">for you</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
            나조차 몰랐던 나를 이해하는 시간.<br/>
            당신을 위한 단 하나의 설명서가 도착했습니다.
          </p>
          <div className="pt-10 animate-bounce text-slate-400">
            <span className="text-xs uppercase tracking-wider">스크롤하여 확인하기</span>
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
           <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-purple-400 rounded-3xl rotate-3 shadow-2xl flex items-center justify-center text-white">
             <Sparkles size={48} />
           </div>
           
           <div className="space-y-2">
             <h2 className="text-sm font-bold text-primary tracking-widest uppercase">고유 아이덴티티</h2>
             <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{report.identity.archetype}</h3>
             <p className="text-slate-500 text-lg">"{report.identity.catchphrase}"</p>
           </div>
           
           <p className="text-slate-600 leading-relaxed break-keep">
             {report.identity.description}
           </p>
        </motion.div>
      </section>

      {/* 3. Specs Section */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-3 text-center mb-8">
             <h2 className="text-3xl font-bold text-slate-900">심리적 스펙</h2>
             <p className="text-slate-500">당신을 구성하는 핵심 기능</p>
          </div>
          
          {report.specs.map((spec, index) => (
            <SpecCard key={index} spec={spec} delay={index * 0.2} />
          ))}
        </div>
      </section>

      {/* 4. Dealbreakers Section */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-slate-900 text-white">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 0.8 }}
           className="max-w-xl w-full text-center space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-bold">
            <AlertTriangle size={16} />
            <span>주의 사항</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">시스템 과부하</h2>
            <p className="text-slate-400 text-lg">이것만큼은 절대 참을 수 없습니다.</p>
          </div>

          <div className="bg-white/10 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
            {report.dealbreakers.map((item, idx) => (
              <div key={idx} className="space-y-2">
                 <h3 className="text-2xl font-bold text-red-400">{item.label}</h3>
                 <p className="text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. User Guide (Dos & Donts) */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-2xl w-full space-y-10"
        >
          <div className="text-center space-y-2">
             <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto text-primary mb-4">
               <BookOpen size={24} />
             </div>
             <h2 className="text-3xl font-bold text-slate-900">사용 가이드</h2>
             <p className="text-slate-500">최적의 성능을 위한 사용 지침</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle size={16} /> 권장 사항 (Do's)
              </h3>
              <ul className="space-y-3">
                {report.userGuide.dos.map((text, i) => (
                   <li key={i} className="flex items-start gap-3 text-slate-700">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                     {text}
                   </li>
                ))}
              </ul>
            </div>
            
            <div className="h-px bg-slate-100" />
            
            <div className="space-y-4">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">주의 사항 (Don'ts)</h3>
               <ul className="space-y-3">
                 {report.userGuide.donts.map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                      {text}
                    </li>
                 ))}
               </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. Outro */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-6 relative z-10 bg-gradient-to-b from-white to-slate-50">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="text-center space-y-8 max-w-lg"
        >
           <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">
             이제, 당신에게 꼭 맞는<br/>
             사랑을 할 준비가 되었습니다.
           </h2>
           <p className="text-slate-500">
             이 설명서를 잊지 않는다면,<br/>
             당신은 더 행복해질 수 있습니다.
           </p>
           
           <div className="pt-8">
             <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl mx-auto">
               <Share2 size={20} />
               <span>설명서 공유하기</span>
             </button>
           </div>
        </motion.div>
      </section>
    </div>
  );
}

function SpecCard({ spec, delay }: { spec: PsychologicalSpec; delay: number }) {
  const Icon = {
    battery: Battery,
    wifi: Wifi,
    cpu: Cpu,
    shield: AlertTriangle,
    star: Sparkles,
  }[spec.icon] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-shadow"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{spec.label}</h3>
        <p className="text-lg font-bold text-slate-900">{spec.value}</p>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed break-keep">
        {spec.description}
      </p>
    </motion.div>
  );
}
