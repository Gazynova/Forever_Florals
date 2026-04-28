import React from 'react';
import { motion } from 'framer-motion';

function ProductCard({ image, name, description, price, category, onViewDetails }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group flex flex-col items-center text-center"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/5] bg-surface-container-low mb-6 overflow-hidden">
        
        {/* Image */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* CATEGORY BADGE */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full backdrop-blur-md tracking-wide">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <h3 className="font-serif text-xl text-primary mb-2">
        {name}
      </h3>

      <p className="text-sm text-muted-foreground mb-3 max-w-xs">
        {description}
      </p>

      <span className="text-base font-medium tracking-widest text-foreground mb-4">
        ₹{price}
      </span>

      {/* ✨ VIEW DETAILS (LUXURY STYLE) */}
      <button
        onClick={onViewDetails}
        className="mt-2 opacity-0 group-hover:opacity-100 
                   translate-y-2 group-hover:translate-y-0
                   transition-all duration-500 
                   border-b border-primary text-primary 
                   text-sm uppercase tracking-widest pb-1"
      >
        View Details
      </button>
    </motion.div>
  );
}

export default ProductCard;