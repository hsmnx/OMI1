import { useParams, Link } from 'react-router';
import { getProductsByCategory, products } from '../data/products';
import { motion } from 'motion/react';

export function CollectionPage() {
  const { category } = useParams();
  
  // Find products for this category
  const collectionProducts = getProductsByCategory(category || "");
  
  // Get all products if category not found (fallback)
  const displayProducts = collectionProducts.length > 0 ? collectionProducts : products;
  
  // Format category name
  const title = category ? category.replace('-', ' ') : 'All Products';

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
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="bg-[#f8f7f5] py-24 lg:py-32 border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-7xl font-medium tracking-tight capitalize mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-500 font-light max-w-2xl mx-auto"
          >
            Discover our complete range of {title.toLowerCase()} products, designed for maximum efficacy and minimal environmental impact.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {displayProducts.map((product) => (
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
    </div>
  );
}
