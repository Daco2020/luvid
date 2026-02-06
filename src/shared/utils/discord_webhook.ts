// Server-side Discord Webhook utility
// Note: Ensure DISCORD_WEBHOOK_URL is set in environment variables (server only)

export enum Priority {
  high = "high",
  medium = "medium",
  low = "low",
}

function getColor(priority: Priority): number {
  switch (priority) {
    case Priority.high:
      return 0xff0000; // red
    case Priority.medium:
      return 0x4ee037; // green
    case Priority.low:
    default:
      return 0x2cbfee; // blue
  }
}

export type SendMessageOptions = {
  title: string;
  message: string;
  priority?: Priority;
};

export class DiscordWebhookClient {
  private readonly webhookUrl: string | undefined;

  constructor(webhookUrl?: string) {
    this.webhookUrl = webhookUrl ?? process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
  }

  async sendMessage({ title, message, priority = Priority.low }: SendMessageOptions): Promise<void> {
    if (!this.webhookUrl) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn("DISCORD_WEBHOOK_URL is not set; skipping webhook send.");
      }
      return;
    }

    const payload = {
      embeds: [
        {
          title,
          description: message,
          color: getColor(priority),
          timestamp: new Date().toISOString(),
        },
      ],
    } as const;

    try {
      const res = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status !== 204) {
        const text = await res.text().catch(() => "");
        // eslint-disable-next-line no-console
        console.error("Discord webhook failed:", res.status, text);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Discord webhook error:", err);
    }
  }
}

// Convenience singleton send function
const defaultClient = new DiscordWebhookClient();
export async function sendDiscordWebhook(title: string, message: string, priority: Priority = Priority.low): Promise<void> {
  return defaultClient.sendMessage({ title, message, priority });
}


