import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import placeholder from "@/assets/project-placeholder.jpg";

export interface DBProject {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  tag: string;
  client: string;
  image_url: string;
  project_url: string | null;
  featured: boolean;
  sort_order: number;
}

const CARD_BGS = [
  "var(--gradient-card-teal)",
  "var(--gradient-card-slate)",
  "var(--gradient-card-charcoal)",
];

export function cardBgFor(index: number) {
  return CARD_BGS[index % CARD_BGS.length];
}

export function imageFor(p: DBProject) {
  return p.image_url && p.image_url.trim().length > 0 ? p.image_url : placeholder;
}

export function useProjects() {
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (!error && data) setProjects(data as DBProject[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { projects, loading, reload: load };
}
