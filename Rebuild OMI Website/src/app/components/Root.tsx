import { Outlet, Link, useLocation } from "react-router";
import { ShoppingCart, Menu, Facebook, Instagram, Mail, Phone, MapPin, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-neutral-50 font-sans text-neutral-900 flex flex-col">
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4 text-center text-xs tracking-wide">
        99% SATISFACTION RATE • FREE DELIVERY OVER 5000 MRU
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-baseline gap-2">
              {/* Logo Placeholder */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <div className="w-8 h-8 bg-black rounded-full mr-2 flex items-center justify-center text-white font-bold text-sm">O</div>
                <span className="text-3xl tracking-tight font-semibold">OMI</span>
                <span className="text-xs text-neutral-500 mb-1 ml-1">MR</span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              <div className="group relative">
                <Link to="/" className="text-sm font-medium hover:opacity-60 transition-opacity">shop</Link>
                {/* Dropdown for collections */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-white border border-neutral-100 shadow-xl p-4 w-48 rounded-sm">
                    <div className="flex flex-col gap-3">
                      <Link to="/collections/laundry" className="text-sm hover:text-neutral-500">Laundry</Link>
                      <Link to="/collections/kitchen" className="text-sm hover:text-neutral-500">Kitchen</Link>
                      <Link to="/collections/home" className="text-sm hover:text-neutral-500">Home Care</Link>
                      <Link to="/collections/hand-care" className="text-sm hover:text-neutral-500">Hand Care</Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/#about" className="text-sm font-medium hover:opacity-60 transition-opacity">why omi</Link>
              <a href="#contact" className="text-sm font-medium hover:opacity-60 transition-opacity">contact</a>
            </div>

            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-2 right-1.5 w-2 h-2 bg-black rounded-full"></span>
              </motion.button>
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-neutral-200 overflow-hidden bg-white"
            >
              <div className="py-6 px-6 flex flex-col gap-4">
                <div className="font-semibold text-xs tracking-wider text-neutral-400 mb-2">COLLECTIONS</div>
                <Link to="/collections/laundry" className="text-sm pl-4">Laundry</Link>
                <Link to="/collections/kitchen" className="text-sm pl-4">Kitchen</Link>
                <Link to="/collections/home" className="text-sm pl-4">Home Care</Link>
                <div className="h-px bg-neutral-100 my-2"></div>
                <Link to="/" className="text-sm py-2">Home</Link>
                <a href="#contact" className="text-sm py-2">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 flex flex-col">
        {/* Animate presence for page transitions if desired, simple Outlet here */}
        <Outlet />
      </main>

      {/* CTA */}
      <section className="bg-[#1C1C1C] text-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl mb-6 font-medium">
              want the inside scoop?
            </h2>
            <p className="text-neutral-400 mb-10 max-w-lg mx-auto text-lg">
              New products, cleaning tips, and exclusive offers delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your email address"
                className="flex-1 px-6 py-4 bg-white/10 text-white placeholder:text-neutral-500 border border-white/20 focus:outline-none focus:border-white transition-colors"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-8 py-4 font-medium hover:bg-neutral-200 transition-colors whitespace-nowrap"
              >
                sign up
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-neutral-400 py-20 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">O</div>
                <div className="text-white text-2xl font-semibold">OMI</div>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                High-quality cleaning products manufactured right here in Mauritania. Efficacy meets sophisticated design.
              </p>
            </div>

            <div>
              <h4 className="text-white mb-6 text-xs font-bold tracking-widest uppercase">Navigate</h4>
              <div className="space-y-3 text-sm">
                <div><Link to="/" className="hover:text-white transition-colors">Home</Link></div>
                <div><Link to="/collections/laundry" className="hover:text-white transition-colors">Laundry Collection</Link></div>
                <div><Link to="/collections/kitchen" className="hover:text-white transition-colors">Kitchen Collection</Link></div>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-6 text-xs font-bold tracking-widest uppercase">Reach Us</h4>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3 items-start hover:text-white transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>+222 22 51 11 11</span>
                </div>
                <div className="flex gap-3 items-start hover:text-white transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>commercial@omi.mr</span>
                </div>
                <div className="flex gap-3 items-start hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Zone industrielle Dar Naim,<br/>Nouakchott, Mauritania</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white mb-6 text-xs font-bold tracking-widest uppercase">Follow</h4>
              <div className="flex gap-3">
                <motion.a 
                  whileHover={{ y: -3, backgroundColor: 'white', color: 'black' }}
                  href="https://facebook.com" target="_blank" rel="noreferrer" 
                  className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3, backgroundColor: 'white', color: 'black' }}
                  href="https://instagram.com" target="_blank" rel="noreferrer" 
                  className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <div>© 2026 OMI Mauritanie. Quality, safety, and sustainability.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
