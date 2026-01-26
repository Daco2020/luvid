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
      <div className="flex justify-center px-4">
        <p className="text-sm text-gray-600 text-center max-w-md leading-relaxed">
          {message.text}
        </p>
      </div>
    );
  }

  if (message.type === "user") {
    // 내 답변 (오른쪽, primary 색상)
    return (
      <div className="flex justify-end px-4">
        <div className="bg-primary text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-xs md:max-w-md shadow-sm">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  // partner 타입 (연인 메시지 - 왼쪽, 회색 + 하단 캡션)
  return (
    <div className="flex flex-col items-start px-4 space-y-1">
      {/* 상황 캡션 */}
      {message.caption && (
        <p className="text-xs text-gray-500 px-2">{message.caption}</p>
      )}
      {/* 말풍선 */}
      <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs md:max-w-md shadow-sm">
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
