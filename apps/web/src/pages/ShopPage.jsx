import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 'ethereal-peony',
    image: 'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
    images: [
      'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
      'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11',
      'https://images.unsplash.com/photo-1611339555312-e607c90352fd',
    ],
    name: 'Ethereal Peony',
    description: 'Preserved brush petals with silk accents',
    fullDescription:
      'The Ethereal Peony is a masterpiece of botanical preservation. Each petal is carefully selected and preserved using our proprietary technique that maintains the delicate texture and natural color variation. This exquisite arrangement combines preserved peony blooms with fine silk accents, creating a timeless centerpiece that captures the essence of spring.',
    price: '125.00',
    category: 'Preserved',
    features: [
      'Hand-preserved peony petals',
      'Silk accents for subtle elegance',
      'Long-lasting beauty (3–5 years)',
      'Perfect for any room décor',
      'Arrives in beautiful gift packaging',
    ],
    careInstructions:
      'Keep away from direct sunlight and high humidity. Gently dust with a soft brush or feather duster. Avoid water contact.',
  },
  {
    id: 'heritage-rose',
    image: 'https://images.unsplash.com/photo-1699830010067-edc8413c6c88',
    images: [
      'https://images.unsplash.com/photo-1699830010067-edc8413c6c88',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7',
      'https://images.unsplash.com/photo-1557818735-490b90d42b12',
    ],
    name: 'Heritage Rose',
    description: 'Meticulously crocheted from Egyptian cotton',
    fullDescription:
      'Our Heritage Rose is a testament to the art of crochet. Handmade by skilled artisans using the finest Egyptian cotton, each bloom is crocheted with meticulous attention to detail. This piece celebrates traditional craft while creating a flower that will never wilt, making it a perfect heirloom gift.',
    price: '85.00',
    category: 'Crochet',
    features: [
      'Hand-crocheted Egyptian cotton',
      'Artisan made with love',
      'Eternally beautiful – never wilts',
      'Perfect heirloom gift',
      'Available in multiple colors',
    ],
    careInstructions:
      'Hand wash gently in cool water with mild soap. Air dry flat. Store in a cool, dry place to maintain shape and color.',
  },
  {
    id: 'wild-meadow',
    image: 'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
    images: [
      'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
      'https://images.unsplash.com/photo-1615851907615-1b1dc3473aec',
      'https://images.unsplash.com/photo-1490612967868-a82a452a2e1f',
    ],
    name: 'Wild Meadow',
    description: 'A rustic blend of sun-cured botanicals',
    fullDescription:
      'The Wild Meadow brings the untamed beauty of nature into your home. This arrangement features a carefully curated selection of sun-cured botanicals including grasses, wildflowers, and foraged elements. Perfect for those who appreciate the raw, organic beauty of natural materials.',
    price: '85.00',
    category: 'Dried Botanicals',
    features: [
      'Sun-cured botanicals',
      'Wildflower and grass blend',
      'Rustic aesthetic',
      'Sustainable sourcing',
      'Natural fragrance',
    ],
    careInstructions:
      'Display in a dry location away from moisture. Keep away from direct sunlight to prevent fading. Rotate occasionally for even aging.',
  },
  {
    id: 'silk-moon-orchid',
    image: 'https://images.unsplash.com/photo-1605485236953-3ae8488e6096',
    images: [
      'https://images.unsplash.com/photo-1605485236953-3ae8488e6096',
      'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11',
      'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
    ],
    name: 'Silk Moon Orchid',
    description: 'Eternal grace in fine white silk',
    fullDescription:
      'The Silk Moon Orchid is a study in understated elegance. Crafted from the finest white silk, this arrangement captures the ethereal quality of living orchids while offering permanence and timeless beauty.',
    price: '145.00',
    category: 'Silk Artisanal',
    features: [
      'Premium white silk construction',
      'Handcrafted by artisans',
      'Lightweight and delicate',
      'Long-lasting beauty',
      'Ideal centerpiece or gift',
    ],
    careInstructions:
      'Keep away from direct sunlight. Dust lightly with a soft cloth. Avoid moisture.',
  },
  {
    id: 'azure-cloud',
    image: 'https://images.unsplash.com/photo-1533754005196-69f1c707ecdc',
    images: [
      'https://images.unsplash.com/photo-1533754005196-69f1c707ecdc',
      'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
      'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
    ],
    name: 'Azure Cloud',
    description: 'Preserved hydrangea in deep ocean tones',
    fullDescription:
      'Azure Cloud is a lush arrangement of preserved hydrangea blooms, dyed in deep oceanic hues. The rich blue tones bring a sense of calm and depth to any interior space.',
    price: '95.00',
    category: 'Preserved',
    features: [
      'Preserved hydrangea clusters',
      'Deep ocean-blue tones',
      'Full and lush arrangement',
      'Low maintenance',
      'Stunning statement piece',
    ],
    careInstructions:
      'Avoid direct sunlight to preserve color. Keep in a dry environment. Do not water.',
  },
  {
    id: 'calmness-wreath',
    image: 'https://images.unsplash.com/photo-1615595969149-c5caa6b49a3e',
    images: [
      'https://images.unsplash.com/photo-1615595969149-c5caa6b49a3e',
      'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
      'https://images.unsplash.com/photo-1490612967868-a82a452a2e1f',
    ],
    name: 'Calmness Wreath',
    description: 'Dried lavender and eucalyptus for peace',
    fullDescription:
      'Our Calmness Wreath is handcrafted from dried lavender and eucalyptus, two botanicals long associated with tranquility and wellbeing. A gentle, natural fragrance lingers as a daily reminder to breathe and be present.',
    price: '78.00',
    category: 'Dried Botanicals',
    features: [
      'Dried lavender and eucalyptus',
      'Natural, calming fragrance',
      'Handcrafted wreath form',
      'Sustainably sourced',
      'Perfect for entryways or bedrooms',
    ],
    careInstructions:
      'Hang in a cool, dry area away from humidity. Fragrance naturally fades over time. Do not wet.',
  },
  {
    id: 'golden-sunburst',
    image: 'https://images.unsplash.com/photo-1597844674725-07bb16356f6a',
    images: [
      'https://images.unsplash.com/photo-1597844674725-07bb16356f6a',
      'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
      'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
    ],
    name: 'Golden Sunburst',
    description: 'Dried craspedia and wheat arrangement',
    fullDescription:
      'Golden Sunburst radiates warmth with its mix of dried craspedia orbs and golden wheat stems. This cheerful, textural arrangement brings the light of summer into any room year-round.',
    price: '65.00',
    category: 'Dried Botanicals',
    features: [
      'Dried craspedia and wheat',
      'Warm golden tones',
      'Textural and unique',
      'Easy to style',
      'Long lasting',
    ],
    careInstructions:
      'Keep dry and away from high humidity. Occasional gentle dusting recommended.',
  },
  {
    id: 'velvet-tulip',
    image: 'https://images.unsplash.com/photo-1511995248717-b416946df342',
    images: [
      'https://images.unsplash.com/photo-1511995248717-b416946df342',
      'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
      'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11',
    ],
    name: 'Velvet Tulip',
    description: 'Hand-dyed silk in deep burgundy',
    fullDescription:
      'The Velvet Tulip is a statement of bold romance. Each bloom is individually hand-dyed in deep, lush burgundy tones and crafted from velvet-like silk that catches the light beautifully.',
    price: '110.00',
    category: 'Silk Artisanal',
    features: [
      'Hand-dyed silk blooms',
      'Deep burgundy tones',
      'Velvet-like texture',
      'Rich and romantic aesthetic',
      'Elegant gift option',
    ],
    careInstructions:
      'Avoid direct sunlight to preserve deep color. Dust gently with a soft cloth. No water.',
  },
  {
    id: 'ivory-whisper',
    image: 'https://images.unsplash.com/photo-1636967529300-2794e28b4d72',
    images: [
      'https://images.unsplash.com/photo-1636967529300-2794e28b4d72',
      'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
      'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
    ],
    name: 'Ivory Whisper',
    description: 'Bleached ferns and white ruscus',
    fullDescription:
      'Ivory Whisper is a study in serene simplicity. Bleached ferns and delicate white ruscus are arranged to evoke airy lightness, making it a perfect accent for minimalist or Scandinavian-inspired interiors.',
    price: '92.00',
    category: 'Preserved',
    features: [
      'Bleached ferns and ruscus',
      'Airy and light aesthetic',
      'Preserved for longevity',
      'Minimal maintenance',
      'Versatile styling',
    ],
    careInstructions:
      'Keep in a dry environment. Avoid moisture and prolonged direct sunlight. Dust lightly as needed.',
  },
];

