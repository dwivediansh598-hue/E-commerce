import { Link } from 'react-router';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';

export function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="size-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite items for later
          </p>
          <Link to="/products">
            <Button size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        My Wishlist
      </h1>
      <p className="text-muted-foreground mb-8">
        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="overflow-hidden group">
              <Link to={`/products/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold mb-2 hover:text-primary transition">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1"
                  >
                    <ShoppingCart className="size-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      removeFromWishlist(product.id);
                      toast.info(`${product.name} removed from wishlist`);
                    }}
                  >
                    <Heart className="size-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
