import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader2 } from 'lucide-react';
import { categories } from '../data';

export default function WikiModal({ tradition, onClose }) {
  const [wikiImage, setWikiImage] = useState(null);
  const [wikiLink, setWikiLink] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tradition) return;
    
    setLoading(true);
    setWikiImage(null);
    setWikiLink(`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(tradition.name)}`); // Default link

    const fetchWiki = async () => {
      try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(tradition.name)}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.original && data.original.source) {
            setWikiImage(data.original.source);
          } else if (data.thumbnail && data.thumbnail.source) {
            setWikiImage(data.thumbnail.source);
          } else {
            throw new Error("No image found on page");
          }
          if (data.content_urls && data.content_urls.desktop) {
            setWikiLink(data.content_urls.desktop.page);
          }
        } else {
          throw new Error("Page not found");
        }
      } catch (err) {
        // Safe, hardcoded fallbacks for missing/404 Wikipedia pages to prevent wrong images
        const fallbackImages = {
          "Gond art": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Gond_Painting_of_MP1.JPG/800px-Gond_Painting_of_MP1.JPG",
          "Phad painting": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Phad_painting_of_Pabuji.jpg/800px-Phad_painting_of_Pabuji.jpg"
        };
        const fallbackLinks = {
          "Gond art": "https://en.wikipedia.org/wiki/Indian_painting#Gond_painting",
          "Phad painting": "https://en.wikipedia.org/wiki/Phad_painting"
        };
        
        setWikiImage(fallbackImages[tradition.name] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/800px-Taj_Mahal_%28Edited%29.jpeg');
        if (fallbackLinks[tradition.name]) {
           setWikiLink(fallbackLinks[tradition.name]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWiki();
  }, [tradition]);

  if (!tradition) return null;

  const category = categories[tradition.category];

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="wiki-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      
      <div className="wiki-wrapper">
        <motion.div
          className="wiki-modal"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wiki-title"
        >
          
          {/* Left Panel: Full Bleed Image */}
          <div className="wiki-image-panel">
             {loading ? (
                <div className="wiki-image-loading">
                  <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  Retrieving Archive...
                </div>
              ) : (
                <motion.img 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={wikiImage} 
                  alt={tradition.name} 
                />
              )}
          </div>

          {/* Right Panel: Content */}
          <div className="wiki-content-panel">
            <div className="wiki-content-inner">
              <button className="wiki-close" onClick={onClose} aria-label="Close details">
                <X size={24} />
              </button>

              <motion.header className="wiki-header" variants={itemVariants}>
                <p className="wiki-category" style={{ color: category.color }}>
                   {category.label}
                </p>
                <h1 id="wiki-title" className="wiki-title">{tradition.displayName || tradition.name}</h1>
                <p className="wiki-region">Origin: {tradition.region}</p>
              </motion.header>

              <motion.div className="wiki-body" variants={itemVariants}>
                <p>{tradition.summary}</p>
                <p>
                  This traditional practice is a cornerstone of the {tradition.region} cultural identity. It is kept alive by generations of artisans who pass down the intricate knowledge required for its preservation. The {category.label.toLowerCase()} techniques employed demonstrate a profound understanding of local materials and historical storytelling.
                </p>
              </motion.div>
            </div>

            {/* Sticky Footer for the Link */}
            <motion.div className="wiki-footer" variants={itemVariants}>
              <a href={wikiLink} target="_blank" rel="noopener noreferrer" className="wiki-external-link">
                View Full Wikipedia Article <ExternalLink size={20} />
              </a>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