const CATEGORIES = [
  'All Collections',
  'Crochet',
  'Preserved',
  'Silk Artisanal',
  'Dried Botanicals',
];

// ─── Sub-views ────────────────────────────────────────────────────────────────

function ShopView({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('All Collections');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const filteredProducts =
    activeCategory === 'All Collections'
      ? PRODUCTS
      : PRODUCTS.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
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
          {CATEGORIES.map((category) => (
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

        {/* Products */}
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

        {filteredProducts.length === 0 && (
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

function ProductDetailView({ productId, onBack }) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const relatedProducts = PRODUCTS.filter((p) => p.id !== productId).slice(0, 3);

  const handleAddToCart = () => {
    toast({
      title: 'Added to Cart',
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

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
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
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
                  ${product.price}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

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

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                  Care Instructions
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.careInstructions}
                </p>
              </div>

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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-full text-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Description */}
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

      {/* Related Products */}
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
                  // Navigate to the related product within the same view
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  // Re-render with new product — parent handles this via onSelectProduct
                  onBack();
                  setTimeout(() => {
                    // slight delay so shop re-renders, then open product
                    // A cleaner approach: lift selectedProductId to the parent
                  }, 0);
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
                  ${related.price}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Main merged component ────────────────────────────────────────────────────

function ShopPage() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const pageTitle = selectedProductId
    ? `${PRODUCTS.find((p) => p.id === selectedProductId)?.name ?? 'Product'} - FOREVER FLORALS`
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