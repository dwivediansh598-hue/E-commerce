import { Link } from 'react-router';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${product.id}`}>
        <Card className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group">
          <div className="aspect-square overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 z-10">
                -{product.discount}%
              </Badge>
            )}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
              onClick={handleWishlist}
            >
              <Heart className={`size-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold line-clamp-1">{product.name}</h3>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
            <div className="flex items-center gap-1 mb-2">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            </div>
            <Button onClick={handleAddToCart} size="sm" className="gap-2">
              <ShoppingCart className="size-4" />
              Add
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
