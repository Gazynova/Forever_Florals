import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { useToast, useProducts } from '@/hooks/use-toast';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { products, loading } = useProducts();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id) || null;
  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 3);

  const handleAddToCart = () => {
    if (!product) return;
    toast({
      title: 'Added to Cart',
      description: `${quantity}× ${product.name} added to your cart.`,
    });
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground text-sm tracking-wide">
              Loading product details…
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Not Found ─────────────────────────────────────────────────────────────
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center flex-col gap-6 px-4 text-center">
          <h2 className="text-3xl font-serif text-foreground">Product Not Found</h2>
          <p className="text-muted-foreground">
            We couldn't find the product you're looking for.
          </p>
          <Button asChild className="rounded-full px-8">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{product.name} – FOREVER FLORALS</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Header />

      <main className="flex-grow">
        {/* ── Back Button ───────────────────────────────────────────────── */}
        <section className="pt-32 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </button>
          </div>
        </section>

        {/* ── Product Hero ──────────────────────────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                {/* Main image */}
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg bg-surface-container">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square overflow-hidden rounded-lg bg-surface-container transition-all ${
                          selectedImage === idx
                            ? 'ring-2 ring-primary'
                            : 'hover:ring-2 hover:ring-primary/40'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                <div>
                  {product.category && (
                    <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
                      {product.category}
                    </p>
                  )}
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-serif text-primary mb-4">
                    ₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  {/* Badge + Stock */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.badge && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 uppercase tracking-widest">
                        {product.badge}
                      </span>
                    )}
                    {product.stockStatus && (
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest ${
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
                </div>

                {/* Features */}
                {product.features?.length > 0 && (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
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

                {/* Product Details */}
                {(product.dimensions || product.weightGrams || product.madeIn) && (
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                      Product Details
                    </h3>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      {product.dimensions && (
                        <li>
                          <span className="font-medium text-foreground">Dimensions:</span>{' '}
                          {product.dimensions}
                        </li>
                      )}
                      {product.weightGrams > 0 && (
                        <li>
                          <span className="font-medium text-foreground">Weight:</span>{' '}
                          {product.weightGrams}g
                        </li>
                      )}
                      {product.madeIn && (
                        <li>
                          <span className="font-medium text-foreground">Made In:</span>{' '}
                          {product.madeIn}
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Quantity + Add to Cart */}
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

        {/* ── Full Description ──────────────────────────────────────────── */}
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
                  Each piece is uniquely crafted with attention to detail, ensuring that you
                  receive not just a product, but a work of art that will bring lasting beauty
                  to your space.
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── Related Products ──────────────────────────────────────────── */}
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
                      navigate(`/shop/${related.id}`);
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

      <Footer />
    </div>
  );
}

export default ProductDetailPage;