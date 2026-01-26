interface Message {
  id: string;
  type: "system" | "partner" | "user";
  text: string;
  caption?: string; // 상황 설명 (partner 타입에서 사용)
  branchId?: number;
  choiceId?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.type === "system") {
    // 시스템 메시지 (상황 설명) - 가운데, 배경색 없이 글자만
    return (
      <div className="flex justify-center px-4 py-2">
        <p className="text-xs text-gray-500 text-center max-w-md leading-relaxed">
          {message.text}
        </p>
      </div>
    );
  }

  if (message.type === "user") {
    // 내 답변 (오른쪽, primary 색상)
    return (
      <div className="flex justify-end px-4 animate-in slide-in-from-right-2 duration-300">
        <div className="bg-primary text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[75%] shadow-sm">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  // partner 타입 (연인 메시지 - 왼쪽, 회색 + 하단 캡션)
  return (
    <div className="flex flex-col items-start px-4 space-y-1.5 animate-in slide-in-from-left-2 duration-300">
      {/* 상황 캡션 가운데 정렬*/}
      {message.caption && (
        <p className="text-xs text-gray-400 px-2 w-full text-center mt-8 mb-8">{message.caption}</p>
      )}
      {/* 말풍선 */}
      <div className="bg-white/80 text-gray-800 px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[75%] shadow-sm">
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
