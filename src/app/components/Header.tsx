import { Link } from 'react-router';
import { ShoppingCart, Store, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Header() {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Store className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechShop
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="size-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="size-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
