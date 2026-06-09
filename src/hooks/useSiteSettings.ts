import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HowWeWorkItem {
  tag: string;
  text: string;
}

const FALLBACK: HowWeWorkItem[] = [
  { tag: "DESIGN", text: "Figma → Clean, functional UI" },
  { tag: "BUILD", text: "React + Tailwind → Fast, modern code" },
  { tag: "DEPLOY", text: "Vercel/Netlify → Live in hours" },
  { tag: "SUPPORT", text: "Always on → Post-launch help" },
];

export function useSiteSettings() {
  const [howWeWork, setHowWeWork] = useState<HowWeWorkItem[]>(FALLBACK);
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [notifyEmail, setNotifyEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("site_settings")
      .select("how_we_work, webhook_url, notify_email")
      .eq("id", "main")
      .maybeSingle();
    if (data?.how_we_work && Array.isArray(data.how_we_work)) {
      setHowWeWork(data.how_we_work as unknown as HowWeWorkItem[]);
    }
    if (data && typeof (data as { webhook_url?: string }).webhook_url === "string") {
      setWebhookUrl((data as { webhook_url: string }).webhook_url);
    }
    if (data && typeof (data as { notify_email?: string }).notify_email === "string") {
      setNotifyEmail((data as { notify_email: string }).notify_email);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { howWeWork, webhookUrl, notifyEmail, loading, reload: load };
}
