import { motion } from 'motion/react';
import { Link } from 'react-router';
import { products } from '../data/products';

export function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="bg-[#f8f7f5] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block px-3 py-1 bg-black text-white rounded-full text-[10px] font-bold mb-8 tracking-widest">
                MADE IN MAURITANIA
              </div>
              <h1 className="text-6xl lg:text-[5.5rem] mb-6 leading-[0.95] tracking-tight font-medium">
                clean that<br/>means business.
              </h1>
              <p className="text-xl text-neutral-600 mb-10 max-w-md font-light leading-relaxed">
                Advanced formulations. Zero compromises. From Nouakchott's industrial zone to homes across Mauritania.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/collections/laundry"
                  className="inline-flex items-center justify-center bg-black text-white px-8 py-4 hover:bg-neutral-800 transition-colors font-medium"
                >
                  shop laundry
                </Link>
                <Link
                  to="/collections/kitchen"
                  className="inline-flex items-center justify-center border border-black text-black px-8 py-4 hover:bg-neutral-100 transition-colors font-medium"
                >
                  shop kitchen
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 transform -translate-x-10 translate-y-10"></div>
              <img
                src="https://images.unsplash.com/photo-1550963295-019d8a8a61c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="OMI Products Hero"
                className="w-full h-[600px] object-cover rounded-sm relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-neutral-900 text-white py-4 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          className="flex gap-12 items-center text-sm tracking-widest font-bold uppercase"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <span>Advanced Formulas</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span>Sustainably Sourced</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span>Made in Mauritania</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span>Premium Ingredients</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span>Advanced Formulas</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span>Sustainably Sourced</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span>Made in Mauritania</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span>Premium Ingredients</span>
        </motion.div>
      </div>

      {/* Products Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl mb-6 font-medium tracking-tight">the lineup</h2>
            <p className="text-neutral-600 text-lg font-light">
              Six categories of serious clean, formulated for the modern home. Efficacy you can see, scents you will love.
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {products.map((product) => (
              <motion.div variants={item} key={product.id} className="group">
                <Link to={`/products/${product.id}`} className="block">
                  <div
                    className="relative overflow-hidden mb-6 aspect-[3/4] rounded-sm transition-all duration-700"
                    style={{ backgroundColor: product.bg }}
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-sm">
                      {product.category}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-medium mb-2 group-hover:text-neutral-600 transition-colors">{product.name}</h3>
                      <p className="text-neutral-500 font-light">{product.tagline}</p>
                    </div>
                    <span className="font-medium text-sm pt-1">{product.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why OMI */}
      <section id="about" className="py-32 bg-[#f8f7f5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-16"
          >
            <div>
              <div className="text-6xl font-light mb-6 text-neutral-300">01</div>
              <h3 className="text-2xl font-medium mb-4">Quality you can trust.</h3>
              <p className="text-neutral-600 leading-relaxed font-light text-lg">
                Strict adherence to international safety and quality standards. Every product tested, every formula perfected in our Mauritanian labs.
              </p>
            </div>
            <div>
              <div className="text-6xl font-light mb-6 text-neutral-300">02</div>
              <h3 className="text-2xl font-medium mb-4">Planet-conscious.</h3>
              <p className="text-neutral-600 leading-relaxed font-light text-lg">
                Sustainable practices from formulation to packaging. Clean homes shouldn't cost the earth, which is why our bottles are 100% recyclable.
              </p>
            </div>
            <div>
              <div className="text-6xl font-light mb-6 text-neutral-300">03</div>
              <h3 className="text-2xl font-medium mb-4">Always innovating.</h3>
              <p className="text-neutral-600 leading-relaxed font-light text-lg">
                Modern techniques meet traditional reliability. We're constantly evolving our formulas for better results and better scents.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
