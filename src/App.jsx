import React, { useState, useMemo } from 'react';
import { Layers } from 'lucide-react';
import { traditions, categories } from './data';
import FilterBar from './components/FilterBar';
import MapStage from './components/MapStage';
import Glossary from './components/Glossary';
import WikiModal from './components/WikiModal';

export default function App() {
  const [activeCategories, setActiveCategories] = useState(new Set(Object.keys(categories)));
  const [searchQuery, setSearchQuery] = useState("");
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [activeTradition, setActiveTradition] = useState(null);
  const [wikiTradition, setWikiTradition] = useState(null);

  const matchingTraditions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return traditions.filter((tradition) => {
      const matchesSearch = !query || `${tradition.name} ${tradition.region} ${categories[tradition.category].label}`.toLowerCase().includes(query);
      const matchesCategory = activeCategories.has(tradition.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategories]);

  const toggleCategory = (key) => {
    const newCats = new Set(activeCategories);
    if (newCats.has(key)) {
      newCats.delete(key);
    } else {
      newCats.add(key);
    }
    setActiveCategories(newCats);
  };

  const handleRandom = () => {
    const pool = matchingTraditions.length > 0 ? matchingTraditions : traditions;
    const randomTradition = pool[Math.floor(Math.random() * pool.length)];
    
    setActiveCategories((prev) => new Set(prev).add(randomTradition.category));
    setActiveTradition(randomTradition);
  };

  const handleClear = () => {
    setSearchQuery("");
    setActiveCategories(new Set(Object.keys(categories)));
    setActiveTradition(null); // Triggers map zoom out in MapStage
  };

  const openWiki = (tradition) => {
    setWikiTradition(tradition);
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <a className="brand" href="/" aria-label="Interactive Art Map by Yuvan Vishnu Pandi">
          <span className="brand-icon">✦</span>
          <span>
            Interactive Art Map 
            <span style={{ fontSize: '0.65em', opacity: 0.75, marginLeft: '0.5rem', fontWeight: 400 }}>
              by Yuvan Vishnu Pandi
            </span>
          </span>
        </a>
        <button 
          className="outline-button" 
          type="button" 
          aria-expanded={isGlossaryOpen} 
          onClick={() => setIsGlossaryOpen(true)}
        >
          <Layers size={18} /> Exhibition Guide
        </button>
      </header>

      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategories={activeCategories}
        toggleCategory={toggleCategory}
        matchCount={matchingTraditions.length}
        totalCount={traditions.length}
        onRandom={handleRandom}
        onClear={handleClear}
      />

      <MapStage 
        traditions={matchingTraditions} 
        activeTradition={activeTradition}
        onPopupClose={() => setActiveTradition(null)}
        openWiki={openWiki}
      />

      <Glossary 
        isOpen={isGlossaryOpen} 
        onClose={() => setIsGlossaryOpen(false)} 
        openWiki={openWiki}
      />

      {wikiTradition && (
        <WikiModal 
          tradition={wikiTradition} 
          onClose={() => setWikiTradition(null)} 
        />
      )}
    </div>
  );
}
