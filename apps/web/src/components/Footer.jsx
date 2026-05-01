import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-24 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:pr-8">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl tracking-wide text-foreground">
                FOREVER FLORALS
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Bringing you floral elegance that lasts forever. We believe in the
              quiet beauty of permanence and the artisan's touch.
            </p>
          </div>

          {/* Collections Column */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">
              Collections
            </h4>
            <ul className="space-y-4">
              {[
                "Enchanting Petals",
                "Crochet Garden",
                "Silk Artisanal",
                "Seasonal Dried",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={`/shop?collection=${encodeURIComponent(link)}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">Company</h4>
            <ul className="space-y-4">
              {[
                "Sustainability",
                "Care Guide",
                "Shipping & Returns",
                "Press",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-8">
              <a
              href="https://maps.app.goo.gl/55Hot3ADzXZymQaF7?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-300"
            >
              <MapPin className="w-4 h-4" />
              Visit Our Store
            </a>
            </div>
            
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Forever Florals. Crafted for Timeless Growth.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
