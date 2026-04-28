import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";

function InspiredSpacesPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1538226289550-d9f542398b1b",
      alt: "Crochet flowers",
      category: "Crochet",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1657555129526-9e27c7fa54c4",
      alt: "Scented candles",
      category: "Candles",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1648112569428-53729c7be291",
      alt: "Essential oils setup",
      category: "Essential Oils",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1590507046686-ea1ef38bcba5",
      alt: "Sola wood decor",
      category: "Sola Wood Decor",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      alt: "Preserved flowers",
      category: "Preserved Flowers",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1563241527-3004c4f8e17d",
      alt: "Floral bouquet",
      category: "Bouquet",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11",
      alt: "Crochet bouquet",
      category: "Crochet",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1611339555312-e607c90352fd",
      alt: "Luxury candle decor",
      category: "Candles",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1517077304202-827c0db6e5b9",
      alt: "Oil diffuser setup",
      category: "Essential Oils",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1585341328862-c5fbe186eb5b",
      alt: "Sola arrangement",
      category: "Sola Wood Decor",
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1618451614728-4357971dc1ea",
      alt: "Preserved floral centerpiece",
      category: "Preserved Flowers",
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      alt: "Wedding bouquet",
      category: "Bouquet",
    },
  ];

  const categories = [
    "All",
    "Crochet",
    "Candles",
    "Essential Oils",
    "Sola Wood Decor",
    "Preserved Flowers",
    "Bouquet",
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Inspired Spaces - FOREVER FLORALS</title>
        <meta
          name="description"
          content="Explore beautiful spaces curated with FOREVER FLORALS."
        />
      </Helmet>

      <Header />

      <main className="bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
                Inspired Spaces
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover how FOREVER FLORALS transforms everyday spaces into
                moments of timeless beauty. From minimalist elegance to bold
                botanical statements, explore infinite possibilities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-surface-container text-foreground hover:bg-surface-container-mid"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>
        {/* Gallery Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-[4/3] rounded-md overflow-hidden shadow-md cursor-pointer bg-surface-container"
                >
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-end justify-start p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div>
                      {/* Category (lighter) */}
                      <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-widest">
                        {image.category}
                      </p>

                      {/* Product Name with underline */}
                      <h3 className="text-white text-lg font-serif relative inline-block">
                        {image.alt}
                        <span className="block h-[1px] w-0 bg-white mt-1 transition-all duration-500 group-hover:w-full"></span>
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspiration Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-container/50 border-y border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-8">
                Design Your Own Inspired Space
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you're redesigning a single corner or reimagining an
                entire room, FOREVER FLORALS offers the perfect botanical touch.
                Each arrangement is thoughtfully crafted to complement your
                unique style and space.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🌿",
                    title: "Assess Your Space",
                    desc: "Consider lighting, color palette, and room function",
                  },
                  {
                    icon: "🎨",
                    title: "Choose Your Style",
                    desc: "Minimalist, bohemian, modern, vintage, or eclectic",
                  },
                  {
                    icon: "💐",
                    title: "Select Florals",
                    desc: "Pick arrangements that match your aesthetic",
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="p-6 bg-background rounded-xl"
                  >
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh]"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <p className="text-white text-sm font-semibold uppercase tracking-wider mb-2">
                  {selectedImage.category}
                </p>
                <h3 className="text-white text-2xl font-serif">
                  {selectedImage.alt}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Ready to Create Your Inspired Space?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Explore our full collection and find the perfect botanical
                pieces for your home.
              </p>
              <a
                href="/shop"
                className="inline-block px-10 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Shop Collection
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default InspiredSpacesPage;
