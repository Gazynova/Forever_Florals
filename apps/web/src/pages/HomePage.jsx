import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Award, Infinity as InfinityIcon, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/use-toast";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";

// ─── Product Card ────────────────────────────────────────────────────────────
function ProductCard({ item, idx, badgeColor, cardBg = "bg-background" }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      className={`flex flex-col ${cardBg} rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-shadow duration-300 group relative`}
    >
      {/* Badge */}
      {item.badge && (
        <span
          className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${badgeColor}`}
        >
          {item.badge}
        </span>
      )}

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-grow">
        {item.category && (
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            {item.category}
          </p>
        )}
        <h3 className="text-xl font-serif mb-2 text-foreground flex-grow">
          {item.name}
        </h3>
        {/* {item.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {item.description}
          </p>
        )}
        <p className="text-primary font-semibold mb-6">
          ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
        </p> */}
        <Button
          asChild
          className="w-full bg-primary hover:bg-[#3d4a2f] text-primary-foreground rounded-full transition-colors mt-auto"
        >
          <Link to={`/shop/${item.id}`}>View Product</Link>
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Product Row Section ─────────────────────────────────────────────────────
function ProductSection({
  title,
  subtitle,
  icon: Icon,
  items,
  loading,
  badgeColor,
  sectionBg = "bg-card",
  cardBg = "bg-background",
  linkLabel = "View All →",
}) {
  return (
    <section className={`py-24 ${sectionBg}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4 border-b border-border pb-6">
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-1 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h2 className="text-foreground mb-2">{title}</h2>
              {subtitle && (
                <p className="text-muted-foreground text-lg">{subtitle}</p>
              )}
            </div>
          </div>
          <Link
            to="/shop"
            className="text-primary font-bold uppercase tracking-wider text-sm hover:underline whitespace-nowrap"
          >
            {linkLabel}
          </Link>
        </div>

        {loading ? (
          /* Skeleton placeholders */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-muted animate-pulse"
              >
                <div className="aspect-square bg-muted-foreground/10" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted-foreground/10 rounded w-3/4" />
                  <div className="h-4 bg-muted-foreground/10 rounded w-1/2" />
                  <div className="h-10 bg-muted-foreground/10 rounded-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.slice(0, 3).map((item, idx) => (
              <ProductCard
                key={item.id}
                item={item}
                idx={idx}
                badgeColor={badgeColor}
                cardBg={cardBg}
              />
            ))}

            {/* Explore More tile — mirrors the Inspired Spaces style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to="/shop"
                className="flex h-full min-h-[320px] rounded-2xl border border-border bg-surface-container items-center justify-center cursor-pointer group hover:shadow-lg transition-all duration-500"
              >
                <div className="text-center p-6">
                  <p className="text-muted-foreground font-serif text-xl group-hover:text-foreground transition-colors duration-300">
                    Explore More
                  </p>
                  <p className="text-muted-foreground text-xs mt-2 group-hover:text-foreground/70 transition-colors duration-300">
                    ↗ View all products
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── HomePage ────────────────────────────────────────────────────────────────
function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // Fetch all products from Google Sheet once
  const { products, loading, error } = useProducts();

  // Filter by badge
  const bestSellers = products.filter(
    (p) => p.badge?.toLowerCase() === "bestseller"
  );
  const newArrivals = products.filter(
    (p) => p.badge?.toLowerCase() === "new"
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Welcome to our Garden Circle!",
      description: "You've successfully subscribed to our newsletter.",
    });
    setEmail("");
  };

  const categories = [
    {
      name: "Crochet Flowers",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1xl4ksGPDgySSvcoD5VG0XzVmmie9AShsrrtBfaLEhukhqOjpxHcbpmmKTuVkTgXC4HSG6C9iDVjgNSEn3bQhFYmUZi1BKJkZ6CCYwDIxzEfBP3wlFSt3nW0dFntzxp0kQFMBmx-aS6v3YY7h3k-NbgRrpzVGXWP5bLKK-XZ2HYc30leDigyyRw4YSHltSnpPO4QGvhQ9mznHrvhqL9OIicf8Z3kxSkKb77LmXRH47p9mrXGaS9dSZegtUimBbxbsYXPFruVq8l3T",
    },
    {
      name: "Preserved Flowers",
      image: "https://images.unsplash.com/photo-1533754005196-69f1c707ecdc",
    },
    {
      name: "Bouquets",
      image: "https://images.unsplash.com/photo-1605485236953-3ae8488e6096",
    },
    {
      name: "Candles",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKmhmrAjbmF56QVTVTGuSxGsxCNLecxDIMso6rci3SojrF5JjeWtZU76JVBNTUmje6N64dhlK6xaPamLa8LfnZ3yEpXyllb80vzGslAUGDUY-mnLj4W_nqz5RP81x4InrlmkmRCLeRPMHbB9wWhjljXQAb8QAQHi1_EGo1QM6nsNxUOM3HEMPpOUmAPyYRWwKE7Pb7QtZkeaoWwldXAurVZppDkDtRoLKVckW_aoMVD5G306O_qHnKgBD771VfKAPjkHE2sE6NH7Ij",
    },
    {
      name: "Wooden Décor",
      image: "https://images.unsplash.com/photo-1639922587829-7a6dd4bced0b",
    },
    {
      name: "Essential Oils",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1538226289550-d9f542398b1b",
    "https://images.unsplash.com/photo-1657555129526-9e27c7fa54c4",
    "https://images.unsplash.com/photo-1648112569428-53729c7be291",
    "https://images.unsplash.com/photo-1590507046686-ea1ef38bcba5",
  ];

  const features = [
    {
      icon: Leaf,
      title: "Sustainably Sourced",
      desc: "Ethically sourced materials from trusted suppliers",
    },
    {
      icon: Award,
      title: "Artisan Crafted",
      desc: "Handmade with care by skilled artisans",
    },
    {
      icon: InfinityIcon,
      title: "Eternal Beauty",
      desc: "Designed to maintain beauty for years",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FOREVER FLORALS | Timeless Blooms, Forever Beauty</title>
        <meta
          name="description"
          content="Discover handcrafted floral décor designed to stay beautiful beyond seasons."
        />
      </Helmet>

      <Header />

      <main className="flex-grow pt-20">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq35RM37Go6xpLVRlXf6OhA2AXgoeQQHPMnoCg1f-Ll3gRfl8r-X4DZfNKvDHpFKcRWRVH4i1u3ozEYzPHu_S5b7eI5LV20o2yK1fvLHAEdrObcd1BK-bNHrAlLeUfG2dTkcaNjVUWNM6-emHyn5W2B-DbiqGWz0gqQroqKi3fdj1csCSIz0NJiE53FriGBZTdi72XXNFqJVgPobTjXiQBEH1ERZQucHtGTsJbScBMzuYNY0ietE7QV86gxuf7augO99nbZSvSTWwd"
              alt="Luxury preserved flowers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-emerald-900/10 backdrop-brightness-95"></div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif italic text-emerald-900 mb-8"
            >
              Timeless Blooms, Forever Beauty
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <Button
                asChild
                className="bg-primary text-white px-10 py-4 uppercase tracking-widest text-sm transition-all duration-500 hover:opacity-90"
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border border-primary text-primary px-10 py-4 uppercase tracking-widest text-sm transition-all duration-500 hover:bg-primary hover:text-white"
              >
                <Link to="/collections">Explore Collections</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── CATEGORIES GRID ──────────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-foreground">Nature's Artistry Preserved</h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-[300px] sm:auto-rows-[280px] lg:auto-rows-[250px]">
              {categories.map((cat, idx) => {
                const gridClass =
                  idx === 0
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                    : idx === 1
                      ? "sm:col-span-2 lg:col-span-2"
                      : "";

                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className={`group relative rounded-2xl overflow-hidden shadow-soft cursor-pointer bg-card transition-transform duration-500 hover:shadow-soft-hover ${gridClass}`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-white font-serif text-center border-b border-white/50 pb-2 px-4 drop-shadow-md line-clamp-2">
                        {cat.name}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BEST SELLERS (from Google Sheet, badge = "Bestseller") ────── */}
        <ProductSection
          title="Best Sellers"
          subtitle="Loved by our customers, crafted to perfection"
          icon={Award}
          items={bestSellers}
          loading={loading}
          badgeColor="bg-amber-100 text-amber-800"
          sectionBg="bg-background"
          cardBg="bg-card"
          linkLabel="View All →"
        />

        {/* ── NEW ARRIVALS (from Google Sheet, badge = "New") ────────────── */}
        <ProductSection
          title="New Arrivals"
          subtitle="Fresh from our studio — just landed"
          icon={Sparkles}
          items={newArrivals}
          loading={loading}
          badgeColor="bg-emerald-100 text-emerald-800"
          sectionBg="bg-card"
          cardBg="bg-background"
          linkLabel="Shop New →"
        />

        {/* Show sheet fetch error once (shared between both sections) */}
        {error && (
          <p className="text-center text-red-500 py-4 text-sm">
            ⚠️ {error}
          </p>
        )}

        {/* ── CRAFTED TO LAST FOREVER ───────────────────────────────────── */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl overflow-hidden shadow-soft aspect-[4/5] lg:aspect-auto lg:h-[600px]"
              >
                <img
                  src="https://images.unsplash.com/photo-1637386695240-958bc3871a54"
                  alt="Person holding preserved flowers"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
              >
                <h2 className="mb-6 text-foreground">Crafted to Last Forever</h2>
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  At FOREVER FLORALS, we believe beauty shouldn't fade. Each
                  piece is thoughtfully curated or handcrafted to bring
                  long-lasting elegance into your space.
                </p>
                <p className="text-lg text-foreground/80 mb-10 leading-relaxed">
                  From delicate crochet flowers to preserved blooms and natural
                  décor, our creations are made to be cherished for years to
                  come.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-[#3d4a2f] text-primary-foreground rounded-full px-8"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
        <section className="py-20 bg-background border-y border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-serif mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── GALLERY ───────────────────────────────────────────────────── */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-foreground">Inspired Spaces</h2>
              <p className="text-lg text-muted-foreground">
                See how FOREVER FLORALS brings beauty into everyday living
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-[200px] sm:auto-rows-[220px]">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl overflow-hidden bg-card"
                >
                  <img
                    src={src}
                    alt={`Inspired space ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              ))}

              {/* Explore More tile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                onClick={() => navigate("/inspired-spaces")}
                className="rounded-2xl overflow-hidden bg-surface-container flex items-center justify-center cursor-pointer group hover:shadow-lg transition-all duration-500"
              >
                <div className="text-center p-4">
                  <p className="text-muted-foreground font-serif text-lg group-hover:text-foreground transition-colors duration-300">
                    Explore More
                  </p>
                  <p className="text-muted-foreground text-xs mt-2 group-hover:text-foreground/70 transition-colors duration-300">
                    ↗ View all spaces
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ────────────────────────────────────────────────── */}
        <section className="py-24 bg-emerald-900 text-white relative overflow-hidden px-4">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuADvCGAI2Ojem8jBJeRPgs9e-XJn5VN8Q-HsTWgtVdiQsGSGIUA8QK-sglvw4pb6ikPnJAalFjqv-dxqD-frmofSla1yAJilD42RMcsoUuCMvSjhmgG5cWPFiukKniOxJeai6JJizhl1DgjqPdT48MRbFHBHwIM3ghnJgZ4c2jj5mG7Hf7dcrUWuPsab6b9RP3pFFx-QRAtC37wSJ6b5j3lifPwjFZmEu-9G22srtZL3-JY95dbiYTB56xIxsXF2A7yBVa3DAQIWjjr"
              alt="Floral texture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
                Join Our Garden Circle
              </h2>
              <p className="text-lg opacity-80 mb-12">
                Subscribe for early access to limited collections and floral
                care insights.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col md:flex-row gap-6 items-end"
              >
                <div className="flex-grow w-full border-b border-white/30 focus-within:border-white transition-colors text-left">
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="botanical@lover.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent w-full text-white placeholder-white/30 outline-none pb-3"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-emerald-900 px-10 py-4 uppercase tracking-widest text-sm hover:bg-stone-100 transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;