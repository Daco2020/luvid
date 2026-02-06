"use server";

import { sendDiscordWebhook, Priority } from "@/shared/utils/discord_webhook";

export type ContactType = "서비스 문의" | "아이디어 제안";

export interface ContactFormData {
  type: ContactType;
  message: string;
  email?: string;
  subscribeToLaunch: boolean;
  userAgent: string;
  currentUrl: string;
}

export interface ContactFormResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormResult> {
  try {
    // 입력 검증
    if (!data.message || data.message.trim().length === 0) {
      return {
        success: false,
        error: "메시지를 입력해주세요.",
      };
    }

    if (data.message.length > 1000) {
      return {
        success: false,
        error: "메시지는 1000자 이하로 입력해주세요.",
      };
    }

    // 이메일 검증 (제공된 경우)
    if (data.email && data.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return {
          success: false,
          error: "올바른 이메일 형식을 입력해주세요.",
        };
      }
    }

    // Priority 설정
    const priority =
      data.type === "서비스 문의" ? Priority.medium : Priority.low;

    // 플랫폼 감지 (간단한 UA 체크)
    const isMobile = /mobile/i.test(data.userAgent);
    const platform = isMobile ? "Mobile" : "Web";

    // Discord 메시지 포맷
    const title = `${data.type} :: Luvid ${platform}`;
    const messageContent = `
💬 ${data.message}

📨 ${data.email && data.email.trim() ? data.email : "미제공"}

출시 알림 신청: ${data.subscribeToLaunch ? "예" : "아니오"}

📍 ${data.currentUrl}

💻 ${data.userAgent}
    `.trim();

    // Discord 웹훅 전송
    await sendDiscordWebhook(title, messageContent, priority);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      error: "메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
