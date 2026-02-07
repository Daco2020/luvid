"use client";

import { useState, useTransition } from "react";
import { Send, X, ChevronRight, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { submitContactForm, ContactType } from "@/shared/actions/contact-action";

type ModalStep = "closed" | "select-type" | "write-message" | "email-input";

const HIDDEN_PATHS = [
  "/user-manual/emotional-patterns",
  "/user-manual/conflict-styles",
  "/user-manual/value-tournament",
];

export function FloatingContactButton() {
  const pathname = usePathname();
  const [step, setStep] = useState<ModalStep>("closed");
  const [contactType, setContactType] = useState<ContactType | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeToLaunch, setSubscribeToLaunch] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // 위자드 화면에서는 버튼 숨김
  if (pathname && HIDDEN_PATHS.some(path => pathname.startsWith(path))) {
    return null;
  }

  const handleOpenModal = () => {
    setStep("select-type");
    setError(null);
  };

  const handleCloseModal = () => {
    setStep("closed");
    setContactType(null);
    setMessage("");
    setEmail("");
    setSubscribeToLaunch(false);
    setError(null);
    setShowSuccess(false);
  };

  const handleSelectType = (type: ContactType) => {
    setContactType(type);
    setStep("write-message");
  };

  const handleNextToEmail = () => {
    if (!message.trim()) {
      setError("메시지를 입력해주세요.");
      return;
    }
    if (message.length > 1000) {
      setError("메시지는 1000자 이하로 입력해주세요.");
      return;
    }
    setError(null);
    setStep("email-input");
  };

  const handleSubmit = async () => {
    if (!contactType) return;

    setError(null);
    startTransition(async () => {
      const result = await submitContactForm({
        type: contactType,
        message,
        email: email.trim() || undefined,
        subscribeToLaunch: email.trim().length > 0 && subscribeToLaunch,
        userAgent: navigator.userAgent,
        currentUrl: window.location.href,
      });

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setError(result.error || "전송에 실패했습니다.");
      }
    });
  };

  const isModalOpen = step !== "closed";

  return (
    <>
      {/* 플로팅 버튼 */}
      {/* 플로팅 버튼 */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-90 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center p-0"
        aria-label="문의하기"
      >
        <Send className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white transition-transform ml-[-2px] mt-[1px]" />
      </button>

      {/* 모달 오버레이 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* 헤더 */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-slate-900">
                {step === "select-type" && "문의 유형 선택"}
                {step === "write-message" && "메시지 작성"}
                {step === "email-input" && "연락처 입력"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 본문 */}
            <div className="p-6">
              {/* 성공 메시지 */}
              {showSuccess && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    전송 완료!
                  </h3>
                  <p className="text-slate-600">
                    소중한 의견 감사합니다.
                  </p>
                </div>
              )}

              {/* Step 1: 문의 유형 선택 */}
              {step === "select-type" && !showSuccess && (
                <div className="space-y-3">
                  <button
                    onClick={() => handleSelectType("서비스 문의")}
                    className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-slate-900 hover:bg-slate-50 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">
                          서비스 문의
                        </h3>
                        <p className="text-sm text-slate-600">
                          서비스 이용 중 문제나 궁금한 점이 있으신가요?
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectType("아이디어 제안")}
                    className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-slate-900 hover:bg-slate-50 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">
                          아이디어 제안
                        </h3>
                        <p className="text-sm text-slate-600">
                          더 나은 서비스를 위한 아이디어를 공유해주세요!
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                  </button>
                </div>
              )}

              {/* Step 2: 메시지 작성 */}
              {step === "write-message" && !showSuccess && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">
                        메시지
                      </label>
                      <span className="text-xs text-slate-500">
                        {message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="자유롭게 작성해주세요..."
                      className="w-full h-48 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                      maxLength={1000}
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("select-type")}
                      className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      이전
                    </button>
                    <button
                      onClick={handleNextToEmail}
                      className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      다음
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: 이메일 입력 */}
              {step === "email-input" && !showSuccess && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      답장 받을 이메일 (선택)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      답장을 받고 싶은 경우에만 입력해주세요.
                    </p>
                  </div>

                  <div className={`bg-slate-100 p-4 rounded-xl transition-opacity duration-200 ${!email.trim() ? "opacity-50" : "opacity-100"}`}>
                    <label className={`flex items-center gap-3 ${!email.trim() ? "cursor-not-allowed" : "cursor-pointer"}`}>
                      <input
                        type="checkbox"
                        checked={subscribeToLaunch}
                        onChange={(e) => setSubscribeToLaunch(e.target.checked)}
                        disabled={!email.trim()}
                        className="w-4 h-4 text-slate-900 border-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span className="text-xs text-slate-700">
                        Luvid가 정식 출시되면 해당 이메일로 안내를 받으시겠어요?
                      </span>
                    </label>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("write-message")}
                      disabled={isPending}
                      className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      이전
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isPending}
                      className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          전송 중...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          보내기
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
