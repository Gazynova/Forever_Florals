import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Sample product data - in a real app, this would come from an API or context
  const products = {
    'ethereal-peony': {
      name: 'Ethereal Peony',
      price: '$125.00',
      image: 'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
      images: [
        'https://images.unsplash.com/photo-1563241527-200ecddbe5fa',
        'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11',
        'https://images.unsplash.com/photo-1611339555312-e607c90352fd'
      ],
      category: 'Preserved',
      description: 'Preserved brush petals with silk accents',
      fullDescription: 'The Ethereal Peony is a masterpiece of botanical preservation. Each petal is carefully selected and preserved using our proprietary technique that maintains the delicate texture and natural color variation. This exquisite arrangement combines preserved peony blooms with fine silk accents, creating a timeless centerpiece that captures the essence of spring.',
      features: [
        'Hand-preserved peony petals',
        'Silk accents for subtle elegance',
        'Long-lasting beauty (3-5 years)',
        'Perfect for any room décor',
        'Arrives in beautiful gift packaging'
      ],
      careInstructions: 'Keep away from direct sunlight and high humidity. Gently dust with a soft brush or feather duster. Avoid water contact.',
    },
    'heritage-rose': {
      name: 'Heritage Rose',
      price: '$85.00',
      image: 'https://images.unsplash.com/photo-1699830010067-edc8413c6c88',
      images: [
        'https://images.unsplash.com/photo-1699830010067-edc8413c6c88',
        'https://images.unsplash.com/photo-1518895949257-7621c3c786d7',
        'https://images.unsplash.com/photo-1557818735-490b90d42b12'
      ],
      category: 'Crochet',
      description: 'Meticulously crocheted from Egyptian cotton',
      fullDescription: 'Our Heritage Rose is a testament to the art of crochet. Handmade by skilled artisans using the finest Egyptian cotton, each bloom is crocheted with meticulous attention to detail. This piece celebrates traditional craft while creating a flower that will never wilt, making it a perfect heirloom gift.',
      features: [
        'Hand-crocheted Egyptian cotton',
        'Artisan made with love',
        'Eternally beautiful - never wilts',
        'Perfect heirloom gift',
        'Available in multiple colors'
      ],
      careInstructions: 'Hand wash gently in cool water with mild soap. Air dry flat. Store in a cool, dry place to maintain shape and color.',
    },
    'wild-meadow': {
      name: 'Wild Meadow',
      price: '$85.00',
      image: 'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
      images: [
        'https://images.unsplash.com/photo-1508759073847-92fa4d334221',
        'https://images.unsplash.com/photo-1615851907615-1b1dc3473aec',
        'https://images.unsplash.com/photo-1490612967868-a82a452a2e1f'
      ],
      category: 'Dried Botanicals',
      description: 'A rustic blend of sun-cured botanicals',
      fullDescription: 'The Wild Meadow brings the untamed beauty of nature into your home. This arrangement features a carefully curated selection of sun-cured botanicals including grasses, wildflowers, and foraged elements. Perfect for those who appreciate the raw, organic beauty of natural materials.',
      features: [
        'Sun-cured botanicals',
        'Wildflower and grass blend',
        'Rustic aesthetic',
        'Sustainable sourcing',
        'Natural fragrance'
      ],
      careInstructions: 'Display in a dry location away from moisture. Keep away from direct sunlight to prevent fading. Rotate occasionally for even aging.',
    },
  };

  const currentProduct = products[productId] || products['ethereal-peony'];

  const relatedProducts = [
    { id: 'heritage-rose', name: 'Heritage Rose', price: '$85.00', image: 'https://images.unsplash.com/photo-1699830010067-edc8413c6c88' },
    { id: 'wild-meadow', name: 'Wild Meadow', price: '$85.00', image: 'https://images.unsplash.com/photo-1508759073847-92fa4d334221' },
    { id: 'ethereal-peony', name: 'Ethereal Peony', price: '$125.00', image: 'https://images.unsplash.com/photo-1563241527-200ecddbe5fa' },
  ];

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${currentProduct.name} added to your cart.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{currentProduct.name} - FOREVER FLORALS</title>
      </Helmet>

      <Header />

      <main className="bg-background">
        {/* Back Button */}
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

        {/* Product Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background relative">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg bg-surface-container">
                    <img
                      src={currentProduct.images[0]}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {currentProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="aspect-square overflow-hidden rounded-lg shadow-sm bg-surface-container cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      >
                        <img
                          src={img}
                          alt={`${currentProduct.name} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase">
                    {currentProduct.category}
                  </p>
                  <h1 className="text-5xl font-serif font-bold text-foreground mb-4">
                    {currentProduct.name}
                  </h1>
                  <p className="text-3xl font-serif text-primary mb-4">
                    {currentProduct.price}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {currentProduct.description}
                  </p>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {currentProduct.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
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
                    {currentProduct.careInstructions}
                  </p>
                </div>

                {/* Add to Cart Section */}
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
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
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
                {currentProduct.fullDescription}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each piece is uniquely crafted with attention to detail, ensuring that you receive not just a product, but a work of art that will bring lasting beauty to your space.
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
              {relatedProducts
                .filter((p) => p.id !== productId)
                .map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg mb-4 bg-surface-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-serif text-primary">
                      {product.price}
                    </p>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ProductDetailsPage;
