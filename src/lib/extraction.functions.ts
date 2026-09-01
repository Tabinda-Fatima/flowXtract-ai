import { createServerFn } from "@tanstack/react-start";

const WEBHOOK_URL = "https://tabindaf66.app.n8n.cloud/webhook/dataextract-ai";

export type ExtractionPayload = {
  url: string;
  description: string;
  email: string;
  outputFormats: string[];
};

export const submitExtraction = createServerFn({ method: "POST" })
  .inputValidator((data: ExtractionPayload) => {
    if (!data || typeof data.url !== "string" || typeof data.email !== "string") {
      throw new Error("Invalid payload");
    }
    return {
      url: String(data.url),
      description: String(data.description ?? ""),
      email: String(data.email),
      outputFormats: Array.isArray(data.outputFormats) ? data.outputFormats.map(String) : [],
    } satisfies ExtractionPayload;
  })
  .handler(async ({ data }) => {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Webhook responded with ${res.status}`);
    }
    return { ok: true as const };
  });
