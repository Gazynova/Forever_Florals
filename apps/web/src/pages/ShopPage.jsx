import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

function ShopPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Collections');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // ✅ Categories
  const categories = [
    'All Collections',
    'Crochet',
    'Preserved',
    'Silk Artisanal',
    'Dried Botanicals'
  ];

  // ✅ Products with category added
  const products = [
    {
      id: 'ethereal-peony',
      image: 'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
      name: 'Ethereal Peony',
      description: 'Preserved brush petals with silk accents',
      price: '125.00',
      category: 'Preserved'
    },
    {
      id: 'heritage-rose',
      image: 'https://images.unsplash.com/photo-1699830010067-edc8413c6c88',
      name: 'Heritage Rose',
      description: 'Meticulously crocheted from Egyptian cotton',
      price: '85.00',
      category: 'Crochet'
    },
    {
      id: 'wild-meadow',
      image: 'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
      name: 'Wild Meadow',
      description: 'A rustic blend of sun-cured botanicals',
      price: '85.00',
      category: 'Dried Botanicals'
    },
    {
      id: 'silk-moon-orchid',
      image: 'https://images.unsplash.com/photo-1605485236953-3ae8488e6096',
      name: 'Silk Moon Orchid',
      description: 'Eternal grace in fine white silk',
      price: '145.00',
      category: 'Silk Artisanal'
    },
    {
      id: 'azure-cloud',
      image: 'https://images.unsplash.com/photo-1533754005196-69f1c707ecdc',
      name: 'Azure Cloud',
      description: 'Preserved hydrangea in deep ocean tones',
      price: '95.00',
      category: 'Preserved'
    },
    {
      id: 'calmness-wreath',
      image: 'https://images.unsplash.com/photo-1615595969149-c5caa6b49a3e',
      name: 'Calmness Wreath',
      description: 'Dried lavender and eucalyptus for peace',
      price: '78.00',
      category: 'Dried Botanicals'
    },
    {
      id: 'golden-sunburst',
      image: 'https://images.unsplash.com/photo-1597844674725-07bb16356f6a',
      name: 'Golden Sunburst',
      description: 'Dried craspedia and wheat arrangement',
      price: '65.00',
      category: 'Dried Botanicals'
    },
    {
      id: 'velvet-tulip',
      image: 'https://images.unsplash.com/photo-1511995248717-b416946df342',
      name: 'Velvet Tulip',
      description: 'Hand-dyed silk in deep burgundy',
      price: '110.00',
      category: 'Silk Artisanal'
    },
    {
      id: 'ivory-whisper',
      image: 'https://images.unsplash.com/photo-1636967529300-2794e28b4d72',
      name: 'Ivory Whisper',
      description: 'Bleached ferns and white ruscus',
      price: '92.00',
      category: 'Preserved'
    }
  ];

  // ✅ Filter logic
  const filteredProducts =
    activeCategory === 'All Collections'
      ? products
      : products.filter(
          (p) =>
            p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  // ✅ Newsletter
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Welcome to our Garden Circle",
      description: "Thank you for subscribing.",
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Shop All - FOREVER FLORALS</title>
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">

        {/* HEADER */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-foreground mb-6"
            >
              Shop All
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Discover our collection of eternal blooms.
            </motion.p>
          </div>

          {/* FILTERS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'border border-border text-muted-foreground hover:bg-surface-container'
              }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* PRODUCTS */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard
                    {...product}
                    onViewDetails={() =>
                      navigate(`/product/${product.id}`)
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <p className="text-center mt-10 text-muted-foreground">
              No products found in this category.
            </p>
          )}
        </section>

        {/* NEWSLETTER */}
        <section className="mt-32 bg-secondary/30 py-24 border-y border-border text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-serif italic mb-6">
              Botanical Heritage
            </h2>
            <p className="italic text-muted-foreground mb-10">
              "We believe in the quiet beauty of permanence."
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input
                type="email"
                placeholder="Join our garden circle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default ShopPage;