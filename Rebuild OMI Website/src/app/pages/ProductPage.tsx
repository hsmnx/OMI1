import { useParams, Link } from 'react-router';
import { products } from '../data/products';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 text-center">
        <h1 className="text-4xl mb-4 font-medium">Product Not Found</h1>
        <Link to="/" className="text-neutral-500 hover:text-black transition-colors underline underline-offset-4">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <Link to="/" className="inline-flex items-center text-sm text-neutral-500 hover:text-black transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all products
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] lg:sticky lg:top-32"
            style={{ backgroundColor: product.bg }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover mix-blend-multiply"
            />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="py-12"
          >
            <div className="uppercase tracking-widest text-xs font-bold text-neutral-400 mb-4">
              <Link to={`/collections/${product.categoryId}`} className="hover:text-black transition-colors">
                {product.category}
              </Link>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-medium mb-6 tracking-tight">{product.name}</h1>
            <p className="text-2xl text-neutral-500 font-light mb-8">{product.price}</p>
            
            <p className="text-lg text-neutral-700 leading-relaxed font-light mb-12">
              {product.description}
            </p>

            <div className="border-t border-neutral-200 py-8">
              <div className="flex items-center gap-6 mb-6">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-300">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-12 h-12 flex items-center justify-center font-medium">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Add to Cart */}
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-black text-white h-12 font-medium hover:bg-neutral-800 transition-colors"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>

            {/* Accordion (simulated) */}
            <div className="border-t border-neutral-200 divide-y divide-neutral-200">
              <div className="py-6">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">The Formula</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-center text-neutral-600 font-light">
                      <Check className="w-4 h-4 mr-3 text-neutral-300" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-6">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">How to Use</h3>
                <p className="text-neutral-600 font-light leading-relaxed">
                  For best results, apply directly to the surface or fabric. Allow to sit for 1-2 minutes before wiping or washing. Safe for most everyday materials. Test on an inconspicuous area first.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
