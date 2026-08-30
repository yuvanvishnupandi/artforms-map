import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { categories, traditions } from '../data';

export default function Glossary({ isOpen, onClose, openWiki }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="glossary-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="glossary-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            aria-hidden={!isOpen}
          >
            <div className="glossary-head">
              <div>
                <p className="kicker">Historical Archive / 01</p>
                <h1>Art forms<br /><em>in context.</em></h1>
              </div>
              <button className="close-button" onClick={onClose} aria-label="Close glossary">
                <X size={24} />
              </button>
            </div>
            <p className="glossary-intro">
              A quick guide to the practices on this map, and the communities that carry them forward.
            </p>
            <div className="glossary-content">
              {Object.entries(categories).map(([key, category]) => {
                const entries = traditions.filter((t) => t.category === key);
                return (
                  <section key={key} className="glossary-category" style={{ "--category-color": category.color }}>
                    <h2><span className="category-dot"></span>{category.label}</h2>
                    <p className="category-definition">{category.definition}</p>
                    {entries.map((tradition) => (
                      <div key={tradition.name} className="glossary-item" onClick={() => { openWiki(tradition); onClose(); }} style={{ cursor: 'pointer' }}>
                        <h3 className="glossary-item-title">{tradition.displayName || tradition.name}</h3>
                        <p>{tradition.region} · {tradition.summary.split(".")[0]}.</p>
                        <span className="read-more-inline">Read full record ➔</span>
                      </div>
                    ))}
                  </section>
                );
              })}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
