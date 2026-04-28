import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import LeafAccent from "@/components/LeafAccent.jsx";

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Our Story - FOREVER FLORALS</title>
      </Helmet>

      <Header />

      <main className="bg-surface">
        {/* Hero Section */}
        <section className="mt-10 py-20 px-4 sm:px-6 lg:px-8 bg-surface relative overflow-hidden">
          <LeafAccent size="lg" position="top-right" opacity={0.05} />
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm font-semibold text-on-surface/60 mb-4">
                  EST. 2026
                </p>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-on-surface mb-4">
                  Crafting Timeless
                </h1>
                <h2 className="text-4xl md:text-5xl font-serif italic text-on-surface/80 mb-8">
                  Growth & Grace
                </h2>
                <p className="text-lg text-on-surface/70 leading-relaxed font-sans-botanical">
                  In the heart of the garden, we found a language that
                  transcends words. Forever Florals was born from a desire to
                  preserve the healing beauty of nature into permanent tokens of
                  affection.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative w-72 md:w-80 aspect-[4/5] rounded-full overflow-hidden shadow-2xl shadow-primary/10">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7bfyHPTLyP7VsHqxIz38O5KTSgXhecnYRTgyFmlJudYbgmwYGgBCkm4hkYztFoNXSJKqXDFTVEfU79qqsf4P3TiqxI0XrJtktWnQDOtLti-QsNHHUUe_DuZJ8wSkwLNhL8AWyHJkDGVtJa9o9-q2asqim2M7XHsx2WY_quGTlO37GNEpQb-7q2vsW-7mibmNRBktdYNMfxnaMAapJEWMknJ5Yn6cT8Qt97E7fsBTNAl6-a-ZJJBE_T0porix-Lt7dOLsDZOoh_WlZ"
                    alt="Peonies"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              {/* Image Layout */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-2 md:order-1"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Left column (staggered) */}
                  <div className="space-y-4 pt-12">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtZ1cR-QVTy937o5C5ikJqMZ_YKoi6eEs-tGgF3Of2vLnMmm2r-vNx-D0kgMyQxkuPoCxuIGW7G9x9-vXM8jUlXcbCaVBjCtDECBweEpUg9VAKprgwGrTvRL5mFBNjEclc6f-9iHFURbxwOB2DcZ9x7OAL7yVFEj_HusUBCVjpT_eN2vvTdVH25jLgkBKoYI5w2zJqBv_Id8k2FAJgFLbQt4igafPM3Ed8Sl1fpeEMoFohpfCkoiDgnROQlha129vfAZeKJVoC4-Je"
                      alt="Floral artisan"
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr7lvcGYo0gLOdDlAeYf_O5gniUMZGLKlQXUzyerafBh9Lejfhc9CWbjw2hG8bJp7yCcC49rweo4lAh9r3PNGBOFRWCXQBxdRgZC2Fkg1lv8ZX7nLkdXW9sR64XsJJQk_Qtt5mTCc1IR2uI1PGE2HdKY3vRZkS7tLoYkfc8D-6SDj_enV6Ko66ishAYDjyzilIx98_uaBNWFmVXKDWArFyBN4Oscy8aMb0xtcMakVtsKTbmkXM83F2NrOBTcyDIiWgeMn08JpSVivl"
                      alt="Boutique interior"
                      className="w-full aspect-[3/4] object-cover rounded-xl"
                    />
                  </div>

                  {/* Right column */}
                  <div className="space-y-4">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Kf1ysQcAeQGRzso9URxlC066NDpR91yo_Yus8i1xAjpfb8quOwwAJYahEZhwVzJ4YWDlSr58I1UcNKo5i5idwXP8t_pcoTahaGC8qDs2o55zMw0MPE7LYrYzUl-xorANtP_pC6aAN4OWeKz_ruJoLZd4bjBza2rwsch-XMTi5blZAaTOS95iWmI8FzFwDyTxKkM8RRAvMSjZm_zRpmj8Ik-3yoAQkavyPN6UyJV29dblirJCM6wXhVod4nUIlQO5hY_kMc6mXEtx"
                      alt="Elegant rose"
                      className="w-full aspect-[3/4] object-cover rounded-xl"
                    />
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGo14Mi8s36Mx0on6YvLeGn0H3jY-KGLddGkVpwsBzoK2rBAlsAf2z6mLJQsR4jYfP6n8-52_GOSkfUr6Zr23IwyFqJOZkI8HP_yM3bwWimLUFI1yohFt1wPq9ynwXWHGPmYNPQou5CazCjx3aJvVxYxOPsrXrROxuYPEqIids0ZTDR9tz48OX7Ujsc8kiF0C2qCzBsHJslw1sa9qSlpqBivaQoaOuMxOq7-hSd6CJxf1keXd-CvHbRJTW1sQtbnw9pWjAYSwz-cVU"
                      alt="Petal texture"
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-1 md:order-2"
              >
                <h2 className="text-4xl md:text-5xl font-serif text-on-surface mb-8">
                  Our Story
                </h2>

                <div className="space-y-6 text-on-surface/70 leading-relaxed">
                  <p>
                    What began as a quiet obsession in a small home studio in
                    2018 has blossomed into a sanctuary for botanical artistry.
                    Forever Florals was born from a deep reverence for the life
                    cycle of flowers.
                  </p>

                  <p>
                    We believe flowers are more than decoration — they are
                    emotional catalysts. Every stem is chosen with intention,
                    every arrangement tells a story of elegance, resilience, and
                    timeless beauty.
                  </p>

                  <p>
                    Today, our studio brings together artisans and designers who
                    share a singular vision: to elevate everyday spaces through
                    nature’s quiet luxury.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-12 flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-primary"></div>
                  <span className="font-serif italic text-primary">
                    Forever Florals
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-on-surface mb-4">
                Our Vision
              </h2>
              <div className="w-24 h-[1px] bg-primary mx-auto"></div>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Large Feature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-8 bg-stone-100 rounded-3xl p-12 relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-emerald-900 mb-6">
                    Sustainable Permanence
                  </h3>
                  <p className="text-on-surface/70 max-w-md leading-relaxed">
                    We envision a world where beauty doesn't come at the cost of
                    the environment. Our everlasting florals reduce waste while
                    maintaining elegance.
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-2 text-emerald-800 text-sm uppercase tracking-widest">
                  <span>Learn more</span>
                  <span>→</span>
                </div>

                {/* Soft glow */}
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl group-hover:bg-emerald-300/30 transition duration-700"></div>
              </motion.div>

              {/* Small Card - Artisanal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-4 bg-emerald-800 text-white rounded-3xl p-10 flex flex-col items-center justify-center text-center"
              >
                <div className="text-4xl mb-6">✿</div>
                <h3 className="uppercase tracking-widest text-sm mb-4">
                  Artisanal Quality
                </h3>
                <p className="opacity-90 text-sm">
                  Every petal is inspected, every ribbon hand-crafted.
                </p>
              </motion.div>

              {/* Small Card - Emotional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-4 border border-stone-200 rounded-3xl p-10 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-serif text-on-surface mb-4">
                    Emotional Connection
                  </h3>
                  <p className="text-on-surface/70 text-sm">
                    Creating spaces that breathe and feel deeply personal.
                  </p>
                </div>

                <div className="w-full h-24 mt-8 rounded-xl overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6AaWQkAIEpjfW523nmhk5hfFYmioM6qxD9qNAuWg8Qo0w1wW2LG-3j4HzLReQQsH_NW75a2oNaZUBAtvAlSZG5qqybH4dMFP4RyJUSA-A3L-R9d2KDR8eyA4N93yPcc6EDSSUQnh4FHwu0KElPAKurxeGKvKu1prhNemVuw5J-BKOpgryHELy2OPw293XhmUoLHhdRoxftsUt4d4XxD_F17xvZGTPfnbEcQqP1aW9AGAad3X9WxlPcWRTds1P65i6c9QXxpHULYOj"
                    alt="Soft floral path"
                    className="w-full h-full object-cover grayscale opacity-60"
                  />
                </div>
              </motion.div>

              {/* Medium Feature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="md:col-span-8 bg-emerald-50 rounded-3xl p-12 flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-serif mb-6">
                    Global Inspiration, Local Heart
                  </h3>
                  <p className="text-on-surface/70">
                    Inspired globally, rooted locally. We support artisans and
                    small growers while delivering world-class floral elegance.
                  </p>
                </div>

                <div className="w-full md:w-1/3 aspect-square bg-white/40 backdrop-blur-md rounded-2xl p-4">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Yc8zndPKqEXG50bJc0LmMIxaP0tdhX4zsHeIaEE-nbSxRLnJIv-LVdHsfYyCS3ARzvRZ46bShMRqOmX3VS8LqFEHyFpR3M0CTNdWEuZgv7t-B_TdLZ9xcjTuw7ehFiBKWj0IZc5Ny47LkQakR_4CtaMJuLDZ80jl1Xm55GIq7a3GwP7DIpMdzrWORC_RsRC1Y-NwqFl7dcWCtKMNjIM8_Z5aHg3bNItXzYlI-9hNc917DHHjLuNjXdAfsFMlTSB8yRluoHi_bXgU"
                      alt="Wildflowers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section
          className="py-20 px-4 sm:px-6 lg:px-8 text-white relative bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuABMup-SshQHBTi_oA9Qu7cisx0zJ2L9sOufb-q3MS-FBEf7coNJn8ZBSMF7l0oCzS6H-TOMSBPGwLiWM9_OAa7nbpMI8iWcRkzUEKpsgaBTszNsZ98fp1YjFQt0YpnYSvEjDeTPtnHdUmUJesUh_QOm4EmaQ6qYBTYXq6OjjdlHaD8ur2s6J1Qw2Caz47NgMj3s5zwqGcXdXuOhqsSG7mNQCZXxUo4WzG6VIJdILQOHWwXI5DGQ9GA6GkvEfMTBuCJ-SfWnQJWIrAa')`,
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60"></div>

          <LeafAccent size="md" position="center" opacity={0.05} />

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl xl-8">”</div>

              <p className="text-3xl md:text-4xl font-serif italic leading-relaxed mb-8">
                Flowers are the music of the ground. From earth's lips spoken
                without sound.
              </p>

              <p className="text-sm font-semibold text-white/80">
                — LOREN CURRAN
              </p>
            </motion.div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface relative">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-on-surface mb-4">
                Ready to bring nature home?
              </h2>
              <p className="text-on-surface/70 mb-10 font-sans-botanical">
                Discover our latest collections, curated by the artisans home
                and timeless hearts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-green-800 text-white rounded-full font-semibold hover:bg-green-900 transition">
                  Explore Collections
                </button>
                <button className="px-8 py-3 border-2 border-on-surface text-on-surface rounded-full font-semibold hover:bg-on-surface/5 transition">
                  Join Our Community
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutPage;
