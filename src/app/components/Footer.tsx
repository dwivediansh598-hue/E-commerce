import { Link } from 'react-router';
import { Store, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function Footer() {
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks for subscribing to our newsletter!');
  };

  return (
    <footer className="border-t bg-muted/50 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Store className="size-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechShop
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your one-stop shop for the latest tech gadgets and accessories.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-foreground transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted-foreground hover:text-foreground transition">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4" />
                support@techshop.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4" />
                123 Tech Street, SF, CA
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers and updates
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input type="email" placeholder="Your email" required />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 TechShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
