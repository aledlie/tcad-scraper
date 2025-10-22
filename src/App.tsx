import { useState, useEffect } from 'react';
import { supabase, Property } from './lib/supabase';
import PropertyTable from './components/PropertyTable';
import Analytics from './components/Analytics';
import Filters from './components/Filters';
import Charts from './components/Charts';
import './App.css';

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('appraised_value', { ascending: false });

      if (error) throw error;

      setProperties(data || []);
      setFilteredProperties(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TCAD Property Analytics</h1>
        <p>Explore, analyze, and filter property tax data from Travis Central Appraisal District</p>
      </header>

      {error && (
        <div className="error-banner">
          <span>Error: {error}</span>
          <button onClick={fetchProperties}>Retry</button>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading property data...</p>
        </div>
      ) : (
        <>
          <Analytics properties={filteredProperties} />
          <Charts properties={filteredProperties} />
          <Filters
            properties={properties}
            onFilterChange={setFilteredProperties}
          />
          <PropertyTable properties={filteredProperties} />
        </>
      )}
    </div>
  );
}

export default App;
