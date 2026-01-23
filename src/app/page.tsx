import Link from "next/link";
import { ArrowRight, Clock, ListChecks } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="w-full max-w-2xl z-10">
        
        {/* Text-Only Logo */}
        <header className="mb-8 text-center">
          <div className="mb-4">
            <span className="text-2xl font-display font-bold tracking-tight text-primary">Luvid</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">
            나에게 꼭 맞는<br className="sm:hidden" /> 연애를 하고 싶나요?
          </h1>
          <p className="text-slate-500 text-base font-normal leading-relaxed">
            지금까지는 나를 잘 몰랐던 것인지도 몰라요.<br className="hidden md:block"/>
            다음 연애는 좀 더 선명해질 수 있도록 Luvid가 도와드릴게요.
          </p>
        </header>

        {/* Clean Card UI */}
        <div className="bg-white rounded-xl p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            
            <div className="space-y-5 flex-1">
              <div className="flex items-center text-primary text-xs font-semibold">
                STEP 1
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">나 사용 설명서 만들기</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  감정 패턴, 갈등 스타일, 그리고 가치관까지.<br className="hidden md:block"/>
                  나도 몰랐던 내 모습을 발견해보세요.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} />
                  <span className="text-xs font-medium">20분 소요</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <ListChecks size={16} />
                  <span className="text-xs font-medium">3개 섹션</span>
                </div>
              </div>
            </div>

            <Link 
              href="/user-manual/emotional-patterns" 
              className="w-full md:w-auto px-8 py-3.5 bg-primary hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm group"
            >
              시작하기
              <ArrowRight size={16} className="text-white/80 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            "가장 중요한 관계는 바로<br className="md:hidden"/> 나 자신과의 관계입니다."
          </p>
        </div>

      </main>
    </div>
  );
}
