import React from 'react';
import { Search, Compass } from 'lucide-react';
import { categories } from '../data';

export default function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  activeCategories, 
  toggleCategory, 
  matchCount, 
  totalCount,
  onRandom,
  onClear
}) {
  return (
    <section className="filter-bar" aria-label="Art category filters">
      <div className="category-pills">
        {Object.entries(categories).map(([key, category]) => {
          const isActive = activeCategories.has(key);
          return (
            <button
              key={key}
              className={`category-pill ${isActive ? "active" : ""}`}
              style={{ "--category-color": category.color }}
              onClick={() => toggleCategory(key)}
              type="button"
              aria-pressed={isActive}
            >
              <span className="category-dot"></span>
              {category.label}
            </button>
          );
        })}
      </div>
      <div className="search-shell">
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input
          type="search"
          className="search-input"
          placeholder="Search forms or places"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search forms or places"
        />
        <span className="result-count">{matchCount} / {totalCount} forms</span>
      </div>
      <div className="text-actions">
        <button type="button" onClick={onRandom} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Show me something <Compass size={16} />
        </button>
        <button type="button" onClick={onClear}>Clear all</button>
      </div>
    </section>
  );
}
