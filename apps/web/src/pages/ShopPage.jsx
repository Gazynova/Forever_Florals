import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast, useProducts } from '@/hooks/use-toast';

function ShopPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Collections');
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const { products, categories, loading, error, refetch } = useProducts();

  const filteredProducts =
    activeCategory === 'All Collections'
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: 'Welcome to our Garden Circle',
      description: 'Thank you for subscribing.',
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Shop All – FOREVER FLORALS</title>
        <meta name="description" content="Discover our collection of eternal blooms." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {/* Heading */}
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

          {/* Category Filters */}
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

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground text-sm tracking-wide">
                Loading our collection…
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
              <p className="text-muted-foreground">{error}</p>
              <Button variant="outline" onClick={refetch} className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
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
                      onViewDetails={() => navigate(`/shop/${product.id}`)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <p className="text-center mt-10 text-muted-foreground">
              No products found in this category.
            </p>
          )}
        </section>

        {/* Newsletter */}
        <section className="mt-32 bg-secondary/30 py-24 border-y border-border text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-serif italic mb-6">Botanical Heritage</h2>
            <p className="italic text-muted-foreground mb-10">
              "We believe in the quiet beauty of permanence."
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Join our garden circle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ShopPage;