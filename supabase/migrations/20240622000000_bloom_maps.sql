-- Create bloom_maps table to persist BLOOM Map Builder progress per user
CREATE TABLE IF NOT EXISTS bloom_maps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  development_area TEXT,
  dominant_trait TEXT,
  core_values TEXT[],
  smart_goal JSONB,
  five_year_vision TEXT,
  bold_vision_data JSONB,
  legacy_data JSONB,
  organic_growth_data JSONB,
  ownership_data JSONB,
  multiply_impact_data JSONB,
  completed_sections TEXT[] DEFAULT '{}',
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bloom_maps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bloom maps"
  ON bloom_maps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bloom maps"
  ON bloom_maps FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bloom maps"
  ON bloom_maps FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bloom maps"
  ON bloom_maps FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bloom_maps_updated_at
  BEFORE UPDATE ON bloom_maps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
