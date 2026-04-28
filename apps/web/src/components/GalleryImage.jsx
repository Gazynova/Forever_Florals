
import React from 'react';
import { motion } from 'framer-motion';

function GalleryImage({ image, caption }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative overflow-hidden radius-organic cursor-pointer shadow-botanical-md hover:shadow-botanical-lg transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-surface-container">
        <img
          src={image}
          alt={caption || 'Gallery image'}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-primary-botanical/0 group-hover:bg-primary-botanical/20 transition-colors duration-500 mix-blend-multiply" />
      </div>
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-white text-base font-medium font-sans-botanical">{caption}</p>
        </div>
      )}
    </motion.div>
  );
}

export default GalleryImage;
