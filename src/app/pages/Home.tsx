import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Truck, Shield, Zap, Award, HeadphonesIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function Home() {
  const featuredProducts = products.filter(p => p.featured);
  const onSaleProducts = products.filter(p => p.discount);

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 pb-16">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                ✨ New Arrivals Available Now
              </span>
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Elevate Your Tech Experience
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Discover premium technology and accessories designed for modern living. Quality meets innovation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Link to="/products">
                <Button size="lg" className="text-lg px-8">
                  Shop Now <ArrowRight className="size-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: 'Fast Delivery', desc: 'Free 2-day shipping on orders over $50' },
                { icon: Shield, title: 'Secure Payment', desc: 'Your data is protected with SSL encryption' },
                { icon: Award, title: 'Top Quality', desc: 'Premium products from trusted brands' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <Card className="bg-white dark:bg-gray-950 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg">
                        <feature.icon className="size-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16">
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked favorites just for you</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>

        {onSaleProducts.length > 0 && (
          <section className="mb-16">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 mb-8 text-white">
              <h2 className="text-4xl font-bold mb-2">Limited Time Offers</h2>
              <p className="text-lg opacity-90">Save up to 25% on selected items</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSaleProducts.slice(0, 4).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-16">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white overflow-hidden">
            <CardContent className="p-12 text-center">
              <HeadphonesIcon className="size-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Our customer support team is available 24/7 to answer your questions
              </p>
              <Button size="lg" variant="secondary">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
