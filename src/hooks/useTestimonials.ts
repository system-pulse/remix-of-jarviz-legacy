import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DBTestimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  photo_url: string;
  featured: boolean;
  sort_order: number;
}

export function useTestimonials(opts?: { featuredOnly?: boolean }) {
  const [items, setItems] = useState<DBTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    let q = supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (opts?.featuredOnly) q = q.eq("featured", true).limit(4);
    const { data } = await q;
    setItems((data || []) as DBTestimonial[]);
    setLoading(false);
  }, [opts?.featuredOnly]);

  useEffect(() => { load(); }, [load]);

  return { items, loading, reload: load };
}
