
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LeafAccent from './LeafAccent';

function CategoryCard({ image, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative bg-surface-container radius-organic overflow-hidden cursor-pointer h-full shadow-botanical-md hover:shadow-botanical-lg flex flex-col"
    >
      <LeafAccent size="md" position="bottom-right" opacity={0.1} className="group-hover:opacity-20 transition-opacity z-0" />
      
      <div className="aspect-[4/3] overflow-hidden p-4 pb-0 z-10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover radius-organic transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 z-10 flex flex-col flex-grow">
        <h3 className="font-serif-botanical text-2xl font-semibold mb-3 text-on-surface group-hover:text-primary-botanical transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-base font-sans-botanical text-on-surface/80 mb-6 leading-relaxed flex-grow">
            {description}
          </p>
        )}
        <div className="flex items-center gap-2 text-sm font-bold font-sans-botanical text-primary-botanical uppercase tracking-wider group-hover:gap-4 transition-all mt-auto">
          <span>Explore</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
}

export default CategoryCard;
