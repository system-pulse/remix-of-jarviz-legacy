import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20, "Phone too long").regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  type: z.string().min(1, "Choose a project type"),
  message: z.string().trim().min(5, "Tell us a bit more").max(2000),
});

const PROJECT_TYPES = [
  "Web Design",
  "Restaurant System",
  "Business Site",
  "Maintenance",
  "Other",
];

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Check your details",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const payload = {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      project_type: parsed.data.type,
      message: parsed.data.message,
    };
    const { error } = await supabase.from("contact_submissions").insert(payload);
    if (!error) {
      // Fire-and-forget notification webhook (Google Apps Script etc.)
      try {
        const { data: settings } = await supabase
          .from("site_settings")
          .select("webhook_url, notify_email")
          .eq("id", "main")
          .maybeSingle();
        const url = (settings as { webhook_url?: string } | null)?.webhook_url;
        if (url) {
          fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...payload,
              notify_email: (settings as { notify_email?: string }).notify_email || "",
              submitted_at: new Date().toISOString(),
              source: window.location.origin,
            }),
          }).catch(() => {});
        }
      } catch { /* ignore */ }
    }
    setSubmitting(false);
    if (error) {
      toast({
        title: "Couldn't send",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setForm({ name: "", email: "", phone: "", type: "", message: "" });
    toast({
      title: "Message sent",
      description: "We'll be in touch within 24 hours.",
    });
  };

  return (
    <section id="contact" className="relative bg-bg-base py-28 md:py-36">
      <div className="container mx-auto grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div>
          <div className="reveal">
            <div className="label-mono mb-4 flex items-center gap-3">
              <span className="red-spark" />
              <span>Let's Talk</span>
            </div>
            <h2 className="font-syne text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary md:text-5xl">
              Let's Build <br />Something.
            </h2>
            <p className="mt-5 max-w-md font-dm text-text-muted">
              Tell us about your project. We respond within 24 hours — usually faster.
            </p>
          </div>

          <div className="mt-10 space-y-4" data-stagger="80">
            <a
              href="mailto:nawazuddin.nzz@gmail.com"
              className="reveal glass glow-hover group flex items-center gap-4 px-5 py-4"
            >
              <span className="flex h-10 w-10 items-center justify-center border border-white/5 text-accent-blue">
                <Mail size={18} />
              </span>
              <div>
                <div className="label-mono">Email</div>
                <div className="font-dm text-text-primary">Click & Connect </div>
              </div>
            </a>

            <a
              href="https://wa.link/xdwlsb"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group relative flex items-center gap-4 overflow-hidden border border-white/5 bg-[hsl(142_70%_30%)] px-5 py-4 text-text-primary transition-all duration-300 hover:bg-[hsl(142_70%_36%)] animate-pulse-glow"
            >
              <span className="flex h-10 w-10 items-center justify-center bg-white/10">
                <MessageCircle size={18} />
              </span>
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-white/70">
                  WhatsApp
                </div>
                <div className="font-dm font-medium">Click & Connect</div>
              </div>
            </a>

            <div className="reveal glass flex items-center gap-4 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center border border-white/5 text-accent-blue">
                <MapPin size={18} />
              </span>
              <div>
                <div className="label-mono">Location</div>
                <div className="font-dm text-text-primary">Bellary 📍</div>
                <div className="font-dm text-text-primary">Remote · India · Worldwide</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <form onSubmit={onSubmit} className="reveal glass space-y-5 p-7 md:p-9">
          <div>
            <label className="label-mono mb-2 block">Name</label>
            <input
              value={form.name}
              onChange={onChange("name")}
              maxLength={100}
              className="w-full border border-white/5 bg-bg-surface/50 px-4 py-3 font-dm text-text-primary outline-none transition-all duration-300 focus:border-accent-blue/60 focus:shadow-glow-blue"
            />
          </div>
          <div>
            <label className="label-mono mb-2 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={onChange("email")}
              maxLength={255}
              className="w-full border border-white/5 bg-bg-surface/50 px-4 py-3 font-dm text-text-primary outline-none transition-all duration-300 focus:border-accent-blue/60 focus:shadow-glow-blue"
            />
          </div>
          <div>
            <label className="label-mono mb-2 block">Phone</label>
            <input
              type="tel"
              inputMode="tel"
              placeholder="+91"
              value={form.phone}
              onChange={onChange("phone")}
              maxLength={20}
              className="w-full border border-white/5 bg-bg-surface/50 px-4 py-3 font-dm text-text-primary outline-none transition-all duration-300 focus:border-accent-blue/60 focus:shadow-glow-blue"
            />
          </div>
          <div>
            <label className="label-mono mb-2 block">Project Type</label>
            <select
              value={form.type}
              onChange={onChange("type")}
              className="w-full border border-white/5 bg-bg-surface/50 px-4 py-3 font-dm text-text-primary outline-none transition-all duration-300 focus:border-accent-blue/60 focus:shadow-glow-blue"
            >
              <option value="" className="bg-bg-deep">Select…</option>
              {PROJECT_TYPES.map((p) => (
                <option key={p} value={p} className="bg-bg-deep">
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-mono mb-2 block">Message</label>
            <textarea
              value={form.message}
              onChange={onChange("message")}
              rows={5}
              maxLength={2000}
              className="w-full resize-none border border-white/5 bg-bg-surface/50 px-4 py-3 font-dm text-text-primary outline-none transition-all duration-300 focus:border-accent-blue/60 focus:shadow-glow-blue"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent-blue px-6 py-4 font-syne text-sm font-semibold uppercase tracking-wider text-bg-deep transition-all duration-300 hover:shadow-glow-blue-strong disabled:opacity-60"
            style={{ borderRadius: 4 }}
          >
            {submitting ? "Sending…" : "Send Message →"}
          </button>
        </form>
      </div>
    </section>
  );
}
