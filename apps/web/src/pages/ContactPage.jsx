import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

// ─── Decorative SVG blob shapes ──────────────────────────────────────────────
function BlobOne() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        fill="currentColor"
        d="M47.6,-61.3C60.6,-51.4,69.3,-36.3,72.4,-20.3C75.5,-4.2,73,12.7,65.3,26.5C57.6,40.3,44.6,51,30.3,57.5C16,64,-9.6,66.3,-28.3,59.3C-47,52.3,-58.9,36,-65.2,17.5C-71.5,-1,-72.2,-21.7,-63.3,-36.6C-54.4,-51.5,-35.9,-60.6,-18.3,-67.2C-0.7,-73.7,15.9,-77.9,30.6,-73.1C45.3,-68.3,34.6,-71.2,47.6,-61.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

function BlobTwo() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        fill="currentColor"
        d="M38.9,-50.9C50.3,-40.8,59.3,-28.3,63.1,-13.9C66.9,0.5,65.5,16.8,58.3,29.8C51.1,42.8,38.2,52.5,23.6,58.5C9,64.5,-7.3,66.7,-22.3,62.3C-37.3,57.9,-51,46.8,-59,32.3C-67,17.8,-69.4,-0.1,-64.5,-15.5C-59.7,-30.9,-47.6,-43.9,-34.1,-53.7C-20.6,-63.6,-5.7,-70.3,7.3,-69.1C20.4,-67.8,27.5,-61,38.9,-50.9Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

// ─── Contact Channel Card ─────────────────────────────────────────────────────
function ChannelCard({ icon: Icon, title, subtitle, linkLabel, href, delay, accentColor }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Background blob decoration */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 opacity-[0.06] ${accentColor} pointer-events-none`}>
        <BlobTwo />
      </div>

      {/* Top row: icon + arrow */}
      <div className="flex items-start justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${accentColor} bg-opacity-10 shrink-0`}
          style={{ background: 'color-mix(in srgb, currentColor 10%, transparent)' }}
        >
          <div className={`${accentColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <span className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      {/* Text */}
      <div>
        <h3 className="font-serif text-2xl text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{subtitle}</p>
        <span className="text-primary text-xs font-bold uppercase tracking-widest group-hover:underline">
          {linkLabel}
        </span>
      </div>
    </motion.a>
  );
}

// ─── ContactPage ──────────────────────────────────────────────────────────────
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState('');
  const { toast } = useToast();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: 'Message sent', description: 'Thank you for reaching out. We\'ll respond within 24 hours.' });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const fieldClass = (name) =>
    `w-full bg-transparent border-b-2 py-3 text-foreground outline-none transition-colors duration-300 placeholder-transparent ${
      focused === name ? 'border-primary' : 'border-border'
    }`;

  return (
    <>
      <Helmet>
        <title>Contact Us – FOREVER FLORALS</title>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">

        {/* ── Decorative background blobs ───────────────────────────────── */}
        <div className="absolute top-0 left-0 w-72 h-72 text-primary opacity-[0.04] pointer-events-none -translate-x-1/3 -translate-y-1/4">
          <BlobOne />
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 text-primary opacity-[0.04] pointer-events-none translate-x-1/3 translate-y-1/4">
          <BlobTwo />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Page heading ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">
              Reach Out
            </p>
            <h1 className="font-serif text-foreground leading-tight mb-6">
              Let's Start a<br />
              <span className="italic">Conversation</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Whether you have a question about an arrangement, a custom request,
              or just want to say hello — we're here for it.
            </p>
          </motion.div>

          {/* ── Main grid ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* ── Contact Form (3 cols) ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3 relative"
            >
              {/* Subtle card shape behind the form */}
              <div className="absolute -inset-6 bg-card rounded-[2.5rem] border border-border shadow-sm pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative p-6 space-y-10">

                {/* Name */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs font-bold uppercase tracking-widest ${
                      focused === 'name' || formData.name
                        ? '-top-5 text-primary'
                        : 'top-3 text-muted-foreground'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="Your Name"
                    className={fieldClass('name')}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs font-bold uppercase tracking-widest ${
                      focused === 'email' || formData.email
                        ? '-top-5 text-primary'
                        : 'top-3 text-muted-foreground'
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="Email Address"
                    className={fieldClass('email')}
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs font-bold uppercase tracking-widest ${
                      focused === 'message' || formData.message
                        ? '-top-5 text-primary'
                        : 'top-3 text-muted-foreground'
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message" name="message" rows={5} required
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    placeholder="Your Message"
                    className={`${fieldClass('message')} resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-sm uppercase tracking-widest font-semibold transition-all duration-300 disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* ── Channel Cards (2 cols) ─────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <ChannelCard
                icon={MessageCircle}
                title="WhatsApp"
                subtitle="Quick replies, order queries, custom requests — chat with us directly on WhatsApp."
                linkLabel="Start a conversation"
                href="https://wa.me/917400272404"
                delay={0.2}
                accentColor="text-emerald-600"
              />
              <ChannelCard
                icon={Mail}
                title="Email Us"
                subtitle="Send us a detailed note and we'll get back to you within 24 hours."
                linkLabel="hello@foreverflorals.com"
                href="mailto:hello@foreverflorals.com"
                delay={0.35}
                accentColor="text-primary"
              />

              {/* Response time note */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="rounded-2xl border border-dashed border-border px-6 py-5 text-center"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                  Typical Response Time
                </p>
                <p className="font-serif text-2xl text-foreground">Within 24 hrs</p>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ContactPage;