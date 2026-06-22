import { supabase } from "@/integrations/supabase/client";
import { type BloomSectionAnswer, type BloomSectionKey } from "./bloomTypes";
import { type SmartGoal } from "./coreValues";

const sectionNameMap: Record<BloomSectionKey, string> = {
  boldVision: "bold-vision",
  legacy: "legacy",
  organicGrowth: "organic-growth",
  ownership: "ownership",
  multiplyImpact: "multiply-impact",
};

async function invoke(body: object): Promise<Record<string, string>> {
  const { data, error } = await supabase.functions.invoke("generate-bloom-section", { body });
  if (error) throw error;
  return data;
}

export const generateBoldVisionInitial = async (params: {
  personalityTrait: string;
  smartGoal: SmartGoal;
  coreValues: string[];
  fiveYearVision: string;
}): Promise<string> => {
  const data = await invoke({ section: "bold-vision-initial", ...params });
  return data.content;
};

export const generateBloomSection = async (params: {
  sectionKey: BloomSectionKey;
  answers: BloomSectionAnswer[];
  personalityTrait: string;
  smartGoal: SmartGoal;
  coreValues: string[];
}): Promise<string> => {
  const { sectionKey, ...rest } = params;
  const data = await invoke({ section: sectionNameMap[sectionKey], ...rest });
  return data.content;
};

export const getShiftResponse = async (params: {
  step: string;
  stepLabel: string;
  userAnswer: string;
  previousAnswers: { step: string; label: string; answer: string }[];
  personalityTrait: string;
  smartGoal: SmartGoal;
  coreValues: string[];
}): Promise<string> => {
  const data = await invoke({ section: "shift", ...params });
  return data.response;
};
