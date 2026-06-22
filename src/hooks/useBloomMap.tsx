import { useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type BloomMapData, type BloomSectionKey } from "@/utils/bloomTypes";
import { type SmartGoal } from "@/utils/coreValues";

const columnMap: Record<BloomSectionKey, string> = {
  boldVision:    "bold_vision_data",
  legacy:        "legacy_data",
  organicGrowth: "organic_growth_data",
  ownership:     "ownership_data",
  multiplyImpact:"multiply_impact_data",
};

interface UseBloomMapProps {
  userId: string | null;
  dominantTrait: string;
  coreValues: string[];
  smartGoal: SmartGoal | null;
  fiveYearVision: string;
  developmentArea: string;
}

export const useBloomMap = (props: UseBloomMapProps) => {
  const { userId, dominantTrait, coreValues, smartGoal, fiveYearVision, developmentArea } = props;
  const bloomMapIdRef = useRef<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveSection = useCallback(async (
    sectionKey: BloomSectionKey,
    sectionData: BloomMapData[BloomSectionKey],
    completedSections: BloomSectionKey[]
  ) => {
    if (!userId) return;
    setIsSaving(true);
    try {
      const column = columnMap[sectionKey];
      const base = {
        user_id: userId,
        dominant_trait: dominantTrait,
        core_values: coreValues,
        smart_goal: smartGoal as object,
        five_year_vision: fiveYearVision,
        development_area: developmentArea,
        completed_sections: completedSections as string[],
        [column]: sectionData as object,
      };

      if (bloomMapIdRef.current) {
        await (supabase as any)
          .from("bloom_maps")
          .update(base)
          .eq("id", bloomMapIdRef.current);
      } else {
        const { data } = await (supabase as any)
          .from("bloom_maps")
          .insert(base)
          .select("id")
          .single();
        if (data?.id) bloomMapIdRef.current = data.id;
      }
    } catch (err) {
      console.error("Error saving bloom map:", err);
    } finally {
      setIsSaving(false);
    }
  }, [userId, dominantTrait, coreValues, smartGoal, fiveYearVision, developmentArea]);

  const markComplete = useCallback(async () => {
    if (!userId || !bloomMapIdRef.current) return;
    await (supabase as any)
      .from("bloom_maps")
      .update({ is_complete: true })
      .eq("id", bloomMapIdRef.current);
  }, [userId]);

  return { saveSection, markComplete, isSaving };
};
