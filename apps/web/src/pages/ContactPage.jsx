
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LeafAccent from '@/components/LeafAccent.jsx';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: 'Message sent', description: 'Thank you for reaching out.' });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - FOREVER FLORALS</title>
      </Helmet>

      <Header />

      <main className="py-24 bg-surface relative min-h-screen">
        <LeafAccent size="lg" position="bottom-right" opacity={0.05} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="mb-6 text-on-surface">Get in Touch</h1>
            <p className="text-lg text-on-surface/70 max-w-2xl mx-auto font-sans-botanical">
              We'd love to hear from you. Whether you have a question or need help choosing the perfect product, feel free to reach out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface-container p-10 radius-organic-xl shadow-botanical-md"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold font-sans-botanical text-on-surface uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={formData.name} onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary-botanical py-3 text-on-surface font-sans-botanical outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold font-sans-botanical text-on-surface uppercase tracking-wider mb-2">Your Email</label>
                  <input
                    id="email" name="email" type="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary-botanical py-3 text-on-surface font-sans-botanical outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold font-sans-botanical text-on-surface uppercase tracking-wider mb-2">Your Message</label>
                  <textarea
                    id="message" name="message" rows={4} required
                    value={formData.message} onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary-botanical py-3 text-on-surface font-sans-botanical outline-none transition-colors resize-none"
                  />
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-primary-botanical text-on-primary radius-organic-xl py-6 text-base shadow-botanical-md hover:shadow-botanical-lg hover:-translate-y-1 transition-all">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="flex gap-6 p-8 bg-surface-container radius-organic-xl shadow-botanical-sm hover:shadow-botanical-md transition-shadow">
                <div className="w-16 h-16 radius-organic bg-primary-botanical/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-8 w-8 text-primary-botanical" />
                </div>
                <div>
                  <h3 className="font-serif-botanical text-2xl mb-2 text-on-surface">WhatsApp</h3>
                  <p className="text-on-surface/70 font-sans-botanical mb-4">Chat with us directly for quick responses</p>
                  <a href="#" className="text-primary-botanical font-bold uppercase tracking-wider text-sm hover:underline">Start a conversation</a>
                </div>
              </div>

              <div className="flex gap-6 p-8 bg-surface-container radius-organic-xl shadow-botanical-sm hover:shadow-botanical-md transition-shadow">
                <div className="w-16 h-16 radius-organic bg-primary-botanical/10 flex items-center justify-center shrink-0">
                  <Mail className="h-8 w-8 text-primary-botanical" />
                </div>
                <div>
                  <h3 className="font-serif-botanical text-2xl mb-2 text-on-surface">Email</h3>
                  <p className="text-on-surface/70 font-sans-botanical mb-4">Send us a detailed message</p>
                  <a href="mailto:hello@foreverflorals.com" className="text-primary-botanical font-bold uppercase tracking-wider text-sm hover:underline">hello@foreverflorals.com</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ContactPage;
