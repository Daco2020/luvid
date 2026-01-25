interface Message {
  id: string;
  type: "system" | "partner" | "user";
  text: string;
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

  // partner 타입 (연인 메시지 - 왼쪽, 회색)
  return (
    <div className="flex justify-start px-4">
      <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs md:max-w-md shadow-sm">
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
