import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { adminIsAuthed, adminLogout } from "@/lib/adminAuth";
import { useProjects, type DBProject } from "@/hooks/useProjects";
import { useSiteSettings, type HowWeWorkItem } from "@/hooks/useSiteSettings";
import { LogOut, Plus, Trash2, Pencil, X, Upload, Save, GripVertical, Mail, CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";
import { CustomCursor } from "@/components/CustomCursor";

type Tab = "projects" | "settings" | "submissions";

const empty: Omit<DBProject, "id"> = {
  title: "",
  description: "",
  long_description: "",
  tag: "PROJECT",
  client: "",
  image_url: "",
  project_url: "",
  featured: false,
  sort_order: 0,
};

const AdminDashboard = () => {
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("projects");

  useEffect(() => {
    if (!adminIsAuthed()) nav("/sinimini", { replace: true });
  }, [nav]);

  const logout = () => {
    adminLogout();
    nav("/sinimini", { replace: true });
  };

  return (
    <div className="min-h-screen bg-bg-deep text-text-primary">
      <CustomCursor />
      <header className="border-b border-white/[0.06] bg-bg-base/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <div className="font-syne text-xl font-extrabold tracking-tight">
              JARVIZ <span className="text-accent-blue">// ADMIN</span>
            </div>
            <nav className="flex gap-1">
              {(["projects", "settings"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest transition-colors ${
                    tab === t ? "bg-accent-blue/10 text-accent-blue" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </nav>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 border border-white/10 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted transition-colors hover:border-accent-red/50 hover:text-accent-red"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto py-10">
        {tab === "projects" ? <ProjectsManager /> : <SettingsManager />}
      </main>
    </div>
  );
};

/* ---------------- PROJECTS ---------------- */

function ProjectsManager() {
  const { projects, loading, reload } = useProjects();
  const [editing, setEditing] = useState<DBProject | "new" | null>(null);

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Project deleted");
      reload();
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-syne text-3xl font-extrabold tracking-tight">Projects</h2>
        <button
          onClick={() => setEditing("new")}
          className="inline-flex items-center gap-2 bg-accent-blue px-5 py-2.5 font-syne text-xs font-semibold uppercase tracking-wider text-bg-deep transition-all hover:shadow-glow-blue-strong"
          style={{ borderRadius: 4 }}
        >
          <Plus size={14} /> New Project
        </button>
      </div>

      {loading ? (
        <div className="font-mono text-xs uppercase tracking-widest text-text-muted">Loading…</div>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 border border-white/[0.06] bg-bg-card p-4"
            >
              <GripVertical size={16} className="shrink-0 text-text-dim" />
              <div className="h-14 w-20 shrink-0 overflow-hidden border border-white/10 bg-bg-deep">
                {p.image_url && (
                  <img src={p.image_url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-syne font-bold text-text-primary truncate">{p.title}</span>
                  {p.featured && (
                    <span className="border border-accent-blue/40 px-1.5 py-0.5 font-mono text-[0.55rem] tracking-widest text-accent-blue">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="font-mono text-[0.6rem] tracking-widest text-text-muted truncate">
                  [ {p.tag} ] · {p.client || "—"}
                </div>
              </div>
              <button
                onClick={() => setEditing(p)}
                className="border border-white/10 p-2 text-text-muted transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
                aria-label="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => remove(p.id)}
                className="border border-white/10 p-2 text-text-muted transition-colors hover:border-accent-red/40 hover:text-accent-red"
                aria-label="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="border border-dashed border-white/10 p-10 text-center font-mono text-xs uppercase tracking-widest text-text-muted">
              No projects yet — click "New Project".
            </div>
          )}
        </div>
      )}

      {editing && (
        <ProjectForm
          initial={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      )}
    </div>
  );
}

function ProjectForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: DBProject | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Omit<DBProject, "id">>(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          long_description: initial.long_description ?? "",
          tag: initial.tag,
          client: initial.client,
          image_url: initial.image_url,
          project_url: initial.project_url ?? "",
          featured: initial.featured,
          sort_order: initial.sort_order,
        }
      : { ...empty }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("project-images").upload(name, file, {
        contentType: file.type,
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("project-images").getPublicUrl(name);
      set("image_url", data.publicUrl);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      long_description: form.long_description || null,
      project_url: form.project_url || null,
    };
    const { error } = initial
      ? await supabase.from("projects").update(payload).eq("id", initial.id)
      : await supabase.from("projects").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success(initial ? "Project updated" : "Project created");
      onSaved();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-bg-deep/85 backdrop-blur-xl" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10 bg-bg-card">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <h3 className="font-syne text-xl font-bold">
            {initial ? "Edit Project" : "New Project"}
          </h3>
          <button onClick={onClose} aria-label="Close" className="text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <Field label="Title *">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inp}
            />
          </Field>

          <Field label="Short Description *">
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={inp}
            />
          </Field>

          <Field label="Long Description (modal)">
            <textarea
              rows={4}
              value={form.long_description ?? ""}
              onChange={(e) => set("long_description", e.target.value)}
              className={inp}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Tag">
              <input value={form.tag} onChange={(e) => set("tag", e.target.value.toUpperCase())} className={inp} />
            </Field>
            <Field label="Client">
              <input value={form.client} onChange={(e) => set("client", e.target.value)} className={inp} />
            </Field>
          </div>

          <Field label="Project URL (View Project button)">
            <input
              type="url"
              placeholder="https://…"
              value={form.project_url ?? ""}
              onChange={(e) => set("project_url", e.target.value)}
              className={inp}
            />
          </Field>

          <Field label="Image">
            <div className="space-y-2">
              <input
                type="url"
                placeholder="Paste image URL…"
                value={form.image_url}
                onChange={(e) => set("image_url", e.target.value)}
                className={inp}
              />
              <div className="flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-widest text-text-muted transition-colors hover:border-accent-blue/40 hover:text-accent-blue">
                  <Upload size={12} />
                  {uploading ? "Uploading…" : "Upload File"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) upload(f);
                    }}
                  />
                </label>
                {form.image_url && (
                  <img src={form.image_url} alt="" className="h-10 w-16 border border-white/10 object-cover" />
                )}
              </div>
            </div>
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Sort Order">
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => set("sort_order", Number(e.target.value))}
                className={inp}
              />
            </Field>
            <label className="mt-6 inline-flex items-center gap-2 font-dm text-sm text-text-primary">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="h-4 w-4 accent-[hsl(var(--accent-blue))]"
              />
              Featured (shows on homepage)
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-white/[0.06] px-6 py-4">
          <button
            onClick={onClose}
            className="border border-white/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-text-muted hover:border-white/20 hover:text-text-primary"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-accent-blue px-5 py-2 font-syne text-xs font-semibold uppercase tracking-wider text-bg-deep hover:shadow-glow-blue-strong disabled:opacity-50"
            style={{ borderRadius: 4 }}
          >
            <Save size={13} /> {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inp =
  "w-full border border-white/10 bg-bg-deep px-3 py-2 font-dm text-sm text-text-primary outline-none focus:border-accent-blue/60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">{label}</span>
      {children}
    </label>
  );
}

/* ---------------- SETTINGS ---------------- */

function SettingsManager() {
  const { howWeWork, reload } = useSiteSettings();
  const [items, setItems] = useState<HowWeWorkItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(howWeWork);
  }, [howWeWork]);

  const update = (i: number, patch: Partial<HowWeWorkItem>) =>
    setItems((arr) => arr.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const add = () => setItems((arr) => [...arr, { tag: "NEW", text: "" }]);
  const remove = (i: number) => setItems((arr) => arr.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    setItems((arr) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      const c = [...arr];
      [c[i], c[j]] = [c[j], c[i]];
      return c;
    });
  };

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ how_we_work: items as unknown as never, updated_at: new Date().toISOString() })
      .eq("id", "main");
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Saved");
      reload();
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-syne text-3xl font-extrabold tracking-tight">How We Work</h2>
          <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-text-muted">
            Edits the HOW_WE_WORK.SYS panel in the About section
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-accent-blue px-5 py-2.5 font-syne text-xs font-semibold uppercase tracking-wider text-bg-deep hover:shadow-glow-blue-strong disabled:opacity-50"
          style={{ borderRadius: 4 }}
        >
          <Save size={13} /> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="grid items-center gap-3 border border-white/[0.06] bg-bg-card p-4 md:grid-cols-[120px_1fr_auto]">
            <input
              value={it.tag}
              onChange={(e) => update(i, { tag: e.target.value.toUpperCase() })}
              className={inp}
              placeholder="TAG"
            />
            <input
              value={it.text}
              onChange={(e) => update(i, { text: e.target.value })}
              className={inp}
              placeholder="Description"
            />
            <div className="flex gap-2">
              <button onClick={() => move(i, -1)} className="border border-white/10 px-2 py-2 text-xs text-text-muted hover:text-text-primary">↑</button>
              <button onClick={() => move(i, 1)} className="border border-white/10 px-2 py-2 text-xs text-text-muted hover:text-text-primary">↓</button>
              <button
                onClick={() => remove(i)}
                className="border border-white/10 px-2 py-2 text-text-muted hover:border-accent-red/40 hover:text-accent-red"
                aria-label="Remove"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={add}
          className="inline-flex items-center gap-2 border border-dashed border-white/15 px-4 py-3 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
        >
          <Plus size={12} /> Add Step
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
