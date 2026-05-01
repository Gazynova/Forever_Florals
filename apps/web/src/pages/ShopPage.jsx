import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast, useProducts } from '@/hooks/use-toast';

// ─── Sub-views ────────────────────────────────────────────────────────────────

function ShopView({ onSelectProduct, products, categories, loading, error, refetch }) {
  const [activeCategory, setActiveCategory] = useState('All Collections');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

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
    <main className="flex-grow pt-32 pb-24">
      {/* Header */}
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

        {/* Filters */}
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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground text-sm tracking-wide">
              Loading our collection…
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <AlertCircle className="w-10 h-10 text-destructive" />
            <p className="text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              onClick={refetch}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
          >
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
                    onViewDetails={() => onSelectProduct(product.id)}
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
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </main>
  );
}

function ProductDetailView({ productId, onBack, onSelectProduct, products, loading }) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === productId) || null;

  const relatedProducts = products.filter((p) => p.id !== productId).slice(0, 3);

  const handleAddToCart = () => {
    if (!product) return;
    toast({
      title: 'Added to Cart',
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  // Loading state while products are fetched
  if (loading || !product) {
    return (
      <main className="bg-background pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm tracking-wide">
            Loading product details…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background">
      {/* Back Button */}
      <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col gap-4">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg bg-surface-container">
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images?.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {product.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="aspect-square overflow-hidden rounded-lg shadow-sm bg-surface-container cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase">
                  {product.category}
                </p>
                <h1 className="text-5xl font-serif font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl font-serif text-primary mb-4">
                  ₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Stock badge */}
                {product.stockStatus && (
                  <span
                    className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest ${
                      product.stockStatus === 'in_stock'
                        ? 'bg-green-100 text-green-700'
                        : product.stockStatus === 'pre_order'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {product.stockStatus === 'in_stock'
                      ? 'In Stock'
                      : product.stockStatus === 'pre_order'
                      ? 'Pre-Order'
                      : 'Out of Stock'}
                  </span>
                )}
              </div>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="text-primary mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Care Instructions */}
              {product.careInstructions && (
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                    Care Instructions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.careInstructions}
                  </p>
                </div>
              )}

              {/* Extra Details from Sheet */}
              {(product.dimensions || product.weightGrams || product.madeIn) && (
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                    Product Details
                  </h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    {product.dimensions && (
                      <li><span className="font-medium text-foreground">Dimensions:</span> {product.dimensions}</li>
                    )}
                    {product.weightGrams > 0 && (
                      <li><span className="font-medium text-foreground">Weight:</span> {product.weightGrams}g</li>
                    )}
                    {product.madeIn && (
                      <li><span className="font-medium text-foreground">Made In:</span> {product.madeIn}</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Add to Cart */}
              <div className="border-t border-border pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-foreground font-medium">Quantity:</span>
                  <div className="flex items-center gap-3 bg-surface-container rounded-lg p-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-12 text-center bg-transparent border-none text-foreground font-medium"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stockStatus === 'out_of_stock'}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stockStatus === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      {product.fullDescription && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-container/30 border-y border-border">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                About This Product
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.fullDescription}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each piece is uniquely crafted with attention to detail, ensuring
                that you receive not just a product, but a work of art that will
                bring lasting beauty to your space.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                You Might Also Like
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    onSelectProduct(related.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg mb-4 bg-surface-container">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-lg font-serif text-primary">
                    ₹{typeof related.price === 'number' ? related.price.toFixed(2) : related.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// ─── Main merged component ────────────────────────────────────────────────────

function ShopPage() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  // ✅ Fetch products from Google Sheet via useProducts hook
  const { products, categories, loading, error, refetch } = useProducts();

  const pageTitle = selectedProductId
    ? `${products.find((p) => p.id === selectedProductId)?.name ?? 'Product'} - FOREVER FLORALS`
    : 'Shop All - FOREVER FLORALS';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <Header />

      <AnimatePresence mode="wait">
        {selectedProductId ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductDetailView
              productId={selectedProductId}
              products={products}
              loading={loading}
              onSelectProduct={(id) => {
                setSelectedProductId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBack={() => {
                setSelectedProductId(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-grow"
          >
            <ShopView
              products={products}
              categories={categories}
              loading={loading}
              error={error}
              refetch={refetch}
              onSelectProduct={(id) => {
                setSelectedProductId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default ShopPage;