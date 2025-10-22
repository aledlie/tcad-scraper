/*
  # TCAD Properties Database Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key) - Unique identifier for each property record
      - `property_id` (text, unique) - TCAD property ID (PID)
      - `name` (text) - Owner name
      - `prop_type` (text) - Property type (residential, commercial, etc.)
      - `city` (text, nullable) - City where property is located
      - `property_address` (text) - Street address of property
      - `assessed_value` (numeric) - Assessed value in dollars
      - `appraised_value` (numeric) - Appraised value in dollars
      - `geo_id` (text, nullable) - Geographic identifier
      - `description` (text, nullable) - Legal description of property
      - `search_term` (text, nullable) - Original search term used to find this property
      - `scraped_at` (timestamptz) - When the data was scraped
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Indexes
    - Index on `property_id` for fast lookups
    - Index on `city` for filtering by city
    - Index on `prop_type` for filtering by property type
    - Index on `appraised_value` for sorting by value
    - Index on `scraped_at` for temporal queries

  3. Security
    - Enable RLS on `properties` table
    - Add policy for public read access (analytics dashboard)
    - Add policy for authenticated insert/update (scraper operations)
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id text UNIQUE NOT NULL,
  name text NOT NULL,
  prop_type text NOT NULL,
  city text,
  property_address text NOT NULL,
  assessed_value numeric DEFAULT 0,
  appraised_value numeric DEFAULT 0,
  geo_id text,
  description text,
  search_term text,
  scraped_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_properties_property_id ON properties(property_id);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_prop_type ON properties(prop_type);
CREATE INDEX IF NOT EXISTS idx_properties_appraised_value ON properties(appraised_value DESC);
CREATE INDEX IF NOT EXISTS idx_properties_scraped_at ON properties(scraped_at DESC);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access for analytics dashboard
CREATE POLICY "Public read access for properties"
  ON properties
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Allow authenticated users to read all properties
CREATE POLICY "Authenticated users can read all properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to insert properties (scraper)
CREATE POLICY "Authenticated users can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update properties (scraper)
CREATE POLICY "Authenticated users can update properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
